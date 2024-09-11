const mongoose=require("mongoose")


const dbConnect=async()=>{
    await mongoose.connect("mongodb://localhost:27017",{
        dbName:"restoApp"
    }).then((result) => {
        console.log("Db connection Successfully")
    }).catch((err) => {
        console.log("Error",err)
    });
}

module.exports=dbConnect
