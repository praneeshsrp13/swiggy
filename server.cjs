const bodyParser=require('body-parser')
const express=require('express')
const mongoose=require('mongoose')

const {Restaurant}=require('./schema.cjs')

const app=express()
app.use(bodyParser.json())
async function connectToDb() {
    try {
        await mongoose.connect('mongodb+srv://praneesh2004:praneesh2004@cluster0.aagup8e.mongodb.net/restaurantlist?retryWrites=true&w=majority')
        console.log('DB connection established ;)')
        const port = 8000
        app.listen(port, function() {
            console.log(`Listening on port ${port}...`)
        })
    } catch(error) {
        console.log(error)
        console.log('Couldn\'t establish connection :(')
    }
}
connectToDb()

app.post('/add-restaurant', async function(request, response){
    try {
        await Restaurant.create({
            "name" : request.body.name,
            "avgRating" : request.body.avgRating,
            "costForTwo" : request.body.costForTwo,
            "Cuisines" : request.body.Cuisines,
            "areaName" : request.body.areaName
        })
        response.status(201).json({
            "status" : "success",
            "message" : "restaurant entry success",

        })
    } catch(error) {
        response.status(500).json({
            "status" : "failure",
            "message" : "internal server error"
        })
   }
})

app.get('/get-restaurant-details', async function(request, response) {
    try {
        const restaurantDetails = await Restaurant.find()
        response.status(200).json(restaurantDetails)
    } catch(error) {
        response.status(500).json({
            "status" : "failure",
            "message" : "could not fetch",
            "error" : error
        })
    }
})
app.post('/create-new-user',async function(request,response){
    try{
   await Users.create({
        "userName" : request.body.username,
        "email": request.body.email,
        "password": request.body.password,
        "contact":request.body.contact
   }) 
   response.status(200).json({"status":"success","message":"user created"})

}catch(error){
     response.status(401).json({"status":"failure","message":"interval server error"})
}
})

app.post('/validate-user', async function(request, response) {
   try {
       const user = await Users.findOne({
           "email" : request.body.email,
           "password" : request.body.password 
       })
       if(user) {
           response.status(200).json({
               "message" : "valid user"
           })
       } else {
           response.status(401).json({
               "message" : "invalid user"
           })
       }
   } catch(error) {
       response.status(500).json({
           "message" : "internal server error"
       })
   }
})