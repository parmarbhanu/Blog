const express = require("express")
const path = require("path")
const app = express();
require("dotenv").config();
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const multer = require("multer")
const UserModel = require('./models/UserModel');
const PostModel = require('./models/PostModel')
const { time, timeStamp, log } = require("console")
const fs = require('fs');
const cookieSession=require("cookie-session");
const authRoute=require('./Routes/auth');
const defaultPath = 'public/Images/';
const userRoute=require('./Routes/userRoute');
const postRoute=require('./Routes/postRoute');
app.use(express.json());
app.use(cookieParser()); 

const PORT = process.env.PORT ||3001||8080

app.use(cors({
  origin: ["http://127.0.0.1:5173", "http://localhost:5173","http://localhost:3001","https://codershub-pczs.onrender.com"],
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true
}))

app.use('/api/auth',authRoute);
app.use('/api/user',userRoute);
app.use('/api/post',postRoute);

app.get("/test",(req,res)=>{
    res.send("TESTING")
})

mongoose.connect("mongodb+srv://kalashj93:ge7YdzZAVMjKBYPV@cluster0.a9x7n71.mongodb.net/?retryWrites=true&w=majority")
// mongoose.connect("mongodb://127.0.0.1:27017/Blog")
.then(()=>{console.log('Mongodb connected')})
.catch((err)=>{console.log('ERR :',err)})


app.get("/test",(req,res)=>{
  res.send("This is testing route");
})

app.listen(PORT, () => {
  console.log(`Connected to PORT ${PORT}`);
})


app.use(express.static('client/dist'));
 app.get('*', (req, res) => {
    res.sendFile(path.resolve('client','dist','index.html'));
});