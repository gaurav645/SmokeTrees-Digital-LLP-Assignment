const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const SECRET_KEY="NOTESAPI";



const signup = async (req, res) => {
    const { name, email , password, cpassword, phone, streetAddress, city, state, country, postalCode } = req.body;
    // console.log("Request Body:", req.body);

    if(!name, !email,!password, !cpassword, !phone, !streetAddress, !city, !state, !country, !postalCode ){
        return res.status(402).json({error:"Please filled the field properly"})
    }

  
    try {
      const existingUser = await userModel.findOne({ email: email });
  
      if (existingUser) {
        return res.status(402).json({ message: "User Already Exists" });
      }
  
      if (password !== cpassword) {
        // console.log(password,cpassword);
      return res.status(402).json({ message: "Passwords do not match" });
    }
  
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const result = await userModel.create({
        email: email,
        password: hashedPassword,
        name: name,
        phone: phone,
        cpassword: hashedPassword,
        streetAddress:streetAddress,
        city:city,
        state:state,
        country:country,
        postalCode:postalCode,
      });
  
      const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
      res.status(201).json({ user: result, token });
      // console.log(token);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something Went Wrong" });
    }
  };
  


const signin = async (req,res)=>{
    const{email,password} = req.body;

    try {
        const existingUser = await userModel.findOne({email:email});
       
        if(!existingUser){
           
            return res.status(402).json({message:"User not found"});
        }
          
        const matchPassword = await bcrypt.compare(password,existingUser.password);
            if(!matchPassword){
                return res.status(402).json({message:"Invalid Password"})
            }
            // console.log(existingUser.password);
            const token = jwt.sign({email:existingUser.email,id:existingUser._id},SECRET_KEY);
            res.status(201).json({user:existingUser,token:token});

        

        }catch (error) {
        console.log(error);
        res.status(500).json({message:"Somethng went wrong"});
        
    }
}

module.exports={signup,signin};
