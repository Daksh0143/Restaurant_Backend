const express=require("express")
const dbConnect = require("./db/db")
const userRoute =require("./route/userRoute")
const foodRoute=require("./route/foodRoute")
const cors = require("cors")

require("dotenv").config()


const app=express()
const port=process.env.PORT


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())


app.use("/api/v1/user",userRoute)
app.use("/api/v1/food",foodRoute)
dbConnect()


app.listen(port,()=>(
    console.log(`server is listening on ${port}`)
))
