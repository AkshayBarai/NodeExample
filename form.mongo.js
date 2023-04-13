const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const Joi = require('joi')
const { formmodelDB } = require('./form.mode')

const app = express();
app.use(bodyParser.json())
const monConnection = mongoose.connect('mongodb+srv://akshay1997:aFaMESZxms3VK1OP@cluster0.npbmaas.mongodb.net/?retryWrites=true&w=majority')
//allFormData = []

const formDataSchema = Joi.object({
    studentId: Joi.number().integer(),
    studentName: Joi.string().min(3).max(30).required(),
    class: Joi.number().min(1),
    rollNo: Joi.number().integer(),
})

app.post('/api/formData', async (req, res) => {
    const data = req.body;
    const { error } = formDataSchema.validate(data)
    if (error) {
        return res.status(400).send({ msg: error.message })
    }
    //allFormData.push(data)
    const storeFormData = new formmodelDB({ ...data })
    const response = await storeFormData.save()
    //console.log(data,"data");
    return res.status(201).
        send({
            msg: "successful Created",
            data: response.toJSON()
        })
})
app.get('/api/formData', async (req, res) => {
    const allFormData = await formmodelDB.find({})
    return res.send(allFormData)
})

app.delete('/api/formData/:studentId', async (req, res) => {
    const { studentId } = req.params
    //console.log(studentId, 'studentId');
    //const studentIndex = allFormData.findIndex(element => element.id === studentId)
    const studentIndex = await formmodelDB.findOneAndDelete({ _id: studentId })
    if (!studentIndex) { //studentIndex === -1 
        return res.status(400).send({ error: "Hotel Not Found" })
    }
    // allHotel.splice(studentIndex, 1)
    return res.status(200).send({ msg: "Hotel remove successfully" })
})

app.put('/api/formData/:studentId', async (req, res) => {
    const { studentId } = req.params
    const StudentData = req.body;
    // const hotelIndex = allHotel.findIndex(element => element.id === hotelId)
    console.log( StudentData,' StudentData');
    const studentIndex = await formmodelDB.findByIdAndUpdate({ _id: studentId })
    if (!studentIndex) {
        return res.status(400).send({ error: "Hotel Not Found" })
    }

    const newFormData = new formmodelDB({ studentId: StudentData.studentId, studentName: StudentData.studentName, class: StudentData.class, rollNo: StudentData.rollNo });
    const response = await newFormData.save();
    return res.status(201).
        send({
            msg: "successful Created",
            data: response.toJSON()
        })

    // app.listen(3000,()=>{
    //     console.log('Server worked.....');
})

monConnection.then(() => {
    app.listen(3000, () => {
        console.log('Server worked.....!');
    })
})
    .catch((error) => {
        console.log(error, "It is not connect to DB");

    })

