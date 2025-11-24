const express = require("express");
const Product = require("../models/product");
const checkAuth = require("../middleware/auth.middleware");
const upload = require("../config/upload");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

const parseTechStack = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed.filter(Boolean);
    }
  } catch (_) {
    // value was not JSON, fall through
  }
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
};

// Public: get all products (optional featured filter)
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (typeof req.query.featured !== "undefined") {
      filter.featured = req.query.featured === "true";
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    return res
      .status(200)
      .json({ message: "Products fetched successfully", products });
  } catch (error) {
    console.error("Product GET all error", error);
    return res.status(500).json({ message: error.message });
  }
});

// Public: get single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ product });
  } catch (error) {
    console.error("Product GET by id error", error);
    return res.status(500).json({ message: error.message });
  }
});

// Protected: create product
router.post("/", checkAuth, upload.single("image"), async (req, res) => {
  try {
    const { title, description, tech, github, demo, featured } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const payload = {
      title,
      description,
      github,
      demo,
      featured: typeof featured === "string" ? featured === "true" : !!featured,
      tech: parseTechStack(tech),
    };

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
      });
      payload.image = uploadResult.secure_url;
    } else if (req.body.image) {
      payload.image = req.body.image;
    }

    if (!payload.image) {
      return res.status(400).json({ message: "Product image is required" });
    }

    const product = await Product.create(payload);
    return res
      .status(201)
      .json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Product POST error", error);
    return res.status(500).json({ message: error.message });
  }
});

// Protected: update product
router.put(
  "/:id",
  checkAuth,
  upload.single("image"),
  async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const updatableFields = ["title", "description", "github", "demo"];

      updatableFields.forEach((field) => {
        if (typeof req.body[field] !== "undefined") {
          product[field] = req.body[field];
        }
      });

      if (typeof req.body.featured !== "undefined") {
        product.featured =
          typeof req.body.featured === "string"
            ? req.body.featured === "true"
            : !!req.body.featured;
      }

      if (typeof req.body.tech !== "undefined") {
        product.tech = parseTechStack(req.body.tech);
      }

      if (req.file) {
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: "products",
        });
        product.image = uploadResult.secure_url;
      } else if (typeof req.body.image !== "undefined") {
        product.image = req.body.image;
      }

      const updatedProduct = await product.save();
      return res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      console.error("Product PUT error", error);
      return res.status(500).json({ message: error.message });
    }
  }
);

// Protected: delete product
router.delete("/:id", checkAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();
    return res
      .status(200)
      .json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Product DELETE error", error);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
