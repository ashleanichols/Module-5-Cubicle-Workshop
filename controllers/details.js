const Accessory = require("../models/Accessory");
const Cube = require("../models/Cube");

module.exports = (req,res)=>{
    //console.log(cubeData)//
    
    //console.log(req.params.id);
    Cube.findById(req.params.id).populate("accessories").then(cube => {
        //console.log(cube);
        
        res.render("details", {
            title: "Cubicle",
            cube:cube,
            accessory:cube.accessories
   
        });
       
        
    });   

 };