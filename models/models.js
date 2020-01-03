const Joi = require('@hapi/joi');

const refs = {
  token:
    Joi.object({
      token: Joi.string().required().min(12).max(30),
    }).label("token"),
  classic:
    Joi.object({
      message: Joi.string().default("request done with success"),
      result: Joi.boolean().default(true),
      username: Joi.string()
    }).label("classic")
};

const models = {
  'PUT/users/:id': {
    description: 'This is the main description',
    queries: refs.token,
    body: 
      Joi.object({
        username: Joi.string().required().description('Username'),
        lastname: Joi.string().default("Smith").description('Lastname')
      }).required(),
    response: refs.classic.description('Response description')
  },
  'POST/users': {
    body: 
      Joi.array().items(
        Joi.object({
          username: Joi.string(),
          age: Joi.number().greater(20).less(70).required(),
          firstname: Joi.string().required(),
          lastname: Joi.string().required()
        }).required()
      ).required(),
    response: refs.classic
  },
  'GET/users': {
    queries: refs.token,
    response: Joi.array().items(
      Joi.object({
        test: refs.classic,
        test2: Joi.array().items(refs.token),
        firstname: Joi.string(),
        lastname: Joi.string()
      })
    )
  },
  'GET/': {
    response: Joi.string().default('Default reponse')
  },
};

module.exports = () => models;
