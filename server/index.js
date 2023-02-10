// import "./connections/db.js"
import express from "express"
import dotenv from 'dotenv'
import log from "./log.js"
// import auth from './routes/auth.js';

const app = express()
const port = 5000

dotenv.config()

app.use(express.json())

// app.use("/api/users", usersRoutes)

app.get("/", (req, res) => {
  log.debug([], "[request call")
  res.send("Hello World")
})

app.listen(port, () => {
  log.debug([port], "[lesenting on port]")
  //   console.log(`Example app listening on port ${port}`)
})
