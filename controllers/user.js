const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//Register controller
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const existingUser = await userModel.findOne({ email: email })
    if (existingUser) {
      return res.status(200).send({
        message: "User already exists",
        success: false,
      })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    req.body.password = hashedPassword

    const newUser = await userModel.create(req.body)
    await newUser.save()
    res.status(200).send({
      message: "User registered successfully",
      success: true,
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      message: "Error while registering user",
      success: false,
    })
  }
}

//Login controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body
    console.log("request parameters", req.body)
    const user = await userModel.findOne({ email: email })
    //const user = await userModel.findOne({ where: { email } })
    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      })
    }
    if (password == "" || user.password == "") {
      console.error("password is empty")
      return res.status(200).send({
        message: "password empty",
        success: false,
      })
    }
    const validPassword = bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(200).send({
        message: "Invalid password",
        success: false,
      })
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    })
    res.status(200).send({
      message: "Login success",
      success: true,
      token,
    })
  } catch (error) {
    console.log(error)
  }
}

const authController = async (req, res) => {
  try {
    if (!req?.body?.userId) {
      res.status(500).send({
        message: "User ID not found in request",
        success: false,
      })
    }
    const user = await userModel.findById({ _id: req.body.userId })
    user.password = undefined
    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      })
    } else {
      res.status(200).send({
        message: "User data",
        success: true,
        data: {
          name: user.name,
          email: user.email,
        },
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: "Error while fetching user data",
      success: false,
    })
  }
}

module.exports = { loginController, registerController, authController }
