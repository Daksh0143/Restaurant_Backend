const mongoose =require("mongoose")

const foodSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    imageAddress:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

const FoodItem= mongoose.model("foodItem",foodSchema)

module.exports=FoodItem