const jwt = require('jsonwebtoken');

let loggedIn =  require('./config').loggedIn;

let homeRouter = require("../controllers/home.js");
let aboutRouter = require("../controllers/about.js");
let createRouter = require("../controllers/createCube.js").route;
let detailsRouter = require("../controllers/details.js");
let createData = require("../controllers/createCube.js").data;
let createAccRoute = require("../controllers/createAccessory.js").route;
let createAccData = require("../controllers/createAccessory.js").data;
let attachAccessRoute = require("../controllers/attachAccessorys.js").route;
let attachAccessData = require("../controllers/attachAccessorys.js").data;
let loginRoute = require("../controllers/login.js").route;
let loginData = require("../controllers/login.js").data;
let registerRoute = require("../controllers/register.js").route;
let registerData = require("../controllers/register.js").data;
let editRoute = require("../controllers/edit.js").route;
let editData = require("../controllers/edit.js").data;
let deleteRoute = require("../controllers/delete.js").route;
let deleteData = require("../controllers/delete.js").data;

const { check, validationResult } = require('express-validator');

module.exports = (app) => {
    //console.log(app);
    app.get("/",(req,res)=>{
        homeRouter(req,res);
    });
    app.get("/about",(req,res)=>{
        aboutRouter(req,res);
    });
    app.get("/createCube",(req,res)=>{
        createRouter(req,res);
    });
    
    app.post("/createCube",(req,res)=>{
        createData(req,res);
    });
    app.get("/createAccessory",(req,res)=>{
        createAccRoute(req,res);
    });
    app.post("/createAccessory",(req,res)=>{
        createAccData(req,res);
    });
    app.get("/details/:id",(req,res)=>{
        detailsRouter(req,res);
    });
    app.get("/attachAccessory/:cubeId",(req,res)=>{
        attachAccessRoute(req,res);
    });
    app.post("/attachAccessory/:cubeId",(req,res)=>{
        attachAccessData(req,res);
    });
    app.get("/login",(req,res)=>{
        loginRoute(req,res);
    });
    app.post("/login",(req,res)=>{
        loginData(req,res);
    });
    app.get("/register",(req,res)=>{
        registerRoute(req,res);
    });
    app.post("/register",[
        check("username")
            .trim()
            .isString()
            .isLength({min:1})
            .withMessage('password must be filled in'),
        check("password")
            .trim()
            .isString()
            .isLength({min:1})
            .withMessage('password must be filled in'),
        check("repeatPassword")
            .trim()
            .isString()
            .isLength({min:1})
            .withMessage('repeatPassword must be filled in')
        
    ],(req,res)=>{
        const errors = validationResult(req);
        let {password, repeatPassword} = req.body;
        
        
        if (!errors.isEmpty()) {
            res.status(422)
            console.log(errors.array())
            registerRoute(req,res,{
                message: 'Validation failed, entered data is incorrect',
                errors: errors.array()
                });
            
            console.log("error!");
        } else if(password!= repeatPassword){
            res.status(422).json({
                message: 'Validation failed, entered data is incorrect',
                errors: [{
                    value: [password,repeatPassword],
                    msg: "password and repeatPassword must be the same!",
                    params: ["password","repeatPassword"],
                    location: "body"
                }]
                });
                console.log("error!");
        } else { 
            registerData(req,res);
        }
    });
    app.get("/edit",(req,res)=>{
        editRoute(req,res);
    });
    app.post("/edit",(req,res)=>{
        editData(req,res);
    });
    app.get("/delete",(req,res)=>{
        deleteRoute(req,res);
    });
    app.post("/delete",(req,res)=>{
        deleteData(req,res);
    });
    app.get("/logout",(req,res)=>{
        
        loggedIn = false;

        res.redirect("/");
    });

    app.get("*",(req,res)=>{
        res.render('404', {
        
        });
    });
};

// function home(req,res){
//     console.log("hello");
//     res.status(200);
//     res.send('Welcome to Express.js!');
// }