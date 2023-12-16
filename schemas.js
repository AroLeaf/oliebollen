const post = {
  body: {
    type: 'object',
    required: ['name', 'email', 'oliebollen', 'rolletjes'],
    properties: {
      name: { type: 'string' },
      email: { type: 'string' },
      oliebollen: { type: 'number' },
      rolletjes: { type: 'number' },
      isForDelivery: { type: 'string' },
      address: { type: 'string' },
    }
  }
}

const patch = {
  body: {
    type: 'object',
    properties: {
      oliebollen: { type: 'number' },
      rolletjes: { type: 'number' },
      cancelled: { type: 'boolean' },
      isForDelivery: { type: 'string' },
      address: { type: 'string' },
    }
  }
}

export default {
  post, patch,
}