const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(express);

mongoose.connect(process.env.MONGODB_URI).then(() => {
  server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
}).catch((err)=>{
    console.log(`Connection to DB failed, server not started.`)
    console.log(err.stack);
})
