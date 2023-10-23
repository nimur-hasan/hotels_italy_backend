import { authenticationController } from '../controller/authentication';
import express from 'express';

export default (router: express.Router) => {
    router.post('/auth/signup', authenticationController().register),
    router.post('/auth/sendEmailVerification', authenticationController().sendEmailVerification),
    router.post('/auth/verifyEmail', authenticationController().verifyEmail),
    router.post('/auth/signin', authenticationController().login)
    router.get('/auth/logout/:id', authenticationController().logout)
}