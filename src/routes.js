import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

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

export default routes;
