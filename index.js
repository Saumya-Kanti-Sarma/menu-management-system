import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from "cors"

dotenv.config() // configuring the environment variables
const app = express() // settin app
const PORT = process.env.PORT || 5000 // declearing port
const CORS = cors()
app.use(CORS)

// set-up of mongodb connection
const MONGO_URL = process.env.MONGO_URL
mongoose.connect(MONGO_URL)
  .then(() => console.log(`DataBase Connected..`))
  .catch((err) => console.log(`Error in connection of dataBase: ${err}`))


//app set-up
app.listen(PORT, () => { console.log(`server running at http://localhost:${PORT}`) })
app.get("/", (req, res) => { res.send("hello world") })
