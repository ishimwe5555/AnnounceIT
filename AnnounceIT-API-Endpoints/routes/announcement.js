import { Router } from 'express';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import dataModels from '../models';


require('dotenv').config();
// eslint-disable-next-line camelcase


const app = Router();
const myAnnounces = dataModels.announcements;

function verifyToken(req, res, next) {
    // eslint-disable-next-line dot-notation
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader == 'undefined'){   
      return res.status(401).json({
            Status : "Forbidden",
            Error:'Access unauthorized'
              });
    }
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
    
     jwt.verify(req.token, process.env.JWT_KEY, (error, output) => {
        if (error) {
          return res.status(401).json('Token is invalid');
            } 
       req.user = output;
    });
        return next();    
}
app.get('/', verifyToken, (req, res)=>{
    res.send(myAnnounces); 
});

app.get('/:id', verifyToken, (req, res)=>{
    // eslint-disable-next-line radix
    const announcement = myAnnounces.find(c => c.id === parseInt(req.params.id));
    if (!announcement){ 
         res.status(404).json({
        Status : "Forbidden",
        Error:'The announcement with given ID was not found'         
      });
    }
   
    res.status(200).json({
        Status : "Announcement fetched successfully",
        Data : {
        Id : announcement.id,
        Owner : announcement.owner,
        Text: announcement.text,
        Startdate: announcement.start_date,
        Enddate:announcement.end_date
      
    }
 });
  });


  app.post('/', verifyToken, (req, res)=>{
    const schema = {
        id:Joi.number(),
        owner:Joi.number().default(4),
        status:Joi.string().default("pending"),
        text:Joi.string().required(),
        start_date:Joi.date().required(),
        end_date:Joi.date().required()
    };
    const result = Joi.validate(req.body, schema);
 

    if(result.error){
        res.status(400).json(result.error.details[0].message);
        return;
    }
   const decoded = jwtDecode(req.token);
   

    myAnnounces.push({
        id : myAnnounces.length + 1,
        owner:decoded.id,
        text:req.body.text,
        start_date:req.body.start_date,
        end_date:req.body.end_date
    });
   
    res.status(201).json({
        Status : "Announcement created successfully",
        Data : {         
        Id : myAnnounces.length + 1,
        Owner : decoded.id,
        Text: result.value.lastName,
        Startdate: result.value.start_date,
        Enddate:result.value.end_date
       },
    });
});

app.patch('/:id', (req, res) => {
    // eslint-disable-next-line radix
    const announcement = myAnnounces.find(c => c.id === parseInt(req.params.id));
    if (!announcement) {
    res.status(403).json({
        Status : "Forbidden",
        Error:'The announcement with the following ID does not exist'
          });
       }
     
    const schema = {
        Id:Joi.number(),
        //owner :Joi.number().required(),
        text :Joi.string().required(),
        start_date:Joi.date(),
        end_date:Joi.date()
    };

    const result = Joi.validate(req.body, schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    
    res.status(200).json({
        Status : "User updated successfully",
        Data : {
        Id : result.value.Id,
        Owner : req.user.output,
        Text: result.value.text,
        Startdate:result.value.start_date,
        Enddate:result.value.end_date
    }
    });
   

});

app.patch('/:id/sold', (req, res) => {
    // eslint-disable-next-line radix
    const announcement = myAnnounces.find(c => c.id === parseInt(req.params.id));
    if (!announcement) {
    res.status(403).json({
        Status : "Forbidden",
        Error:'The announcement with the following ID does not exist'
          });
       }
       const newStatus = req.query.status;

       const schema = {
        Id:Joi.number(),
        owner :Joi.number().default(3),
        status :Joi.string().default(false),
        start_date:Joi.date(),
        end_date:Joi.date()
    };
    const result = Joi.validate(req.body, schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        // eslint-disable-next-line no-useless-return
        return;
    }
    res.status(200).json({
        Status : "Status updated successfully",
        Data : {
            Id : result.value.id,
        Owner : result.value.owner,
        Status: newStatus,
        Startdate:result.value.start_date,
        Enddate:result.value.end_date
    }
    });
});

app.delete('/:id', verifyToken, (req, res) => {
    // eslint-disable-next-line radix
    const announcement = myAnnounces.find(c => c.id === parseInt(req.params.id));
    if (!announcement) {
    res.status(404).json({
        Status : "Not found",
        Error:'The announcement with the following ID does not exist'
          });
       }
       const index = myAnnounces.indexOf(announcement);
       myAnnounces.splice(index, 1);
       res.status(200).json({
           Status: "Success",
            Data : {
                Id : announcement.id,
                owner : announcement.owner,
                start_date : announcement.start_date,
                end_date : announcement.end_date
            }
       });
});

export default app;