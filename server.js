require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const projectRouter = require('./ProjectsRouter/router')
const userRoutes = require('./ProjectsRouter/userRouter')

const app  = express();


// middlewares
app.use(express.json())
app.use(cors())

// routes middlewares
app.use('/api/projects', projectRouter)
app.use('/api/user', userRoutes)

port = process.env.PORT || 4000;
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(port, ()=> {
            console.log(`Letenning on port http://localhost:${port} and connected in mongo db`)
        })
    })
    .catch((err)=> console.log(err))

