import Fastify from 'fastify';
import ffFormBody from '@fastify/formbody';
import ffStatic from '@fastify/static';
import ffView from '@fastify/view';
import path from 'path';
import pug from 'pug';
import 'dotenv/config.js';

import db from './db/index.js';
import schemas from './schemas.js';


function handleDefaults(body) {
  return {
    ...body,
    isForDelivery: 'cancelled' in body ? undefined : 'isForDelivery' in body,
  };
}


const fastify = Fastify({
  ignoreTrailingSlash: true,
  ajv: {
    customOptions: {
      removeAdditional: true,
    }
  },
});

fastify.register(ffFormBody);
fastify.register(ffStatic, { root: path.resolve('public') });
fastify.register(ffView, {
  root: path.resolve('views'),
  engine: { pug },
});


fastify.get('/', async (request, reply) => {
  return reply.view('index.pug');
});


fastify.post('/orders', { schema: schemas.post }, async (request, reply) => {
  const order = await db.create(handleDefaults(request.body));
  return reply.redirect(`/orders/${order._id}`);
});


fastify.get('/orders', async (request, reply) => {
  if (request.query.pass !== process.env.ADMIN_PASS) return reply.redirect('/');
  const orders = await db.find({});
  return reply.view('orders.pug', { orders: orders?.map(order => order.toObject()) });
});


fastify.get('/orders/:id', async (request, reply) => {
  const order = await db.findById(request.params.id);
  return reply.view('order.pug', { order: order.toObject(), id: request.params.id });
});


fastify.post('/orders/:id', { schema: schemas.patch }, async (request, reply) => {
  await db.findByIdAndUpdate(request.params.id, handleDefaults(request.body));
  return reply.redirect(`/orders/${request.params.id}`);
});


fastify.listen({
  port: process.env.PORT,
}).then(() => console.log('Ready!'));