const mongoose=require('mongoose')

const restaurantsSchema=new mongoose.Schema({
    name:{
        type:String
    },
    avgRating:{
        type:Number
    },
    costForTwo:{
        type:String
    },
    Cuisines:{
        type:Array
    },
    areaName:{
        type:String
    }
})
const Restaurant=mongoose.model('restaurantlist',restaurantsSchema)

module.exports={Restaurant}