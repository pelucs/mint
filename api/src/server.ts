import "dotenv";

import cors from "cors";
import express from "express";

import { router } from "./routes";

const app = express();
const PORT = Number(process.env.PORT) || 3333;

app.use(express.json());
app.use(cors());
app.use(router);

app.listen({
  host: '0.0.0.0',
  port: PORT
}, () => console.log(`HTTP Server Running in port ${PORT}`));