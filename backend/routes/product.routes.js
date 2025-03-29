const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");
const { auth, isAdmin } = require("../middleware/auth.middleware");

// Get all products with search and filters
router.get("/", async (req, res) => {
  try {
    const {
      search,
      category,
      brand,
      minPrice,
      maxPrice,
      sortBy,
      page = 1,
      limit = 10,
    } = req.query;

    let query = {};

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by brand
    if (brand) {
      query.brand = brand;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Sorting
    let sortOption = {};
    if (sortBy) {
      switch (sortBy) {
        case "price-asc":
          sortOption = { price: 1 };
          break;
        case "price-desc":
          sortOption = { price: -1 };
          break;
        case "rating-desc":
          sortOption = { averageRating: -1 };
          break;
        case "newest":
          sortOption = { createdAt: -1 };
          break;
        default:
          sortOption = { createdAt: -1 };
      }
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);
    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.json({
      products,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
});

// Get single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
});

// Create product (admin only)
router.post("/", auth, isAdmin, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
});

// Update product (admin only)
router.put("/:id", auth, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
});

// Delete product (admin only)
router.delete("/:id", auth, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
});

// Add product rating
router.post("/:id/ratings", auth, async (req, res) => {
  try {
    const { rating, review } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if user has already rated
    const existingRating = product.ratings.find(
      (r) => r.userId.toString() === req.user._id.toString()
    );

    if (existingRating) {
      existingRating.rating = rating;
      existingRating.review = review;
    } else {
      product.ratings.push({
        userId: req.user._id,
        rating,
        review,
      });
    }

    // Update average rating
    const totalRating = product.ratings.reduce((sum, r) => sum + r.rating, 0);
    product.averageRating = totalRating / product.ratings.length;

    await product.save();
    res.json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding rating", error: error.message });
  }
});

module.exports = router;
