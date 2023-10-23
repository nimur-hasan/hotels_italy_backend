"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const users_1 = require("../db/users");
const ErrorHandler_1 = __importDefault(require("../helpers/ErrorHandler"));
const lodash_1 = require("lodash");
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sessionToken = req.cookies['sessionToken'] || req.query.sessionToken || req.headers.sessionToken;
        console.log(sessionToken);
        if (!sessionToken)
            return (0, ErrorHandler_1.default)(res, 400, 'Session token not provided');
        const existingUser = yield (0, users_1.UserDB)().getUserBySessionToken(sessionToken);
        if (!existingUser)
            return (0, ErrorHandler_1.default)(res, 401, 'Session token invalid');
        (0, lodash_1.merge)(req, { identity: existingUser });
        return next();
    }
    catch (error) {
        console.log(error);
        return (0, ErrorHandler_1.default)(res, 501, 'Middleware catch error: ' + error);
    }
});
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=index.js.map