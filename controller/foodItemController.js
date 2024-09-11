const FoodItem = require("../model/foodItem.model")
const { failureResponse, successResponse } = require("../helper/api.helper.response");
const cloudinary = require('cloudinary').v2;
require("dotenv").config()


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const addFoodItem = async (req, res) => {
    try {
        const { name, price, description } = req.body

        const file =req.file

        console.log("File",file)

        if(!file){
            return failureResponse({
                res,
                message:"Please provide a Image",
                success:false
            })
        }

        const result=await cloudinary.uploader.upload(file.path,{
            folder:"Restaurant_Name"
            
        })


        if (!name || !price || !description) {
            return failureResponse({ res, message: "All fields are required" })
        }

        const createFoodItem = await FoodItem.create({
            name, price, imageAddress:result.secure_url, description
        })

        console.log('Create Food Item',createFoodItem)

        return successResponse({
            res,
            success: true,
            message: "Food Added Successfully",
            data: createFoodItem
        })
    } catch (error) {
        console.log("Error",error)
        return failureResponse({
            res,
            success: false,
            message: "Internal Server error"
        })
    }
}

module.exports = { addFoodItem }