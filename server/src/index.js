const express = require("express")
require("dotenv").config()
const cookieParser = require('cookie-parser')
const cors = require("cors")
const app = express()
const db = require("./database/createDB")
const { User } = require("./models/user-model")
const { Token } = require("./models/token-model")
const router = require("./routes/index")
const errorMiddleware = require("./middlewares/error-middleware")
const start = () => {
  try {
    User.sync({ force: true })
    Token.sync({ force: true })


    app.use(express.json())
    app.use(cookieParser())
    app.use(cors())
    app.use("/api", router)
    app.use(errorMiddleware)

    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => {
      console.log('server started on PORT: ' + PORT)
    })
  } catch (error) {
    console.log(error)
  }
}


start()
