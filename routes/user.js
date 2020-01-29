let express=require("express");
let router=express.Router();;
let user=require("../dbModels/user");

router.post("/createuser",async(req,res)=>{
    let {error}=user.userValidation(req.body);
    if(error){return res.send(error.details[0].message)}

    let users=user.userModel({
        FirstName:req.body.FirstName,
        LastName:req.body.LastName,
        EmailId:req.body.EmailId
    });
    let data=await users.save();
    res.send({message:"Data Inserted Successfully",d:data});
});

module.exports=router;