var app=require('./server')
const mongoose = require('mongoose');
const startServer = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/merndb');
    app.listen(4000, () => {
        console.log('server is ready')
    })
}

module.exports=startServer;