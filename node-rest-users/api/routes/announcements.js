const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) => {
    res.status(200).json({
        message : 'announcements were retrieved'
    });
});

router.post('/', (req, res, next) => {
    const announce ={
        announceId:req.body.announceId
    }
    res.status(201).json({
        message : 'Announcement was created',
        announce : announce
    });
});

router.get('/:announceId', (req,res, next)=> {
        res.status(200).json({
            message: "Announcement details",
         announceId: req.params.announceId 
        });
});

router.delete('/:announceId', (req,res, next)=> {
    res.status(200).json({
        message : 'Announcement deleted',
        announceId:req.params.announceId
    });
});

module.exports = router; 