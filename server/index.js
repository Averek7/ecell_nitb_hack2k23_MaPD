import express from "express"
import dotenv from 'dotenv'
import log from "./log.js"
import { verifyToken } from "./auth/controllers/auth.js"
import auth from './auth/routes/index.js';
import product from './product/routes/index.js'
import transactions from './transactions/routes/index.js'
import cors from "cors"

const app = express()
const port = 5000

dotenv.config()

app.use(express.json())

app.use(express.json())
app.use(cors())
app.use(cors({
  origin: '*'
}))

app.get("/", verifyToken, (req, res) => {
  log.debug([], "[request call")
  res.send("Hello World")
})

app.use("/auth", auth);
app.use("/product", product);
app.use("/transactions", transactions);

app.listen(port, () => {
  log.debug([port], "[lesenting on port]")
})
