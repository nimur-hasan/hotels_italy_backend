"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const SECRET = 'SHOP_MANAGEMENT';
exports.default = () => {
    return {
        random: () => crypto_1.default.randomBytes(128).toString('base64'),
        authentication: (salt, password) => {
            return crypto_1.default.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
        }
    };
};
//# sourceMappingURL=index.js.map