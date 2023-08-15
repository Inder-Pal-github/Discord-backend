const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth",authRoutes);

app.get("/",(req,res)=>{
    res.send("Hi")
})

const server = http.createServer(app);

mongoose.connect(process.env.MONGODB_URI).then(() => {
  server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
}).catch((err)=>{
    console.log(`Connection to DB failed, server not started.`)
    console.log(err.stack);
})
