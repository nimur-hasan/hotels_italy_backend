import { HotelController } from '../controller/hotels'
import express from 'express'
import { isAuthenticated } from '../middlewares'

export default async(router:express.Router) => {
    // ❤️‍🔥 POST
    router.post('/Hotels', isAuthenticated, HotelController().addHotel),
    router.post('/Hotels/multiple', isAuthenticated, HotelController().addHotelMultiple)

    // ❤️‍🔥 GET
    router.get('/hotels/size', isAuthenticated, HotelController().getHotelCollectionSize)
    router.get('/hotels', HotelController().getAllHotels)
    router.get('/hotels/categories', HotelController().getAllCategories)
    router.get('/hotels/provincias', HotelController().getAllProvincia)
    router.post('/hotels/filter', HotelController().getFilterHotels)
    router.get('/hotels/getHotelBySlug', isAuthenticated, HotelController().getHotelBySlug)
    router.get('/hotels/getHotelById', isAuthenticated, HotelController().getHotelById)

    // ❤️‍🔥 UPDATE
    router.put('/hotels/:id', isAuthenticated, HotelController().updateHotelById)

    // ❤️‍🔥 DELETE
    router.delete('/hotels/:id', isAuthenticated, HotelController().deleteHotelById)
}