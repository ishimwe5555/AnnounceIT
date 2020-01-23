const express = require('express');
const router = express.Router();
const mongoose=require('mongoose');
const bcrypt= require('bcryptjs');

const User = require("../models/user");

router.post("/signup",(req, res, next) => {
bcrypt.hash(req.body.password,10,(err,hash) => {
       if (err){
            return res.status(500).json({
                error: err
            });
        } else{
            const user=new User({
                id:req.body.id,
                email:req.body.email,
                first_name:req.body.first_name,
                last_name:req.body.last_name,
                phoneNumber:req.body.phoneNumber,
                address:req.body.address,
                is_admin:req.body.is_admin,
                password: hash
        });
        user
        .save()
        .then(result => {
            console.log(result);
        res.status(201).json({
            message:"User Created"
        });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
    }
});
});

module.exports = router; 