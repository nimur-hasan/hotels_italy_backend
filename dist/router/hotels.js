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
Object.defineProperty(exports, "__esModule", { value: true });
const hotels_1 = require("../controller/hotels");
const middlewares_1 = require("../middlewares");
exports.default = (router) => __awaiter(void 0, void 0, void 0, function* () {
    // ❤️‍🔥 POST
    router.post('/Hotels', middlewares_1.isAuthenticated, (0, hotels_1.HotelController)().addHotel),
        router.post('/Hotels/multiple', middlewares_1.isAuthenticated, (0, hotels_1.HotelController)().addHotelMultiple);
    // ❤️‍🔥 GET
    router.get('/hotels/size', middlewares_1.isAuthenticated, (0, hotels_1.HotelController)().getHotelCollectionSize);
    router.get('/hotels', (0, hotels_1.HotelController)().getAllHotels);
    router.get('/hotels/categories', (0, hotels_1.HotelController)().getAllCategories);
    router.get('/hotels/provincias', (0, hotels_1.HotelController)().getAllProvincia);
    router.post('/hotels/filter', (0, hotels_1.HotelController)().getFilterHotels);
    router.post('/hotels/search', (0, hotels_1.HotelController)().searchHotels);
    router.get('/hotels/getHotelBySlug', middlewares_1.isAuthenticated, (0, hotels_1.HotelController)().getHotelBySlug);
    router.get('/hotels/getHotelById', middlewares_1.isAuthenticated, (0, hotels_1.HotelController)().getHotelById);
    // ❤️‍🔥 UPDATE
    router.put('/hotels/:id', middlewares_1.isAuthenticated, (0, hotels_1.HotelController)().updateHotelById);
    // ❤️‍🔥 DELETE
    router.delete('/hotels/:id', middlewares_1.isAuthenticated, (0, hotels_1.HotelController)().deleteHotelById);
});
//# sourceMappingURL=hotels.js.map