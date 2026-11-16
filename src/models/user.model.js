const mongoose = require("mongoose")
const bcrypt = require("bcryptjs") // for hashing

const userScema = new mongoose.Schema(
  {
    email:{
      type: String,required:[true,"email is required to create user."],
      unique: [true, "errmmsg: email already exists"],
      trim: [true],
      lowercae: true,
      match: [/^[^@\s]+@[^@\s]+\.[^@\s]+$/, "Invalid email"],
    },
    name: {
      type: String,
      required: [true, "name is fequire for creating account"],
    },
    password: {
      type: String,
      required: [true, "enter unique pass to create an account."],
      minlength: [6, "password should be contail more then 6 characters"],
      select: false, // ye jan ham import krenge to password import nahi hoga jab tak explicitely na bola jaae
    },
  },
  {
    timestamps: true,
  },
)
// Save se pehle password hash karo
// password hashed / benifits: if even database  hacked then password not seen hasing not converted into plain text
userScema.pre("save", async function () {
  if (!this.isModified("password")) {
    return ;
  }
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  return  
});

userScema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const userModel = mongoose.model("user", userScema)

module.exports = userModel
// export hua to kahi import huaa
// module in js ?
