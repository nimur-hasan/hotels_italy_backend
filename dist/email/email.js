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
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'najmabegumm23@gmail.com',
        pass: 'hgsestrpmhmvlqfy',
    },
});
const EmailService = () => {
    return {
        sendEmail: (data) => __awaiter(void 0, void 0, void 0, function* () {
            const { to, subject, html } = data;
            const mailOptions = {
                from: 'najmabegumm23@gmail.com',
                to,
                subject,
                html
            };
            try {
                const info = yield transporter.sendMail(mailOptions);
                console.log('Email sent:', info.response);
                return { message: 'Email sent successfully' };
            }
            catch (error) {
                console.error('Error sending email:', error);
                return { error: 'Failed to send email' };
            }
        }),
        // 🥕 send email verification
    };
};
exports.EmailService = EmailService;
//# sourceMappingURL=email.js.map