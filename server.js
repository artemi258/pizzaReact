const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path')
const router = jsonServer.router(path.join(__dirname, './JSON/product.json'))
const middlewares = jsonServer.defaults({
  static: './build'
});
const PORT = process.env.PORT || 8000;
server.use(middlewares);
server.use(jsonServer.rewriter({
  '/api/*': '/$1',
}))
server.use(router);
server.listen(PORT, () => {
  console.log('Server is running');
});