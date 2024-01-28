var express = require('express')
var bp = require('body-parser')

const mongoose = require('mongoose');
// import empcrud from './model'
const empcrud = require('./model')
// const startServer = require('./startserver')


var app = express()
app.use(bp.json())


app.post('/adduser', (req, res) => {
    const users = new empcrud(
        {   ...req.body //can only be used if schema defined and data added to postman have same attributes(this bascically directly maps the data)
            
            // manual mapping =>
            // name: req.body.name,
            // email: req.body.email,
            // password: req.body.password
        });
        // users.save().then(() => console.log('user added....'));
        users.save().then(() => res.send('user added....'));
})

app.get('/loadusers', async (req, res) => {
    const users = await empcrud.find()
    return res.status(200).json(users)
})

app.get('/loadusers/:id', async (req, res) => {
    const uid=req.params.id
    const users = await empcrud.findById(uid)
    return res.status(200).json(users)
})

app.put('/updateusers/:id', async (req, res) => {
    const uid=req.params.id
    await empcrud.updateOne({uid},req.body)
    const updateuser = await empcrud.findById(uid)
    return res.status(200).json(updateuser)
})

app.delete('/deleteusers/:id', async (req, res) => {
    const uid=req.params.id
    const users = await empcrud.findByIdAndDelete(uid)
    return res.status(200).json(users)
})

const startServer = async () => {
    // await mongoose.connect('mongodb://127.0.0.1:27017/merndb');
    await mongoose.connect("mongodb+srv://admin:admin123@merncluster.zlgqdsf.mongodb.net/merndb?retryWrites=true&w=majority"); //connecting to atlas
    app.listen(4000, () => {
        console.log('server is ready')
    })
}


startServer()
