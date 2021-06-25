import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

//Rotas e recursos
//Rota: http://localhost:3333/users
// Recurso: /users

//Metodos
//GET: buscar informação
//POST: criar alguma nova informação
//PUT: atualizar uma informação
//DELETE: deletar uma informação

// Corpo (request body): Dados para criaão ou atualização ou criação de um registro
// Route Params: Identificar qual recurso eu quero att ou deletar
// Query Params:Paginação, filtros, ordenação

app.listen(3333);