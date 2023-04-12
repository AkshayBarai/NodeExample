const express = require('express')
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())
allFormData = []

app.post('/api/formData', (req, res)=>{
    const data = req.body;
    allFormData.push(data)
    console.log(data,"data");
    return res.status(200).send({"msg":"successful Created"})
})
app.get('/api/formData', (req, res) => {
    return res.send(allFormData)
})

app.delete('/api/formData:studentId', (req, res) => {
    const { studentId } = req.params
    console.log(studentId, 'studentId');
    const studentIndex =allFormData.findIndex(element => element.id === studentId)
    if (studentIndex  === -1) {
        return res.status(400).send({ error: "Hotel Not Found" })
    }
    allHotel.splice(studentIndex , 1)
    return res.status(200).send({ error: "Hotel remove successfully" })
})

app.listen(3000,()=>{
    console.log('Server worked.....');
})

