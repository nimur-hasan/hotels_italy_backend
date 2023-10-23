"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelDB = exports.HotelModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const HotelSchema = new mongoose_1.default.Schema({
    comune: String,
    provincia: String,
    denominazione_struttura: String,
    categoria: String,
    classificazione: String,
    id_struttura: String,
    indirizzo: String,
    cap: String,
    sigla_provincia: String,
    frazione: String,
    localita: String,
    posta_elettronica: String,
    telefono: String,
    fax: String,
    indirizzo_internet: String,
    camere: String,
    suite: String,
    letti: String,
    bagni: String,
    prima_colazione: String,
    in_abitato: String,
    sul_lago: String,
    vicino_eliporto: String,
    vicino_aereoporto: String,
    zona_centrale: String,
    vicino_impianto_risalita: String,
    zona_periferica: String,
    zona_stazione_fs: String,
    attrezzature: String,
    carte_di_pagamento_accettate: String,
    lingue: String,
    attrezzature_sportive: String,
    attrezzature_congressi: String,
    longitudine: String,
    latitudine: String,
    FIELD36: String,
    FIELD37: String,
}, {
    timestamps: true,
});
exports.HotelModel = mongoose_1.default.model('Hotel', HotelSchema);
// 🔥 Database Query
const HotelDB = () => {
    return {
        // ❤️‍🔥 GET
        getHotelById: (id) => exports.HotelModel.findById(id),
        getHotelBySlug: (slug) => exports.HotelModel.findOne({ slug: slug }),
        getCollectionSize: () => exports.HotelModel.find().count(),
        getAllHotels: (searchQuery, limit, skip, sortByRecent) => exports.HotelModel.find(searchQuery).skip(skip).limit(limit).sort({ updatedAt: sortByRecent ? 'desc' : 'asc' }),
        // ❤️‍🔥 CREATE
        createHotel: (values) => new exports.HotelModel(values)
            .save().then((Hotel) => Hotel.toObject()),
        createManyHotel: (values) => exports.HotelModel.insertMany(values),
        // ❤️‍🔥 UPDATE
        updateHotelById: (id, values) => exports.HotelModel.findByIdAndUpdate(id, values, { new: true, upsert: true }),
        updateHotelBySlug: (slug, values) => exports.HotelModel.findOneAndUpdate({ slug }, values, { new: true, upsert: true }),
        // ❤️‍🔥 DELETE
        deleteHotelById: (id) => exports.HotelModel.findByIdAndDelete(id),
        deleteHotelBySlug: (slug) => exports.HotelModel.findOneAndDelete({ slug })
    };
};
exports.HotelDB = HotelDB;
//# sourceMappingURL=hotel.js.map