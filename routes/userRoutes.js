const express = require("express")
const {
  loginController,
  registerController,
  authController,
} = require("../controllers/user")
const authMiddleware = require("../middleware/authMiddleware")

const router = express.Router()

//Login | POST
router.post("/login", loginController)

//Register | POST
router.post("/register", registerController)

//Register | POST
router.post("/getUserData", authMiddleware, authController)

module.exports = router
