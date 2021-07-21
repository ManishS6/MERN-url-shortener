require('dotenv').config()
const db = require('../models')
const User = db.user
const Url = db.url
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const shortId = require('shortid');

exports.allUrls = (req,res) => {
    User.findOne({
        _id:req.userId
    }).exec((err,user)=>{
        if(err){
            res.status(500).send({message:err})
            return
        }
        Url.find({
            _id: {$in: user.urls}
        },(err,urls)=>{
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            return res.status(200).send(urls)
        })
    })

}

exports.newUrl = (req,res) => {
    const fresh = new Url({
        complete_url: req.body.url,
        short_url: shortId.generate()
    })
    fresh.save(err => {
        if(err) {
            res.status(500).send({message:err})
            return
        }
    })
    User.findOne({
        _id:req.userId
    }).exec((err,user)=>{
        if (err) {
            res.status(500).send({ message: err });
            return;
          }
        user.urls.push(fresh._id)
        user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.status(200).send({ message: "short url has been added to the user!" });
          });
    })
}

exports.getUrl = (req,res) => {
    
}