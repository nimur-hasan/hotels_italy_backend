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
exports.userController = void 0;
const users_1 = require("../db/users");
const ErrorHandler_1 = __importDefault(require("../helpers/ErrorHandler"));
const lodash_1 = require("lodash");
const GetUserIdentity_1 = __importDefault(require("../helpers/GetUserIdentity"));
const userController = () => {
    return {
        getAllUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { username, limit, skip, } = req.query;
                const searchQuery = [];
                if (username) {
                    searchQuery.push({ "info.name": { $regex: `^${username}`, $options: 'i' } });
                }
                let queryType = 'AND'; // 👈 will coming from params
                let query = {};
                // ❤️‍🔥 initial validations
                const { userId, shopId } = (0, GetUserIdentity_1.default)(req);
                console.log(userId, shopId);
                if (username) {
                    if (queryType == 'OR') {
                        query = {
                            shopId,
                            $or: searchQuery
                        };
                    }
                    else {
                        query = {
                            shopId,
                            $and: searchQuery
                        };
                    }
                }
                else {
                    query = { shopId };
                }
                try {
                    const medicines = yield (0, users_1.UserDB)().getAllUsers(query, parseInt(limit.toString()), parseInt(skip.toString()), true);
                    return res.status(200).json(medicines);
                }
                catch (error) {
                    console.log(error);
                    (0, ErrorHandler_1.default)(res, 501, error);
                }
            }
            catch (error) {
                return (0, ErrorHandler_1.default)(res, 500, error);
            }
        }),
        getUserBySession: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const currentUser = (0, lodash_1.get)(req, 'identity');
                res.status(200).json(currentUser);
            }
            catch (error) {
                return (0, ErrorHandler_1.default)(res, 500, error);
            }
        }),
        getUserById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield (0, users_1.UserDB)().getUserById(req.params.id);
                res.status(200).json(user);
            }
            catch (error) {
                return (0, ErrorHandler_1.default)(res, 500, error);
            }
        }),
        activeUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield (0, users_1.UserDB)().activeUser(req.params.id);
                return res.status(201).json(user);
            }
            catch (error) {
                return (0, ErrorHandler_1.default)(res, 500, error);
            }
        }),
        deActiveUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield (0, users_1.UserDB)().deactiveUser(req.params.id);
                return res.status(201).json(user);
            }
            catch (error) {
                return (0, ErrorHandler_1.default)(res, 500, error);
            }
        }),
        updateProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const currentUser = (0, lodash_1.get)(req, 'identity');
                console.log(currentUser);
                if (currentUser) {
                    const updatedProfile = yield (0, users_1.UserDB)().updateUserById(currentUser._id, { info: Object.assign(Object.assign({}, currentUser.info), req.body) });
                    res.status(200).json(updatedProfile);
                }
            }
            catch (error) {
                return (0, ErrorHandler_1.default)(res, 500, error);
            }
        }),
        deleteUserById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield (0, users_1.UserDB)().deleteUserById(req.params.id);
                return res.status(200).json({
                    statusCode: 200,
                    result: 'success',
                });
            }
            catch (error) {
                return (0, ErrorHandler_1.default)(res, 500, error);
            }
        })
    };
};
exports.userController = userController;
//# sourceMappingURL=users.js.map