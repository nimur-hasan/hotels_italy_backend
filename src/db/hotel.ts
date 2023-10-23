import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema({
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
})

export interface HotelInterface {
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
}

export const HotelModel = mongoose.model('Hotel', HotelSchema)

// 🔥 Database Query
export const HotelDB = () => {
    return {

        // ❤️‍🔥 GET
        getHotelById: (id:string) =>  HotelModel.findById<HotelInterface>(id),
        getHotelBySlug: (slug:string) =>  HotelModel.findOne<HotelInterface>({slug:slug}),
        getCollectionSize: () => HotelModel.find().count(),
        getAllHotels: (searchQuery:object, limit?:number, skip?:number, sortByRecent?:boolean) => 
            HotelModel.find<HotelInterface>(searchQuery).skip(skip).limit(limit).sort({ updatedAt: sortByRecent?'desc':'asc' }),

        // ❤️‍🔥 CREATE
        createHotel : (values: Record<string, any>) => new HotelModel(values)
            .save().then((Hotel) => Hotel.toObject()),

        createManyHotel : (values: Record<string, any>[]) => HotelModel.insertMany(values),

        // ❤️‍🔥 UPDATE
        updateHotelById: (id:string, values:Record<string, any>) => 
            HotelModel.findByIdAndUpdate<HotelInterface>(id, values, {new: true, upsert: true}),

        updateHotelBySlug: (slug:string, values:Record<string, any>) => 
            HotelModel.findOneAndUpdate<HotelInterface>({slug}, values, {new: true, upsert: true}),

        // ❤️‍🔥 DELETE
        deleteHotelById: (id:string) => HotelModel.findByIdAndDelete<HotelInterface>(id),
        deleteHotelBySlug: (slug:string) => HotelModel.findOneAndDelete<HotelInterface>({slug})
    }
}