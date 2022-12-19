import Fastify from 'fastify';
import ffFormBody from '@fastify/formbody';
import ffStatic from '@fastify/static';
import path from 'path';
import 'dotenv/config.js';

import db from './db/index.js';

const fastify = Fastify({ ignoreTrailingSlash: true });

fastify.register(ffFormBody);
fastify.register(ffStatic, { root: path.resolve('public') });

fastify.post('/submit', async (request, reply) => {
  if ([
    'name',
    'phone',
    'count',
    'krenten',
  ].some(k => !(k in request.body))) return reply.code(400).send(new Error('Invalid form data'));
  await db.create({
    name: request.body.name,
    phone: request.body.phone,
    count: request.body.count,
    krenten: equest.body.krenten,
  });
  return reply.sendFile('submitted.html');
});

fastify.listen({
  port: process.env.PORT,
});