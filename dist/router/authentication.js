"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = require("../controller/authentication");
exports.default = (router) => {
    router.post('/auth/signup', (0, authentication_1.authenticationController)().register),
        router.post('/auth/sendEmailVerification', (0, authentication_1.authenticationController)().sendEmailVerification),
        router.post('/auth/verifyEmail', (0, authentication_1.authenticationController)().verifyEmail),
        router.post('/auth/signin', (0, authentication_1.authenticationController)().login);
    router.get('/auth/logout/:id', (0, authentication_1.authenticationController)().logout);
};
//# sourceMappingURL=authentication.js.map