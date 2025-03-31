import jsonServer from 'json-server';
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Usa o db.json como banco
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
  
});

export default server;
