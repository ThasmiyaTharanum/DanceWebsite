const express=require ("express");
const app = express();
const path= require("path");
const port=80;
const fs=require('fs');
//install body parser to store data to db through command npm install body-parser
const bodyparser = require("body-parser");
//install mongoose through command npm install mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/DanceContact');

//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    concern: String
  });
 
  //compiling schema into model
  const contact = mongoose.model('contact', contactSchema);

//express related stuff
app.use(express.static(path.join(__dirname, 'static')));
app.use('/static',express.static('static')) ;
app.use(express.urlencoded());



//pug related stuff
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

//end points
app.get('/',(req,res)=>{
    res.render('home.pug');
});
app.get('/contact',(req,res)=>{
    res.render('contact.pug');
});
// to get the contact page data
app.post('/contact',(req,res)=>{
    var myData= new contact(req.body);
    myData.save().then(() =>{
        res.send('The data has saved into database');
    }).catch(()=>{
        res.status(400).send("Item was not saved to database");
    })
});

//start server


app.listen(port,(req,res)=>{
   console.log(`The application started succesfully at port ${port}`);
});