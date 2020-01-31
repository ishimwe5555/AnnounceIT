import { Router } from 'express';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import bcrypt from 'bcryptjs';
import dataModels from '../models/index';

require('dotenv').config();

const app = Router();
const myUsers = dataModels.users;
const hashPassword = password => bcrypt.hashSync(password, 10);

function verifyToken(req, res, next) {
    // eslint-disable-next-line dot-notation
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
    else {
        res.status(401).json({
            Status: "Unauthorized",
            Error: 'Access unauthorized'
        });
    }
}
app.post('/login', (req, res) => {
    const schema = {
        userName: Joi.string().min(6).required().replace(/\s/g, ""),
        password: Joi.string().required().min(8).max(25)
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const acc = myUsers.find(usr => usr.username === req.body.userName);
    if (!acc) {
        res.status(404).json({
            Status: "Not found",
            Error: 'The user ID does not exist,Please sign up'
        });
    } else {
        const checkPassword = bcrypt.compareSync(req.body.password, acc.password);
        if (!checkPassword) {
            res.status(401).json({
                Status: "Unauthorized",
                Error: 'The password you entered is incorrect'
            });
        }
        else {
            const token = jwt.sign(
                myUsers[0],
                process.env.JWT_KEY,
                {
                    expiresIn: "2d"
                }
            );
            res.status(201).json({
                Status: "User was logged in successfully",
                Data: {
                    token: token,
                    Id: acc.id,
                    UserName: result.value.userName,
                    Email: acc.email
                }

            });
        }
    }

});
app.post('/signup', (req, res) => {
    const schema = {
        firstName: Joi.string().trim().replace(/\s/g, "").required(),
        lastName: Joi.string().trim().replace(/\s/g, "").required(),
        userName: Joi.string().min(3).required(),
        email: Joi.string()
            .trim()
            .email()
            .required(),
        password: Joi.string()
            .min(8)
            .max(25)
            .required(),
        phoneNumber: Joi.string()
            .min(10)
            .max(12),
        isAdmin: Joi.boolean().default(false)
    };

    const result = Joi.validate(req.body, schema);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const foundEmail = myUsers.some(el => el.email === req.body.email);
    if (foundEmail) {
        res.status(409).json({
            Status: "Conflict",
            Error: 'The user with the following Email address already exists'
        });
        return;
    }
    const founduserName = myUsers.some(el => el.username === req.body.userName);
    if (founduserName) {
        res.status(409).json({
            Status: "Conflict",
            Error: 'The user with the following User ID  already exists'
        });
        return;
    }

    const newUser = {
        id: myUsers.length + 1,
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        username: req.body.userName,
        email: req.body.email,
        password: hashPassword(req.body.password),
        phonenumber: req.body.phoneNumber,
    };

    myUsers.push(newUser);

    const token = jwt.sign(
        // myUsers[0],
        {
            email: req.body.email
        },
        process.env.JWT_KEY,
        {
            expiresIn: "2d"
        }
    );

    res.status(201).json({
        Status: "User created successfully",
        Data: {
            token: token,
            Id: myUsers.length + 1,
            FirstName: result.value.firstName,
            LastName: result.value.lastName,
            UserName: result.value.userName,
            Email: result.value.email,
            IsAdmin: result.value.isAdmin
        },

    });
    console.log('User is created successfully');
});


app.get('/', verifyToken, (req, res) => {
    res.status(200).send(myUsers);
});

app.get('/:id', (req, res) => {
    // eslint-disable-next-line radix
    const user = myUsers.find(c => c.id === parseInt(req.params.id));

    if (!user) {
        res.status(404).json({
            Status: "Not Found",
            Error: 'The user with given ID was not found'
        });
    }
    res.status(200).json({
        Status: "User fetched successfully",
        Data: {
            Id: user.id,
            FirstName: user.firstname,
            LastName: user.lastname,
            Email: user.email,
            IsAdmin: user.isAdmin
        }
    });
});

app.put('/:id', verifyToken, (req, res) => {
    // eslint-disable-next-line radix
    const user = myUsers.find(c => c.id === parseInt(req.params.id));
    if (!user) {
        res.status(403).json({
            Status: "Forbidden",
            Error: 'The user with the following ID does not exist'
        });
    }

    const schema = {
        Id: Joi.default(Date.now()),
        firstName: Joi.string().trim().replace(/\s/g, ""),
        lastName: Joi.string().trim().replace(/\s/g, ""),
        userName: Joi.string().min(3).required(),
        email: Joi.string().required(),
        password: Joi.string().required().min(8).max(25),
        phoneNumber: Joi.string().min(10).max(12),
        isAdmin: Joi.boolean().default(false)
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    res.send(result.value);
});

export default app;