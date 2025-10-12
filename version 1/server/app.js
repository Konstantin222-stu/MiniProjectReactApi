require('dotenv').config();
const express = require('express')
const application = express()
const fileUpload = require('express-fileupload')
const path = require('path')
const cors = require('cors')

const sequelize = require('./models/db')
const modules = require('./models')
const router = require('./routers')


application.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));


application.use(express.json())
application.use(express.static(path.resolve(__dirname, 'uploads')))
application.use(fileUpload({}))


application.use('/server', router)



const start = async ()=>{
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        application.listen(3001, ()=>{
            console.log('Робит')
        })
    }
    catch(e){
        console.log(e);
        
    }
}

start()