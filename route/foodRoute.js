const express=require("express")
const { addFoodItem } = require("../controller/foodItemController")
const {upload} =require("../utills/multer")

const router=express.Router()


router.post("/addFood",upload.single('imageAddress'),addFoodItem)



module.exports=router