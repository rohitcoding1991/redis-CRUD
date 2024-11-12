const express = require("express")
require("dotenv").config()
const app = express()
const db = require("./db")
const routes = require("./routes/user")
app.use(express.json())
app.use(express.urlencoded())

app.use("/",routes)

const port = process.env.PORT || 3000 
app.listen(port,()=>console.log(`server start on port ${port}`)
)