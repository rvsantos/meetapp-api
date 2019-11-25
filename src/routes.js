import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';
import SignupController from './app/controllers/SignupController';

import authMiddlewares from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// User
routes.post('/users', UserController.store);

// Session
routes.post('/sessions', SessionController.store);

// Middleware
routes.use(authMiddlewares);

//  User authenticate
routes.put('/users', UserController.update);

// File
routes.post('/files', upload.single('file'), FileController.store);

// Meetup
routes.post('/meetup', MeetupController.store);
routes.put('/meetup/:id', MeetupController.update);
routes.get('/meetups', MeetupController.index);
routes.delete('/meetup/:id', MeetupController.delete);

// Signup
routes.post('/meetup/:id/signup', SignupController.store);

export default routes;
