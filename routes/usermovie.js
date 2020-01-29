let express=require("express");
let router=express.Router();
let fawn=require("fawn");
let user=require("../dbModels/user");
let movie=require("../dbModels/movie");
let usermovie=require("../dbModels/usermovie");

router.post("/createUserMovie",async(req,res)=>{
    let {error}=usermovie.usermovieValidation(req.body);
    if(error){return res.send(error.details[0].message)}
    let userStock=await user.userModel.findById(req.body.userid);
    if(!userStock){return res.status(403).send("Invalid user Id")}

    let movieStock=await movie.movieModel.findById(req.body.movieid);
    if(!movieStock){return res.status(403).send("Invalid Movie Id")}
    if(movieStock.Stock===0){return res.status(404).send("Out of Stock")}
    console.log("id :",movieStock._id);
    let usermovies=new usermovie.usermovieModel({
        userId:{
            FirstName:userStock.FirstName,
            LastName:userStock.LastName,
            EmailId:userStock.EmailId
        },
        movieId:{
            Name:movieStock.Name,
            Actor:movieStock.Actor, 
            Price:movieStock.Price
        }
    })
    try{
       fawn
        .Task()
        .save("UserMovieStock",usermovies)
        .update("MovieStocks",{_id:movieStock._id},{
           Stock:-1
            
        })
        
        .run(); 
        res.send({message:"Data inserted",data:usermovies});
    }
    catch(ex){res.send(ex.message)}
    
    /* let data=await usermovies.save();
    movieStock.Stock--;
    await movieStock.save();
    res.send({message:"Data inserted",d:data}); */
});

module.exports=router;