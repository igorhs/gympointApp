import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import StudentsController from './app/controllers/StudentsController';
import MembershipsController from './app/controllers/MembershipController';
import RegistrationsController from './app/controllers/RegistrationController';
import CheckinsController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import authMiddleware from './app/middlewares/auth';
import AnswerController from './app/controllers/AnswerController';

const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.put('/students', StudentsController.update);

routes.post('/students/:id/checkins', CheckinsController.store);
routes.get('/students/:id/checkins', CheckinsController.index);

routes.post('/students/:id/help-orders', HelpOrderController.store);
routes.get('/students/help-orders/unanswered', HelpOrderController.index);

routes.get('/students/:id/help-orders', AnswerController.index);

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

routes.post('/help-orders/:id/answer', AnswerController.store);

export default routes;
