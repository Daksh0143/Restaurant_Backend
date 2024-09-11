const express=require("express")
const { registerContoller,loginController } = require("../controller/userContoller")
const {registerValidation} =require("../validation/user.validation")

const router=express.Router()



router.post("/register",registerValidation,registerContoller)
router.post("/login",loginController)



module.exports=router