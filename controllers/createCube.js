
const Cube = require("../models/Cube");
const Accessory = require("../models/Accessory");
const { check, validationResult } = require('express-validator');

module.exports ={
    route:(req,res)=>{
        res.render("createCube",{
            title:"Create Cube Page"
        });
        
     },
    data:(req,res)=>{
        let formData = req.body;
        //console.log(formData);
        check("name").notEmpty().isString().trim();
        check("description").notEmpty().isString().trim().isLength({max:200});
        check("imageUrl").notEmpty().custom(value =>{
            if (/^((https?|ftp):)?\/\/.*(jpeg|jpg|png|gif|bmp)$/.test(value)) {
                throw new Error('Please make sure you add in an image (ends in .png, .jpg, .jpeg, .gif).');
              }
              // Indicates the success of this synchronous custom validator
              return true;
        });                                             
        check("difficultyLevel").notEmpty().isInt({ min: 1, max: 6 });
        const errors = validationResult(req);
        console.log(errors);
        if(!errors.isEmpty()){
            console.log("fail");
            res.status(422);
        }else{
            new Cube(formData,/* add user id here from jwt */)
            .save().then((cube) => {
                console.log(cube._id);
                res.redirect("/");
            }).catch(err=>{
                if(err){
                    console.log(err._message);
                    return;
                }
            });
           
        }   
    
    }
};

function validURL(str) {
    var pattern = /​((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/i;
    console.log(pattern.test(str));
    return !!pattern.test(str);
}


 // if(formData.name ==undefined){
        //     console.log('No name!');
        //     return;
        // }
        // else if(formData.description == undefined || formData.description.length >=200){
        //     console.log('No description/ description Too long!');
        //     return;
        // }
        // else if(formData.imageUrl == undefined  || validURL(formData.imageUrl)){
        //     console.log('No Image/ invalid image url!');
        //     return;
        // }
        // else if(formData.difficultyLevel == undefined||formData.difficultyLevel < 1 ||formData.difficultyLevel >6){
        //     console.log('No Image/ invalid image url!');
        //     return;