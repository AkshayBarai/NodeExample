const express = require('express')
const Joi = require('joi')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

//const validator = require('express-joi-validation').createValidator({})

const app = express();
const data = mongoose.connect('mongodb+srv://akshay1997:aFaMESZxms3VK1OP@cluster0.npbmaas.mongodb.net/?retryWrites=true&w=majority')
app.use(bodyParser.json())

const hotelSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    id: Joi.number().integer(), 
    //price: Joi.number().integer(),
})

const allHotel = []

app.get('/api/hotel', (req, res) => {
    return res.send(allHotel)
})

app.get('/api/hotel/:hotelId', (req, res) => {
    const { hotelId } = req.params
    console.log(hotelId, 'hotelId');
    const hotel = allHotel.find(element => element.id === hotelId)
    if (hotel) {
        return res.send(hotel)
    } else {
        return res.status(400).send({ error: "Hotel Not Found" })
    }
})

app.delete('/api/hotel/:hotelId', (req, res) => {
    const { hotelId } = req.params
    console.log(hotelId, 'hotelId');
    const hotelIndex = allHotel.findIndex(element => element.id === hotelId)
    if (hotelIndex === -1) {
        return res.status(400).send({ error: "Hotel Not Found" })
    }
    allHotel.splice(hotelIndex, 1)
    return res.status(200).send({ error: "Hotel remove successfully" })

})
app.put('/api/hotel/:hotelId', (req, res) => {
    const { hotelId } = req.params
    const hotel = req.body;
    console.log(hotelId, 'hotelId');
    const hotelIndex = allHotel.findIndex(element => element.id === hotelId)
    if (hotelIndex === -1) {
        return res.status(400).send({ error: "Hotel Not Found" })
    }
    allHotel[hotelIndex] = {
        name: hotel.name,
        id: hotelId
    }
    return res.status(200).send(allHotel[hotelIndex])

})
app.post('/api/hotel', (req, res) => {
    const hotel = req.body;
    const { error } = hotelSchema.validate(hotel)
    if (error) {
        return res.status(400).send({ msg: error.message })
    }
    allHotel.push(hotel)
    return res.status(200).send({ msg: "successful Created" })
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
