const express = require('express')
const app = express()
const PORT = 3512
const cors = require("cors")
const db   =  require('./Db/Db')

app.use(cors())
require('./Models/model')
app.use(express.json())
app.use(require("./Routes/Routes"))

app.listen(PORT , ()=>{
    console.log(`Server is running on PORT : ${PORT}`)
})