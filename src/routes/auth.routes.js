// all authenticated related routed

// route1 : register , route2 : login

const express = require("express")

const authController = require("../controllers/auth.controller")

const router = express.Router()

// api end points
//endpint 1. /register
// fullaname
/* POST /api/auth/register */
router.post("/register", authController.userRegisterController)

/* POST /api/auth/login */
router.post("/login",authController.userLoginController)

module.exports = router
