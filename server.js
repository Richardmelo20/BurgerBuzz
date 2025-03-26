import jsonServer from 'json-server';
import process from 'process';

const server = jsonServer.create();
const router = jsonServer.router('db/db.json'); // Caminho para seu JSON
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`JSON Server está rodando na porta ${PORT}`);
});
