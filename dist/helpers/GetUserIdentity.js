"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
exports.default = (req) => {
    var _a;
    const user = (0, lodash_1.get)(req, 'identity');
    if (user)
        return { shopId: (_a = user === null || user === void 0 ? void 0 : user.shopId) === null || _a === void 0 ? void 0 : _a._id, userId: user === null || user === void 0 ? void 0 : user._id };
    return null;
};
//# sourceMappingURL=GetUserIdentity.js.map