let mongoose=require("mongoose");
let Joi=require("@hapi/joi");
let user=require("../dbModels/user");
let movie=require("../dbModels/movie");

let usermovieSchema=new mongoose.Schema({
    userId:{type:user.userSchema,required:true},
    movieId:{type:movie.movieSchema,required:true}
});

let usermovieModel=mongoose.model("UserMovieStock",usermovieSchema);

function usermovieValidation(error){
    let schema=Joi.object({
        userid:Joi.string().required(),
        movieid:Joi.string().required()
    });
    return schema.validate();
}

module.exports={usermovieModel,usermovieValidation}; 