"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDB = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    info: {
        fname: { type: String, required: true },
        lname: { type: String, required: true },
        email: { type: String, required: true },
    },
    authentication: {
        password: { type: String, required: true },
        salt: { type: String, required: true },
        sessionToken: { type: String, required: false },
        isVerified: { type: Boolean, default: false },
        otp: { type: String, default: '' }
    }
}, {
    timestamps: true,
});
exports.UserModel = mongoose_1.default.model('User', UserSchema);
// 🔥 Database Query
const UserDB = () => {
    return {
        // ❤️‍🔥 GET
        getAllUsers: (searchQuery, limit, skip, sortByRecent) => exports.UserModel.find(searchQuery).skip(skip).limit(limit).sort({ updatedAt: sortByRecent ? 'desc' : 'asc' }),
        getUserByEmail: (email) => exports.UserModel.findOne({ 'info.email': email }),
        getUserBySessionToken: (sessionToken) => exports.UserModel.findOne({
            'authentication.sessionToken': sessionToken
        }),
        getUserById: (id) => exports.UserModel.findOne({ _id: id }),
        // ❤️‍🔥 CREATE
        createUser: (values) => new exports.UserModel(values)
            .save().then((user) => user.toObject()),
        // ❤️‍🔥 DEACTIVE
        deactiveUser: (id) => exports.UserModel.findByIdAndUpdate({
            _id: id
        }, { 'authentication.isActive': false }, { new: true }),
        // ❤️‍🔥 ACTIVE
        activeUser: (id) => exports.UserModel.findByIdAndUpdate({
            _id: id
        }, { 'authentication.isActive': true }, { new: true }),
        // ❤️‍🔥 UPDATE
        updateUserById: (id, values) => exports.UserModel.findOneAndUpdate({ _id: id }, values, { new: true }),
        deleteUserById: (id) => exports.UserModel.findOneAndDelete({ _id: id }),
    };
};
exports.UserDB = UserDB;
//# sourceMappingURL=users.js.map