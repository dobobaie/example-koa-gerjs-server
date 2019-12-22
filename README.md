# Example [koa-gerjs](https://github.com/dobobaie/koa-gerjs) server

Example of koa-getjs in situation  
Generate and expose Swagger documentation + validation input + format data output with joi models  

## How use [koa-gerjs](https://github.com/dobobaie/koa-gerjs) ?  

One instance, one middleware, one expose and models. Simple.  
Check [`koa-gerjs`](https://github.com/dobobaie/koa-gerjs) instance in [index.js#L19](https://github.com/dobobaie/example-koa-gerjs-server/blob/master/index.js#L19) file => Generate Swagger documentation  
Check [`koa-gerjs`](https://github.com/dobobaie/koa-gerjs) middleware declaration in [server.js#L33](https://github.com/dobobaie/example-koa-gerjs-server/blob/master/server.js#L33) file => Validation + Formatage input/output payload  
Check [`koa-gerjs`](https://github.com/dobobaie/koa-gerjs) swagger expose in [server.js#L52](https://github.com/dobobaie/example-koa-gerjs-server/blob/master/server.js#L52) file => Expose Swagger documentation  
Finally check [`gerjs`](https://github.com/dobobaie/gerjs) models in [models/models.js](https://github.com/dobobaie/example-koa-gerjs-server/blob/master/models/models.js) file => Joi models required   

## Note

To create a Joi model is very simple, you have simply to create a Joi schema  

## Demo

example-koa-gerjs-server [live](http://164.132.106.118:8989/)   
example-koa-gerjs-server [live in /swagger](http://164.132.106.118:8989/swagger)   
