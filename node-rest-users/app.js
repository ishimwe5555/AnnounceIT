
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./api/routes/user');

mongoose.connect('mongodb+srv://norbert:norbert@announceit-mongo-kucug.mongodb.net/test?retryWrites=true&w=majority',
  {
    useMongoClient: true
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//Routes to handle requests
app.use("/user",userRoutes);


app.use((req,res,next)=>{
  const error = new Error("Not found");
  error.status(404);
  next(error);
})
app.use((error, req, res, next) =>{
  res.status(error.status || 500);
  res.json({
    error:{
      message: error.message
    }
  });
});
app.listen(3000);