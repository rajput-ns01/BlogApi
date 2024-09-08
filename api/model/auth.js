const mongoose=require('mongoose')

authSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    fullName:String,
    email:String,
    password:String,
    imageUrl:String
})

module.exports=mongoose.model('Auth',authSchema)