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
exports.emailController = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const email_1 = require("../email/email");
const ValidationError_1 = __importDefault(require("../helpers/ValidationError"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'najmabegumm23@gmail.com',
        pass: 'hgsestrpmhmvlqfy',
    },
});
const emailController = () => {
    return {
        sendEmail: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const { to, subject, text } = {
                to: "developernaim20@gmail.com",
                subject: "developernaim",
                text: "How are you!"
            };
            const mailOptions = {
                from: 'najmabegumm23@gmail.com',
                to,
                subject,
                text,
            };
            try {
                const info = yield transporter.sendMail(mailOptions);
                console.log('Email sent:', info.response);
                res.json({ message: 'Email sent successfully' });
            }
            catch (error) {
                console.error('Error sending email:', error);
                res.status(500).json({ error: 'Failed to send email' });
            }
        }),
        // 🥕 send b2c email
        B2CMail: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { contact_mail, contact_phone, from_date, to_date, type_of_message, type_of_rooms, number_of_rooms, serviceReq, message } = req.body;
                const html = `
                    <div>
                        <table>
                            <thead>
                                <h4>Client's requirements.</h4>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Type Of Message: </td>
                                    <td><b>${type_of_message}</b></td>
                                </tr>
                                <tr>
                                    <td>Type Of Rooms: </td>
                                    <td><b>${type_of_rooms}</b></td>
                                </tr>
                                <tr>
                                    <td>Number Of Rooms: </td>
                                    <td><b>${number_of_rooms}</b></td>
                                </tr>
                                <tr>
                                    <td>Service Required: </td>
                                    <td><b>${serviceReq}</b></td>
                                </tr>
                                <tr>
                                    <td>From ( Date ): </td>
                                    <td><b>${from_date}</b></td>
                                </tr>
                                <tr>
                                    <td>To ( Date ): </td>
                                    <td><b>${to_date}</b></td>
                                </tr>
                                <tr>
                                    <td>Contact Mail: </td>
                                    <td><b>${contact_mail}</b></td>
                                </tr>
                                <tr>
                                    <td>Contact Phone: </td>
                                    <td><b>${contact_phone}</b></td>
                                </tr>
                                <tr>
                                    <td>Message: </td>
                                    <td><b>${message}</b></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                 `;
                const result = yield (0, email_1.EmailService)().sendEmail({
                    to: 'lelelondra7@gmail.com, emaxlondon11@gmail.com, emaxlondon10@gmail.com, developernaim20@gmail.com, mdnimurhasann@gmail.com',
                    subject: 'B2C Mails',
                    html
                });
                console.log(result);
                res.status(200).json(result);
            }
            catch (error) {
                (0, ValidationError_1.default)(res, error);
            }
        })
    };
};
exports.emailController = emailController;
//# sourceMappingURL=email.js.map