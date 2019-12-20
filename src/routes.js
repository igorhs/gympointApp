import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import StudentsController from './app/controllers/StudentsController';
import MembershipsController from './app/controllers/MembershipController';
import RegistrationsController from './app/controllers/RegistrationController';
import CheckinsController from './app/controllers/CheckinController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.put('/students', StudentsController.update);

routes.post('/students/:id/checkins', CheckinsController.store);

routes.use(authMiddleware);

// PERMITIR O CADASTRO/EDIÇÃO DE ALUNOS APÓS A ROTA DE LOGIN DO ADMIN E MIDDLEWARE
routes.post('/students', StudentsController.store);

routes.post('/memberships', MembershipsController.store);
routes.get('/memberships/list', MembershipsController.index);
routes.put('/memberships/update', MembershipsController.update);
routes.delete('/memberships/:id', MembershipsController.delete);

routes.post('/registrations', RegistrationsController.store);
routes.get('/registrations/list', RegistrationsController.index);
routes.put('/registrations/:id/update', RegistrationsController.update);
routes.delete('/registrations/:id/delete', RegistrationsController.delete);

export default routes;
