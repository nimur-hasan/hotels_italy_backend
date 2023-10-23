"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (res, message) => {
    return res.status(401).json({
        statusCode: 401,
        message
    });
};
//# sourceMappingURL=ValidationError.js.map