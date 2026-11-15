// app.js work mainly 2 works
// 1 server le instance ko create karna our
// 2. server ko configure karna matlb
// matlb ye kitne type ki api hai our kon kon se middle were sue karne wale hai

const express = require("express")
const cookieParser = require("cookie-parser")

const authRouter = require("./routes/auth.routes") // from src/routes

const app = express() // 1.st serevr ko create karna yaha pe

// ab server ko config karna 2.nd kon kon se middlewere app user kar rahe ho our doosra , kon kon sa api aap use akr rhe ho math routes use kar rhe ho

app.use(express.json()) // i used this due to in ./src/controller
// express ka server request.body ke data ko nahi padh sakta is liye express.json

app.use(cookieParser())

app.use("/api/auth", authRouter) //redirect to autrouter and auth router wla folder working

module.exports = app
// app.js ecport ho gya ab kahi import hoga server.js me import hua
// server.js me import hua
