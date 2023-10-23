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
exports.authenticationController = void 0;
const users_1 = require("../db/users");
const helpers_1 = __importDefault(require("../helpers"));
const ErrorHandler_1 = __importDefault(require("../helpers/ErrorHandler"));
const GetUserIdentity_1 = __importDefault(require("../helpers/GetUserIdentity"));
const register_validation_1 = require("../validation/auth/register.validation");
const ValidationError_1 = __importDefault(require("../helpers/ValidationError"));
const email_1 = require("../email/email");
const authenticationController = () => {
    return {
        register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { email, password, fname, lname } = req.body;
                const isValidate = yield (0, register_validation_1.registerValidation)(req.body);
                if (isValidate.error)
                    return (0, ValidationError_1.default)(res, isValidate.error.details[0].message);
                const existingUser = yield (0, users_1.UserDB)().getUserByEmail(email);
                if (existingUser) {
                    return (0, ErrorHandler_1.default)(res, 403, 'User already exists');
                }
                const salt = (0, helpers_1.default)().random();
                const newUser = {
                    info: {
                        email,
                        fname,
                        lname
                    },
                    authentication: {
                        salt,
                        password: (0, helpers_1.default)().authentication(salt, password)
                    }
                };
                console.log(newUser);
                const user = yield (0, users_1.UserDB)().createUser(newUser);
                return res.status(201).json({
                    fname: user.info.fname,
                    lname: user.info.lname,
                    email: user.info.email,
                    isVarified: user.authentication.isVerified
                });
            }
            catch (error) {
                console.log(error);
                return (0, ErrorHandler_1.default)(res, 501, error);
            }
        }),
        // 🥕 Email Verification
        sendEmailVerification: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                console.log(req.body);
                // Find user by email
                const user = yield (0, users_1.UserDB)().getUserByEmail(email);
                if (!user)
                    return (0, ErrorHandler_1.default)(res, 403, 'User not exist');
                const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
                user.authentication.otp = otp;
                const result = yield (0, email_1.EmailService)().sendEmail({ to: email, subject: 'Verification', html: `
                <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                    <div style="border-bottom:1px solid #eee">
                    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Your Brand</a>
                    </div>
                    <p style="font-size:1.1em">Hi,</p>
                    <p>Thank you for choosing Your Brand. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
                    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
                    <p style="font-size:0.9em;">Regards,<br />Your Brand</p>
                    <hr style="border:none;border-top:1px solid #eee" />
                    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                    <p>Your Brand Inc</p>
                    <p>1600 Amphitheatre Parkway</p>
                    <p>California</p>
                    </div>
                </div>
                </div>
                
                ` });
                if (result.error) {
                    (0, ValidationError_1.default)(res, result.error);
                }
                else {
                    yield (0, users_1.UserDB)().updateUserById(user._id.toString(), user);
                    res.status(200).json(result);
                }
            }
            catch (error) {
                (0, ValidationError_1.default)(res, "Something went wrong");
            }
        }),
        // 🥕 Email Verification
        verifyEmail: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { email, otp } = req.body;
                console.log(req.body);
                // Find user by email
                const user = yield (0, users_1.UserDB)().getUserByEmail(email);
                if (!user)
                    return (0, ErrorHandler_1.default)(res, 403, 'User not exist');
                if (user.authentication.otp === otp) {
                    user.authentication.isVerified = true;
                    yield (0, users_1.UserDB)().updateUserById(user._id.toString(), user);
                    res.status(201).json({ message: "Email verification successful" });
                }
                else {
                    (0, ValidationError_1.default)(res, "OTP incorrect");
                }
            }
            catch (error) {
                (0, ValidationError_1.default)(res, "Something went wrong");
            }
        }),
        // 🥕 Login
        login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const shop_id = (0, GetUserIdentity_1.default)(req);
            const { email, password } = req.body;
            console.log(req.body);
            // Find user by email
            const user = yield (0, users_1.UserDB)().getUserByEmail(email).select('+authentication.salt +authentication.password');
            if (!user)
                return (0, ErrorHandler_1.default)(res, 403, 'User not exist');
            const expectedHash = (0, helpers_1.default)().authentication((_a = user === null || user === void 0 ? void 0 : user.authentication) === null || _a === void 0 ? void 0 : _a.salt, password);
            if (expectedHash != user.authentication.password)
                return (0, ErrorHandler_1.default)(res, 401, 'Wrong password');
            const salt = (0, helpers_1.default)().random();
            const newSessionToken = (0, helpers_1.default)().authentication(salt, user._id.toString());
            user.authentication.sessionToken = newSessionToken;
            yield (0, users_1.UserDB)().updateUserById(user._id.toString(), user);
            res.cookie('sessionToken', newSessionToken, {
                sameSite: 'none',
                secure: true
            });
            res.status(200).json({
                statuCode: 200,
                info: user.info,
                _id: user._id,
                authentication: {
                    isVerified: user.authentication.isVerified,
                },
                sessionToken: newSessionToken
            });
        }),
        logout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (req.params.id) {
                    yield (0, users_1.UserDB)().updateUserById(req.params.id, { 'info.lastActive': new Date() });
                    return res.status(200).json({ success: true });
                }
                else {
                    return res.status(200).json({ success: true });
                }
            }
            catch (error) {
                console.log(error);
                res.status(501).json(error);
            }
        }),
        // 🥕 Deactive account
        deactiveAccount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        })
    };
};
exports.authenticationController = authenticationController;
//# sourceMappingURL=authentication.js.map