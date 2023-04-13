const mongoose = require("mongoose");


const HotelSchema = { name: String, price: Number, avgRating: Number };

const Hotel = mongoose.model("HotelDataStore", HotelSchema);//In vsCode :- HotelDataStore ,In MongooseDb :-hoteldatastores

module.exports.HotelData = Hotel;