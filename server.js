const express = require("express")
const colors = require("colors")
const morgan = require("morgan")
const dotenv = require("dotenv")
const connectDB = require("./config/db")

//dotenv cofig
dotenv.config({ path: "./env" })

//mongo db connection
connectDB()

//rest object
const app = express()

//moddlewares
app.use(express.json())
app.use(morgan("dev"))

//routes
app.use("/api/v1/user/", require("./routes/userRoutes"))

//routes
app.get("/", (req, res) => {
  res.status(200).send({
    message: "server running",
  })
})

//listen port
const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(
    `Port is : ${process.env.PORT}  Mode on port ${process.env.NODE_MODE}`
      .bgCyan.white
  )
})
