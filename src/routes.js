import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import StudentsController from './app/controllers/StudentsController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.put('/students', StudentsController.update);

routes.use(authMiddleware);

// PERMITIR O CADASTRO/EDIÇÃO DE ALUNOS APÓS A ROTA DE LOGIN DO ADMIN E MIDDLEWARE
routes.post('/students', StudentsController.store);

export default routes;
