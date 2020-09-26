const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports ={
    route:(req,res,errorData)=>{
        res.render("register",{ errorData:errorData });
     },
    data:(req,res)=>{
        console.log("worked!");
    }
};
