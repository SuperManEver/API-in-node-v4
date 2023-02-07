import { Router } from "express";
import { body, oneOf } from "express-validator";

import { handleInputErrors } from "./middlewares";

const router = Router();
/**
 * Product
 */
router.get("/product", (req: any, res) => {
  res.json({ message: "list of products" });
});

router.get("/product/:id", (req, res) => {});

router.post(
  "/product",
  body("name").isLength({ min: 4, max: 255 }),
  handleInputErrors,
  (req, res) => {}
);

router.put(
  "/product/:id",
  body("name").isLength({ min: 4 }),
  handleInputErrors,
  (req, res) => {
    res.status(200);
    res.json({ products: [] });
  }
);

router.delete("/product/:id", (req, res) => {});

/**
 * Update
 */

router.get("/update", (req, res) => {});

router.get("/update/:id", (req, res) => {});

router.post(
  "/update",
  body("title").optional(),
  oneOf([
    body("IN_PROGRESS"),
    body("LIVE"),
    body("DEPRECATED"),
    body("ARCHIVED"),
  ]),
  body("version").optional(),
  body("body").isLength({ min: 4 }),
  handleInputErrors,
  (req, res) => {}
);

router.put(
  "/update/:id",
  body("title").optional(),
  oneOf([
    body("IN_PROGRESS"),
    body("LIVE"),
    body("DEPRECATED"),
    body("ARCHIVED"),
  ]),
  body("version").optional(),
  body("body").isLength({ min: 4 }),
  handleInputErrors,
  (req, res) => {}
);

router.delete("/update/:id", (req, res) => {});

/**
 * UpdatePoint
 */

router.get("/updatepoint", (req, res) => {});

router.get("/updatepoint/:id", (req, res) => {});

router.post("/updatepoint", (req, res) => {});

router.put("/updatepoint/:id", (req, res) => {});

router.delete("/updatepoint/:id", (req, res) => {});

export default router;
