"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (res, statusCode, message) => {
    return res.status(statusCode).json({
        statusCode,
        message
    });
};
//# sourceMappingURL=ErrorHandler.js.map