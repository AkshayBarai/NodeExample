const express = require('express')
const Joi = require('joi')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const { HotelData } = require("./hotel.mode");

//const validator = require('express-joi-validation').createValidator({})

const app = express();
const data = mongoose.connect('mongodb+srv://akshay1997:aFaMESZxms3VK1OP@cluster0.npbmaas.mongodb.net/?retryWrites=true&w=majority')
app.use(bodyParser.json())

const hotelSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
   // id: Joi.number().integer(),
    avgRating: Joi.number().min(0).max(10), 
    price: Joi.number().integer(),
})

//const allHotel = []

app.get('/api/hotel', async (req, res) => {
    const allHotel = await HotelData.find({})
    return res.send(allHotel)
})

app.get('/api/hotel/:hotelId', (req, res) => {
    const { hotelId } = req.params
    console.log(hotelId, 'hotelId');
    //const hotel = allHotel.find(element => element.id === hotelId)
    const hotel = HotelData.findOne({_id:hotelId})
    if (hotel) {
        return res.send(hotel)
    } else {
        return res.status(400).send({ error: "Hotel Not Found" })
    }
})

app.delete('/api/hotel/:hotelId', async(req, res) => {
    const { hotelId } = req.params
    console.log(hotelId, 'hotelId');
    //const hotelIndex = allHotel.findIndex(element => element.id === hotelId)
    const hotelIndex = await HotelData.findOneAndDelete({_id:hotelId})
    if (!hotelIndex) { //hotelIndex === -1
        return res.status(400).send({ error: "Hotel Not Found" })
    }
    //allHotel.splice(hotelIndex, 1)
    return res.status(200).send({ msg: "Hotel remove successfully" })
 
})
app.put('/api/hotel/:hotelId', async(req, res) => {
    const { hotelId } = req.params
    const hotel = req.body;
    console.log(hotelId, 'hotelId');
   // const hotelIndex = allHotel.findIndex(element => element.id === hotelId)
   const hotelIndex = await HotelData.findByIdAndUpdate({_id :hotelId })
    if (!hotelIndex) {
        return res.status(400).send({ error: "Hotel Not Found" })
    }

    const newHotel = new HotelData({name: hotel.name,avgRating: hotel.avgRating,price:hotel.price});
    const response = await newHotel.save();
    return res.status(200).
    send({ msg: "successful Created",
    data: response.toJSON()
 })
    // allHotel[hotelIndex] = {
    //     name: hotel.name,
    //     avgRating: hotel.avgRating,
    //     price:hotel.price
    // }
    //return res.status(200).send(hotelIndex)//allHotel[hotelIndex]

 })
app.post('/api/hotel', async(req, res) => {
    const hotel = req.body;
    const { error } = hotelSchema.validate(hotel)
    if (error) {
        return res.status(400).send({ msg: error.message })
    }
    //allHotel.push(hotel)
    const newHotel = new HotelData({...hotel});
    const response = await newHotel.save();
    return res.status(201).
    send({ msg: "successful Created",
    data: response.toJSON()
 })
   
})
// app.listen(3000, () => {
//     console.log('Server worked!'); 
// })

data.then(() => {
    app.listen(3000, () => {
        console.log('Server worked!');
    })
})
.catch((error)=>{
    console.log(error ,"It is not connect to DB");

})
