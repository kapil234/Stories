const User=require("../models/userModel")
 const bcrypt = require("bcryptjs");
async function signUp(req,res){
try{
    const{name,email,password}=req.body;
    const user=await User.findOne({email});
    if(user){
        throw new Error("User already exists")
    }
    if(!name){
        throw new Error("please provide name")
    }
     if (!email) throw new Error("Please provide email");
    if (!password) throw new Error("Please provide password");
    const salt=bcrypt.genSaltSync(10);
    const hashPassword=bcrypt.hashSync(password,salt);
    if (!hashPassword) {
      throw new Error("Something went wrong");
    }
    const payload={
        name,
        email,
        role:"General",
        password:hashPassword
    }
    const userData=new User(payload);
    const saveUser=await userData.save();
    res.status(201).json({
        message:"user signup successfully",
        data:saveUser,
        success:true,
        error:false
    })

}catch(err){
res.status(400).json({
      message: err.message || err,
      error: true,
      success: false
    });
}
}
module.exports=signUp;
