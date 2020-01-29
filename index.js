let mongoose=require("mongoose");
let express=require("express");
let Joi=require("@hapi/joi");
let PORT=4900||process.env.PORT;
let app=express();
app.use(express.json());
let fawn=require("fawn");
fawn.init(mongoose);
let user=require("../Transaction/routes/user");
let movie=require("../Transaction/routes/movie");
let usermovie=require("../Transaction/routes/usermovie");

mongoose
        .connect("mongodb://localhost/STOREDATA",{useNewUrlParser:true,useUnifiedTopology:true})
        .then(()=>console.log(`Connected to db`))
        .catch(error=>console.log(`something went wrong ${error.message}`))

app.listen(PORT,()=>{console.log(`connected To Port : ${PORT} `)});

app.use("/api",user);
app.use("/api",movie);
app.use("/api",usermovie);