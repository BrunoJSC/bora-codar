import { Request, Response } from "express";
import pool from "../database/db";

export const getAllMarket = (req: Request, res: Response) => {
  try {
    pool.query("SELECT * FROM market", (err, result) => {
      if (err) throw err;
      res.json(result.rows);
    });
  } catch (error) {
    console.log(error);
  }
};

export const createMarket = (req: Request, res: Response) => {
  try {
    const { name, quantity, category, completed } = req.body;
    pool.query(
      "INSERT INTO market (name, quantity, category, completed) VALUES ($1, $2, $3, $4)",
      [name, quantity, category, completed],
      (err, result) => {
        if (err) throw err;
        res.json(result.rows);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const deleteMarket = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    pool.query("DELETE FROM market WHERE id = $1", [id], (err, result) => {
      if (err) throw err;
      res.json(result.rows);
    });
  } catch (error) {
    console.log(error);
  }
};
