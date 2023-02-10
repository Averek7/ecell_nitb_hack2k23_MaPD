import express from "express"
import dotenv from 'dotenv'
import log from "./log.js"
import { verifyToken } from "./auth/controllers/auth.js"
import auth from './auth/routes/index.js'

const app = express()
const port = 5000

dotenv.config()

app.use(express.json())

app.get("/", verifyToken, (req, res) => {
  log.debug([], "[request call")
  res.send("Hello World")
})

app.use("/auth", auth);

app.listen(port, () => {
  log.debug([port], "[lesenting on port]")
})
