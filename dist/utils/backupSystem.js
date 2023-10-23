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
exports.takeBackup = void 0;
const hotel_1 = require("../db/hotel");
const purchase_1 = require("../db/purchase");
const fs_1 = __importDefault(require("fs"));
const takeBackup = () => __awaiter(void 0, void 0, void 0, function* () {
    // Sample data for the JSON files
    const data1 = { id: 1, name: 'John Doe2', age: 30 };
    const data2 = { id: 2, name: 'Jane Smith', age: 25 };
    const data3 = { id: 3, name: 'Bob Johnson', age: 40 };
    const Purchases = yield purchase_1.PurchaseModel.find();
    console.log(Purchases.length);
    const Medicines = yield hotel_1.HotelModel.find();
    console.log(Medicines.length);
    // Creating JSON files
    fs_1.default.writeFileSync('src/utils/files/data1.json', JSON.stringify(data1, null, 2));
    fs_1.default.writeFileSync('src/utils/files/data2.json', JSON.stringify(data2, null, 2));
    fs_1.default.writeFileSync('src/utils/files/data3.json', JSON.stringify(data3, null, 2));
});
exports.takeBackup = takeBackup;
//# sourceMappingURL=backupSystem.js.map