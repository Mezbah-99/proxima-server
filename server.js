require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');


const app  = express();


// middlewares
app.use(express.json())
app.use(cors())

const projectRouter = require('./ProjectsRouter/router')
// routes middlewares
app.use('/api/projects', projectRouter)

port = process.env.PORT || 4000;
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(port, ()=> {
            console.log(`Letenning on port http://localhost:${port} and connected in mongo db`)
        })
    })
    .catch((err)=> console.log(err))

