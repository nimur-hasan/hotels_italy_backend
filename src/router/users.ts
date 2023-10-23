import { userController } from '../controller/users';
import express from 'express';
import { isAuthenticated } from '../middlewares';

export default async (router:express.Router) => {
    router.get('/users', isAuthenticated, userController().getAllUsers),
    router.get('/users/profile', isAuthenticated, userController().getUserBySession),
    router.get('/users/:id', isAuthenticated, userController().getUserById),
    router.get('/users/active/:id', isAuthenticated, userController().activeUser),
    router.get('/users/deactive/:id', isAuthenticated, userController().deActiveUser),
    router.put('/users/profile', isAuthenticated,  userController().updateProfile),
    router.delete('/users/:id', isAuthenticated, userController().deleteUserById)
}