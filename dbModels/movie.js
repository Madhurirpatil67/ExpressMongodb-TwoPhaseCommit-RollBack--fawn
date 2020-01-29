let mongoose=require("mongoose");
let Joi=require("@hapi/joi");

let movieSchema= mongoose.Schema({
  Name:{type:String,required:true},
  Actor:{type:String,required:true},
  Price:{type:Number,required:true},
  Stock:{type:Number,required:true}
});

let movieModel=mongoose.model("MovieStocks",movieSchema);

function movieValidation(error){
  let schema=Joi.object({
    Name:Joi.string().required().min(3).max(200),
    Actor:Joi.string().required().min(2).max(200),
    Price:Joi.number().required(),
    Stock:Joi.number().required()
  });
  return schema.validate(error);
};

module.exports={movieSchema,movieModel,movieValidation};
