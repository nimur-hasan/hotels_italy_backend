import { UserDB } from '../db/users';
import express from 'express'
import ErrorHandler from '../helpers/ErrorHandler';
import { get, merge } from 'lodash'


export const isAuthenticated = async(req:express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['sessionToken'] || req.query.sessionToken || req.headers.sessionToken;

        console.log(sessionToken)

        if(!sessionToken) return ErrorHandler(res, 400, 'Session token not provided');

        const existingUser = await UserDB().getUserBySessionToken(sessionToken);

        if(!existingUser) return ErrorHandler(res, 401, 'Session token invalid');

        merge(req, { identity: existingUser});

        return next();
    } catch (error) {
        console.log(error);
        return ErrorHandler(res, 501, 'Middleware catch error: ' + error);
    }
}
