let express=require("express");
let router=express.Router();
let movie=require("../dbModels/movie");

router.post("/createMovie",async(req,res)=>{
  let {error}=movie.movieValidation(req.body);
  if(error){return res.send(error.details[0].message)}

  let movies=new movie.movieModel({
    Name:req.body.Name,
    Actor:req.body.Actor,
    Price:req.body.Price,
    Stock:req.body.Stock
   })    
   let data=await movies.save();
   res.send({message:"Data inserted Successfully",d:data});
});

module.exports=router;