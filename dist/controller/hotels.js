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
exports.HotelController = void 0;
const ErrorHandler_1 = __importDefault(require("../helpers/ErrorHandler"));
const Slugify_1 = __importDefault(require("../helpers/Slugify"));
const hotel_1 = require("../db/hotel");
const ValidationError_1 = __importDefault(require("../helpers/ValidationError"));
const HotelController = () => {
    return {
        addHotel: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return res.status(201).json(false);
            }
            catch (error) {
                console.log(error);
                return (0, ErrorHandler_1.default)(res, 501, error);
            }
        }),
        addHotelMultiple: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let HotelItems = [];
                req.body.map((item, index) => {
                    const { brandName, unitPrice, strength, initQty, dosageForm } = item;
                    if (!brandName || !unitPrice)
                        return (0, ErrorHandler_1.default)(res, 400, `brandName, unitPrice required: sr: ${index + 1}, brandName: ${brandName}, unitPrice: ${unitPrice}`);
                    const slug = (0, Slugify_1.default)(brandName + '-' + dosageForm + "-" + strength);
                    let Hotel = {
                        brandName,
                        unitPrice,
                        slug,
                        additionalInfo: Object.assign({}, item),
                        ecommerce: {
                            purchase: initQty || 0,
                            inStock: initQty || 0,
                        }
                    };
                    HotelItems = [...HotelItems, Hotel];
                });
                const createdHotel = yield (0, hotel_1.HotelDB)().createManyHotel(HotelItems);
                return res.status(201).json(createdHotel);
            }
            catch (error) {
                console.log(error);
                return (0, ErrorHandler_1.default)(res, 501, error);
            }
        }),
        getHotelCollectionSize: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const size = yield (0, hotel_1.HotelDB)().getCollectionSize();
                return res.status(200).json(size);
            }
            catch (error) {
                console.log(error);
                (0, ErrorHandler_1.default)(res, 501, error);
            }
        }),
        getHotelBySlug: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { slug = '' } = req.query;
                console.log(slug);
                const Hotel = yield (0, hotel_1.HotelDB)().getHotelBySlug(slug.toString());
                return res.status(200).json(Hotel);
            }
            catch (error) {
                console.log(error);
                (0, ErrorHandler_1.default)(res, 501, error);
            }
        }),
        getHotelById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { id } = req.query;
                console.log(id);
                const Hotel = yield (0, hotel_1.HotelDB)().getHotelById(id.toString());
                return res.status(200).json(Hotel);
            }
            catch (error) {
                console.log(error);
                (0, ErrorHandler_1.default)(res, 501, error);
            }
        }),
        updateHotelById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const Hotel = yield (0, hotel_1.HotelDB)().updateHotelById(req.params.id, req.body);
                return res.status(200).json(Hotel);
            }
            catch (error) {
                console.log(error);
                (0, ErrorHandler_1.default)(res, 501, error);
            }
        }),
        deleteHotelById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield (0, hotel_1.HotelDB)().deleteHotelById(req.params.id);
                return res.status(200).json({
                    success: true
                });
            }
            catch (error) {
                console.log(error);
                (0, ErrorHandler_1.default)(res, 501, error);
            }
        }),
        getAllHotels: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const { limit = 50, comune = '', genericName = '', dosageForm = '', skip = 0, queryType = 'OR', sortByRecent } = req.query;
            const searchQuery = [];
            if (comune) {
                searchQuery.push({ "comune": { $regex: `^${comune}`, $options: 'i' } });
            }
            // if(genericName){ searchQuery.push({"additionalInfo.genericName":{$regex:`^${genericName}`, $options: 'i'}}) }
            // if(dosageForm){ searchQuery.push({"additionalInfo.dosageForm":{$regex:`^${dosageForm}`, $options: 'i'}}) }
            let query = {};
            if (comune || genericName || dosageForm) {
                if (queryType == 'OR') {
                    query = {
                        $or: searchQuery
                    };
                }
                else {
                    query = {
                        $and: searchQuery
                    };
                }
            }
            try {
                const Hotels = yield (0, hotel_1.HotelDB)().getAllHotels(query, parseInt(limit.toString()), parseInt(skip.toString()), sortByRecent == 'false' ? false : true);
                return res.status(200).json(Hotels);
            }
            catch (error) {
                console.log(error);
                (0, ErrorHandler_1.default)(res, 501, error);
            }
        }),
        getAllCategories: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const hotels = yield hotel_1.HotelModel.find();
                let categories = [];
                hotels.map((hotel) => {
                    const newcat = hotel.categoria;
                    let isExistCat = false;
                    let updatedCategories = [];
                    categories.map((cat) => {
                        if (cat.name == newcat) {
                            isExistCat = true;
                            updatedCategories = [...updatedCategories, Object.assign(Object.assign({}, cat), { count: cat.count + 1 })];
                        }
                        else {
                            updatedCategories = [...updatedCategories, cat];
                        }
                    });
                    if (!isExistCat) {
                        categories = [...categories, { name: newcat, count: 0 }];
                    }
                    else {
                        categories = updatedCategories;
                    }
                });
                res.status(200).json(categories);
            }
            catch (error) {
                console.log(error);
                (0, ErrorHandler_1.default)(res, 501, error);
            }
        }),
        getAllProvincia: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const hotels = yield hotel_1.HotelModel.find();
                let provincias = [];
                hotels.map((hotel) => {
                    const newcat = hotel.provincia;
                    let isExistCat = false;
                    let updatedProvincias = [];
                    provincias.map((cat) => {
                        if (cat.name == newcat) {
                            isExistCat = true;
                            updatedProvincias = [...updatedProvincias, Object.assign(Object.assign({}, cat), { count: cat.count + 1 })];
                        }
                        else {
                            updatedProvincias = [...updatedProvincias, cat];
                        }
                    });
                    if (!isExistCat) {
                        provincias = [...provincias, { name: newcat, count: 0 }];
                    }
                    else {
                        provincias = updatedProvincias;
                    }
                });
                res.status(200).json(provincias);
            }
            catch (error) {
                console.log(error);
                (0, ErrorHandler_1.default)(res, 501, error);
            }
        }),
        getFilterHotels: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const { provincia = [], categories = [], searchText = '' } = req.body;
                const hotels = yield hotel_1.HotelModel.find({
                    provincia: { $in: provincia },
                    categoria: { $in: categories },
                });
                res.status(200).json({
                    results: hotels.length,
                    hotels: hotels.slice(0, 50)
                });
            }
            catch (error) {
                (0, ValidationError_1.default)(res, error);
            }
        }),
        searchHotels: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const { searchText } = req.body;
                const hotels = yield hotel_1.HotelModel.find({ $text: { $search: searchText } });
                res.status(200).json(hotels.length);
            }
            catch (error) {
                (0, ValidationError_1.default)(res, error);
            }
        })
    };
};
exports.HotelController = HotelController;
//# sourceMappingURL=hotels.js.map