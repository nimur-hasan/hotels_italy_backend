import express from 'express'
import ErrorHandler from '../helpers/ErrorHandler';
import Slugify from '../helpers/Slugify';
import { HotelDB, HotelModel } from '../db/hotel';
import ValidationError from '../helpers/ValidationError';

export const HotelController = () => {
    return {
        addHotel: async(req:express.Request, res: express.Response) => {
            try {
               

    
                return res.status(201).json(false)
            } catch (error) {
                console.log(error)
                return ErrorHandler(res, 501, error)
            }

        },

        addHotelMultiple: async(req:express.Request, res: express.Response) => {

            interface ItemInterface {
                brandName: string,
                unitPrice: number,
                strength: string,
                initQty?: number,
                genericName: string,
                company: string,
                dosageForm: string,
                unit: string
            }

            try {

                let HotelItems:any = []

                req.body.map((item:ItemInterface, index:number) => {
                    
                    const {brandName, unitPrice, strength, initQty, dosageForm} = item;                
                

                
                if(!brandName || !unitPrice) return ErrorHandler(res, 400, `brandName, unitPrice required: sr: ${index+1}, brandName: ${brandName}, unitPrice: ${unitPrice}`)
                
                
                    const slug = Slugify(brandName+'-'+dosageForm+"-"+strength)
    
                    let Hotel = {
                        brandName,
                        unitPrice,
                        slug,
                        
                        additionalInfo: {
                            ...item
                        },
                        ecommerce: {
                            purchase: initQty || 0,
                            inStock: initQty || 0,
                        }
                    }

                    HotelItems = [...HotelItems, Hotel]
                })

                

                const createdHotel = await HotelDB().createManyHotel(HotelItems)

                return res.status(201).json(createdHotel)
            } catch (error) {
                console.log(error)
                return ErrorHandler(res, 501, error)
            }

        },

        getHotelCollectionSize: async(req:express.Request, res:express.Response) => {
            try {
                const size = await HotelDB().getCollectionSize()
                return res.status(200).json(size)
            } catch (error) {
                console.log(error)
                ErrorHandler(res, 501, error) 
            }
        },

        getHotelBySlug: async(req:express.Request, res:express.Response) =>{
            try {
                const {slug=''} = req.query
                console.log(slug)
                const Hotel = await HotelDB().getHotelBySlug(slug.toString())
                return res.status(200).json(Hotel)
            } catch (error) {
                console.log(error)
                ErrorHandler(res, 501, error)
            }
        },

        getHotelById: async(req:express.Request, res:express.Response) =>{
            try {
                const {id} = req.query
                console.log(id)
                const Hotel = await HotelDB().getHotelById(id.toString())
                return res.status(200).json(Hotel)
            } catch (error) {
                console.log(error)
                ErrorHandler(res, 501, error)
            }
        },

        updateHotelById: async(req:express.Request, res:express.Response) =>{
            try {                
                const Hotel = await HotelDB().updateHotelById(req.params.id, req.body)
                return res.status(200).json(Hotel)
            } catch (error) {
                console.log(error)
                ErrorHandler(res, 501, error)
            }
        },

        deleteHotelById: async(req:express.Request, res:express.Response) =>{
            try {                
                await HotelDB().deleteHotelById(req.params.id)
                return res.status(200).json({
                    success: true
                })
            } catch (error) {
                console.log(error)
                ErrorHandler(res, 501, error)
            }
        },
        
        getAllHotels: async(req:express.Request, res: express.Response) => {
            
            const {limit=50, comune='', genericName='', dosageForm='', skip=0,  queryType='OR', sortByRecent} = req.query
            
            
            const searchQuery = []
            if(comune){ searchQuery.push({"comune":{$regex:`^${comune}`, $options: 'i'}}) }
            // if(genericName){ searchQuery.push({"additionalInfo.genericName":{$regex:`^${genericName}`, $options: 'i'}}) }
            // if(dosageForm){ searchQuery.push({"additionalInfo.dosageForm":{$regex:`^${dosageForm}`, $options: 'i'}}) }
            
            let query = {}
            if(comune || genericName || dosageForm){
                if(queryType == 'OR'){
                    query = {
                        $or: searchQuery
                    }
                }else{
                    query = {
                        $and: searchQuery
                    }
                }
            }

            try {
                const Hotels = await HotelDB().getAllHotels(query, parseInt(limit.toString()), parseInt(skip.toString()), sortByRecent=='false'?false:true)
                return res.status(200).json(Hotels)
            } catch (error) {
                console.log(error)
                ErrorHandler(res, 501, error)
            }
        },

        getAllCategories: async(req:express.Request, res:express.Response) => {
            try {
                const hotels = await HotelModel.find()

                let categories:any[] = []

                hotels.map((hotel) => {
                    const newcat = hotel.categoria
                    let isExistCat = false

                    let updatedCategories:any[] = []
                    categories.map((cat:any) => {
                        if(cat.name == newcat){
                            isExistCat = true
                            updatedCategories = [...updatedCategories, {...cat, count: cat.count+1}]
                        }else{
                            updatedCategories = [...updatedCategories, cat]
                        }
                    })

                    if(!isExistCat){
                        categories = [...categories, {name: newcat, count: 0}]
                    }else{
                        categories = updatedCategories
                    }
                })

                res.status(200).json(categories)


            } catch (error) {
                console.log(error)
                ErrorHandler(res, 501, error)
            }
        },

        getAllProvincia: async(req:express.Request, res:express.Response) => {
            try {
                const hotels = await HotelModel.find()

                let provincias:any[] = []

                hotels.map((hotel) => {
                    const newcat = hotel.provincia
                    let isExistCat = false

                    let updatedProvincias:any[] = []
                    provincias.map((cat:any) => {
                        if(cat.name == newcat){
                            isExistCat = true
                            updatedProvincias = [...updatedProvincias, {...cat, count: cat.count+1}]
                        }else{
                            updatedProvincias = [...updatedProvincias, cat]
                        }
                    })

                    if(!isExistCat){
                        provincias = [...provincias, {name: newcat, count: 0}]
                    }else{
                        provincias = updatedProvincias
                    }
                })

                res.status(200).json(provincias)


            } catch (error) {
                console.log(error)
                ErrorHandler(res, 501, error)
            }
        },

        getFilterHotels: async(req:express.Request, res: express.Response) => {

            try {
                console.log(req.body)
                const {provincia=[], categories=[], searchText=''} = req.body          
                const hotels = await HotelModel.find({
                    provincia: {$in: provincia},
                    categoria: {$in: categories},                    
                })

                res.status(200).json({
                    results: hotels.length,
                    hotels: hotels.slice(0, 50)
                })
            } catch (error) {
                ValidationError(res, error)
            }
        },

        searchHotels: async(req:express.Request, res: express.Response) => {

            try {
                console.log(req.body)
                const { searchText } = req.body 
                const hotels = await HotelModel.find({$text : { $search : searchText }})
                res.status(200).json(hotels.length)

            } catch (error) {
                ValidationError(res, error)
            }
        }


    }
}