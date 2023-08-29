import express from "express";
import cors from "cors";
import router from "./server/routes/route";
import pool from "./server/database/db";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.use("/", router);

pool.connect();

app.listen(3333, () => {
  console.log("Server started on port 3333");
});
