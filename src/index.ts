import express from "express";
import http from "http";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import router from "./router";
require("dotenv").config();

const PORT = 8080;
const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});

const MONGO_URL = `mongodb+srv://jimmymendy:${process.env.MONGODB_PASSWORD}@restapi.1men0b1.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(MONGO_URL).catch((error) => console.log(error));

app.use("/", router());
