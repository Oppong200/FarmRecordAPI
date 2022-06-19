//import express
const express = require('express');

//import mongoose
const mongoose = require('mongoose');

const dotenv=require('dotenv');

const model=require('./models/records')
const bodyParser = require('body-parser');
const { get } = require('http');

//creating an instance of express
const app = express();
app.use(bodyParser.json());

dotenv.config();
const port = 8080 || process.env.PORT;

//router routes
app.post('/farmRecords', async (req,res)=>{
    try{
        const createRecord = model.create({
            farm:req.body.farm,
            plant:req.body.plant,
            activity:req.body.activity,
            date:req.body.date,
        });
        const save=await createRecord.save;
        res.json({
            data:save,
            message:"records saved successfully"
        })
    }catch(error){
        res.json({"message": error.message});
    }
})

app.get('/farmRecords', async (req,res)=>{
    try{
        const getData=await model.find()
        res.json({
            data:getData,
            message:"records found successfully"
        })
    }catch(error) {
        res.json({"message": error.message});
    }
})
//delete records
app.delete('/farmRecords/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        await model.findByIdAndDelete(id);
        res.json({message:"records deleted successfully"});
    }catch(error) {
        res.json({"message": error.message});
    }
})

//update routes
app.patch('/farmRecords/:id', async (req,res)=>{
    try {
        const {id}=req.params;
        const updatedData=await model.findByIdAndUpdate(id,{...req.body});
        res.json({
            data: updatedData,
            message:"records updated successfully"
        });
    } catch (error) {
        res.json({"message": error.message});
    }
})

//get a single record
app.get('/farmRecords/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const singleRecord=await model.findById(id);
        res.json({
            data:singleRecord,
            message:"record found"
        })
    } catch (error) {
        res.json({"message": error.message})
    }
})
//database connection
mongoose.connect(process.env.DB_URL)
    .then(() =>{
        console.log("Connected to Mongoserver");
    }).catch(err => console.log("Error connecting to Mongoserver: " + err));

// app.listen(port, function(){
//     console.log('listening on port '+port);
// })
app.listen(port, ()=>{
    console.log(`server listening on port ${port}`);
})
