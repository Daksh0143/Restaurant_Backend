const User = require("../model/user.model")
    const { failureResponse, successResponse } = require("../helper/api.helper.response");
const { comparePassword, generateJWTToken } = require("../services/bcrypt.service");


const registerContoller = async (req, res) => {

    try {
        const {
            name, email, password, restaurantName, city, contactNumber, address
        } = req.body;

        if (!name || !email || !password || !restaurantName || !city || !contactNumber || !address) {
            return failureResponse({ message: "All fields are required", res })
        }

        let existingUser = await User.findOne({
            $or: [
                {
                    email: email
                },
                {
                    contactNumber: contactNumber
                }
            ]
        })
        if (existingUser) {
            return failureResponse({
                res, message: "User is already register"
            })
        }

        existingUser = await User.create({
            name, email, password, restaurantName, city, contactNumber, address
        })

        return res.json({
            success: true,
            message: "User register successfully",
            existingUser
        })

    } catch (error) {
        console.log("Error",error)
        return failureResponse({res,message:"Internal Server Error"})
    }
}

const loginController=async(req,res)=>{
    try {
        const {email,password} =req.body

        if(!email || !password){
            return failureResponse({
                res,
                message:"All fields are required",
            })
        }

        const existingUser=await User.findOne({email})
        if(!existingUser){
            return failureResponse({
                res,
                message:"User is not registered"
            })
        }

        let matchPassword=await comparePassword({
            enteredPassword:password,
            password:existingUser.password
        })

        if(!matchPassword){
            return failureResponse({
                res,
                message:"Email or Password is incorrect"
            })
        }

        const token=generateJWTToken(existingUser._id)
        return successResponse({
            res,
            data:{existingUser,token},
            message:"User Logged in Successfully"
        });
    } catch (error) {
        console.log("Error",error)
        return error
    }
}


module.exports={registerContoller,loginController}