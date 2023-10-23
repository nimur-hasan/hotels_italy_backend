import express from 'express';
import authentication from './authentication';
import users from './users';
import hotels from './hotels';
import email from './email';


const router =  express.Router();

export default (): express.Router => {
    authentication(router)
    users(router)
    hotels(router)
    email(router)
    return router;
}