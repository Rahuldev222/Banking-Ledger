// API endpoint controllers

const { modelNames } = require("mongoose");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

/**
 * Route: POST /api/auth/register
 * Desc: req.body data se naya user create karna
 */
async function userRegisterController(req, res) {
  // Body data extract (Express me iske liye app.use(express.json) zaroori hai)
  const { email, password, name } = req.body;

  const isExists = await userModel.findOne({
    email: email,
  });

  if (isExists) {
    return res.status(422).json({
      message: "User already exist with same email.",
      status: "failed to create an ueser",
    });
  }

  const user = await userModel.create({
    email,
    password,
    name,
  });

  // User ko login state me rakhne ke liye JWT token create karna
  const token = jwt.sign(
    { userId: user._id },
     process.env.jwt_secrate,
    {expiresIn: "3d",
  });

  res.cookie("token", token);

  // 201 Status = New resource (user) successfully created
  res.status(201).json({
    message: "user registerd sucessfully fron status 201",
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
    },
    token: token, // Note: Key aur Value ka naam same ho toh sirf 'token,' bhi likh sakte hain (ES6)
  });
}
/**
 * - User Login controller
 * - Post /api/auth/login
 */
async function  userLoginController(req,res){
  const {email,password} = req.body

  const user = await userModel.findOne({email}).select("+password")

  if(!user){// if user not found
    return res.status(401).json({ // unaothorized // login karte waqt galat email password
      "message":"Email or Password INVALID"
    })
  }
  const isValidPassword = await user.comparePassword(password)
  
  if(!isValidPassword){
    return res.status(401).jason({
      "message": "Email or Password INVALID"
    })
  }

  const token = jwt.sign(
    {userId: user._id},
    process.env.jwt_secrate,
    {expiresIn: "3d"}
  );

  res.cookie("token",token);
  res.status(200).json({// login sucessfully thats why 200
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,      
    },
    token
  })


}

// Controller ko object banakar export karna (taaki routes me import ho sake)
module.exports = {
  userRegisterController,
  userLoginController,
};
