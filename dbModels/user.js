let mongoose=require("mongoose");
let Joi=require("@hapi/joi");

let userSchema=mongoose.Schema({
    FirstName:{type:String,required:true},
    LastName:{type:String,required:true},
    EmailId:{type:String,required:true}
});

function userValidation(error)
{ 
    let schema=Joi.object({
       FirstName:Joi.string().required().min(3).max(200),
       LastName:Joi.string().required().min(3).max(200),
       EmailId:Joi.string().required().email()
    });
    return schema.validate(error);
};

let userModel=mongoose.model("UserStocks",userSchema);

module.exports={userModel,userSchema,userValidation};