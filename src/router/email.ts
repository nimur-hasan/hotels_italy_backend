import express from 'express';
import { emailController } from '../controller/email';

export default async (router:express.Router) => {
    router.get('/email/send',  emailController().sendEmail)
    router.post('/email/b2c',  emailController().B2CMail)
}