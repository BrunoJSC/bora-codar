import express from "express";
import {
  createMarket,
  deleteMarket,
  getAllMarket,
} from "../controllers/controller";

const router = express.Router();

router.get("/all", getAllMarket);
router.post("/create", createMarket);
router.delete("/delete/:id", deleteMarket);

export default router;
