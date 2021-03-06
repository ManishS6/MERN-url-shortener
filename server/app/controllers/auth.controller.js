require('dotenv').config()
const db = require('../models')
const User = db.user
const Url = db.url
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

exports.signup = (req,res) => {
    
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,8)
    })
    user.save((err,user)=>{
        if(err) {
            res.status(500).send({message:err})
            return
        }
        var accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: 86400 // 24 hours
        })
        // res.cookie("auth-token", accessToken, {
        //     httpOnly: true,
        //     sameSite: "none",
        //     secure: true,
        //     maxAge: 15 * 24 * 3600000
        // });
        return res.status(200).send({
            username: user.username,
            accessToken: accessToken
        })
    })
}

exports.signin = (req,res) => {
    if(ValidateEmail(req.body.input1)){
        // The given string is email
        console.log("#DEL_LATER Email was provided")
        User.findOne({
            email: req.body.input1
        }).exec((err,user)=>{
            if(err) {
                res.status(500).send({
                    message: err
                })
                return
            }
            if(!user) {
                res.status(404).send({
                    message: 'User not found'
                })
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            )
            if (!passwordIsValid) {
                return res.status(401).send({
                  accessToken: null,
                  message: "Invalid Password!"
                });
            }
            var accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: 86400 // 24 hours
            })
            res.status(200).send({
                username: user.username,
                accessToken: accessToken
            })
        })
    } else {
        // The given string is password
        console.log("#DEL_LATER Username was provided")
        User.findOne({
            username: req.body.input1
        }).exec((err,user)=>{
            if(err) {
                res.status(500).send({
                    message: err
                })
                return
            }
            if(!user) {
                res.status(404).send({
                    message: 'User not found'
                })
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            )
            if (!passwordIsValid) {
                return res.status(401).send({
                  accessToken: null,
                  message: "Invalid Password!"
                });
            }
            var accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: 86400 // 24 hours
            })
            res.status(200).send({
                username: user.username,
                accessToken: accessToken
            })
        })
    }
}

function ValidateEmail(inputText)
{
    var format = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(inputText.match(format)){
        return true;
    }
    else {
        return false;
    }
}

exports.tokenInValid = async (req, res) => {
    try {
      const token = req.header("x-auth-token");
      if (!token) return res.json(false);
  
      const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if (!verified) return res.json(false);
  
      const user = await User.findById(verified.id);
      if (!user) return res.json(false);
  
      return res.json(true);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}

exports.getUsername = (req,res) => {
    console.log('The user received by getUsername function is',req.user)
    User
    .findById(req.user)
    .exec((err,user)=>{
        if(err) return res.status(404).send('no user found')
        return res.json({
            username: user.username,
            id: user._id
        })
    })
}