const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

//Database Connectivity 
const databaseConnectivity =()=>{
    mongoose.connect('mongodb://localhost:27017/CURD').then(()=>{
        console.log("Database is sucessfull connected ");
    }).catch((err)=>{
        console.log("This is the error while connected to Database : ",err);
    })
}

databaseConnectivity();

// Creating Schema for the model of the database 
const gettingModel =()=>{
    // let suppose name, email , phoneno, gender, course ;
    const CurdSchema = mongoose.Schema({    
        name:{
            String,
            required : true,
        },

        email:{
            String,
            unique,
            required : true,
            lowercase:true,
        },

        phone:{
            Number,
            unique,
            required:true,
            lowercase:true,
        },

        course:{
            String,
            unique,
            required:true,
            lowercase:true,
        }
    })

    const CurdModel = mongoose.model('Users', CurdSchema);
    return CurdModel;
}

const CurdModel = gettingModel();


// This is test Api and there Port Address info
app.get('/', (req, res)=>{
    res.json({message:"Apis is Working properly"});
})


// Without MVC archicture 
// CURD Operation from Database 


// ** First 1 . To Get Data from the Database ------------------------------------------------ 1 API Start-----
app.get('app/get/alldata', async(req, res)=>{
    try{
        const userData = await CurdModel.find({});
        res.status(201).json({User:userData});
    }catch(err){
        res.status(420).json({message:err});
    }
})

// ** First 2 . To Insert Data from the Database --------------------------------------------- 2 -----
app.post('app/get/insert', async(req, res)=>{
    try{
        const {name, email, phoneno, gender, course} = req.body();
        const userExist = await CurdModel.findOne({email:email});
        if(userExist){
            res.json({message:"User Already Exsit ", userExist: true});
        }
        const userData = new CurdModel({
            name:name,
            email:email,
            phoneno:phoneno,
            gender:gender,
            course:course,
        });

        await userData.save();
        res.status(201).json({message:"Data is Sucessfull Inserted into the database"});
    }catch(err){
        // console.error(err);
        res.status(420).json({Error:err, Message: err.message});
    }
})

// ** First 3 . To Update Data from the Database --------------------------------------------- 2 -----
app.put('/app/get/update', async(req, res)=>{
    try{
        const userExist = await CurdModel.findOne({email:email});
        if(!userExist){
            return res.json({message: "User Does't exist"});
        }
        const {email, changeData} = req.body; 
        const updateData = await CurdModel.updateOne(
            {email: email},
            {
                $set: {name:changeData}
            }
        );
        return res.json({Message:updateData});
    }catch(err){
        return console.error(err);
    }
})

// ** First 4 . To Update Data using Id from the Database --------------------------------------------- 2 -----
app.put('/app/get/update:_id', async(req, res)=>{
    try{
        const id = req.params;
        const pId = new mongoose.Types.ObjectId(id);
        const userExist = await CurdModel.findById(pId);
        if(!userExist){
            return res.json({message: "User Does't exist"});
        }
        const updateData = await CurdModel.updateOne(
            {_id: id},
            {
                $set: {name:name, email :email}
            }
        );
        res.json({Message:updateData});
    }catch(err){
        console.error(err);
    }
})

// ** First 5 . To Delete Data using Id from the Database --------------------------------------------- 2 -----
app.delete('/app/get/delete:_id', async(req, res)=>{
    try{
        const {id} = req.params;
        const {email, changeData} = req.body;
        const userExist = await CurdModel.deleteOne(id);
        if(!userExist){
            return res.json({message:"User Does't exist"})
        }
        const updateData = await CurdModel.DeleteOne({email:email});
        return res.json({Message:updateData});
    }catch(err){
        console.error(err);
    }
})

app.listen(6000, ()=>{
    console.log("The localhost is runon the port no : https://localhost/",6000);
})

// require(path.join(__dirname, "./routes/user.router"))(app);
