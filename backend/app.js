const express = require("express")
const User = require("./models/User")
const dotenv = require("dotenv")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cors = require("cors")
const  mongoose  = require("mongoose")
dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())


app.post('/user/signup',async (req,res)=>{
    const {name,email,pass : password} = req.body;
    console.log(name,email,password)
    try{
        let axistUser = await User.findOne({email})
        
        if(axistUser){
            return res.status(400).send("Email already registered")
        }
        
        const hasspass = await bcrypt.hash(password,10)
        const newUser = new User({
            name,email,password : hasspass
        })
        await newUser.save()
        res.status(201).send("User Crearted Successfully")
    }
    catch(error){
        res.status(500).send("Server Error")
    }
})

app.post('/user/signin',async (req,res)=>{
    const {email , pass : password} = req.body;

    try{
        let axistUser = await User.findOne({email})
        if(!axistUser){
            return res.status(400).send("Email is not registered")
        }
    
        const correctPass = await bcrypt.compare(password,axistUser.password)
        if(!correctPass){
            return res.status(400).send("Password Incorrect")
        }
        const token = jwt.sign(
            {id : axistUser._id, email : axistUser.email},
            process.env.JWT_SECRET,
            { expiresIn: "1h" }     
        )
        res.status(201).send({
            mss : "Sign in Successfully",
            token
        })
    }
    catch(error){
        res.status(500).send("Server Error")
    }
})

mongoose.connect(process.env.DBURL).then(()=>{
    console.log("Connect to database")
    app.listen(process.env.PORT,()=>{
    console.log("server Start on PORT ",process.env.PORT)
})
})