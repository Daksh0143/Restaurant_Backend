const express=require("express")
const { addFoodItem,getAllFoodItem } = require("../controller/foodItemController")
const {upload} =require("../utills/multer")

const router=express.Router()


router.post("/addFood",upload.single('imageAddress'),addFoodItem)
router.get("/getAllFood",getAllFoodItem                                                                                                                         )



module.exports=router