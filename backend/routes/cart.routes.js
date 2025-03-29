const express = require("express");
const router = express.Router();
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const { auth } = require("../middleware/auth.middleware");

// Get user's cart
router.get("/", auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
      await cart.save();
    }

    res.json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching cart", error: error.message });
  }
});

// Add item to cart
router.post("/add", auth, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if product is in stock
    if (product.stock < quantity) {
      return res.status(400).json({ message: "Product is out of stock" });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [
          {
            product: productId,
            quantity,
            price: product.price,
          },
        ],
      });
    } else {
      // Check if product already exists in cart
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
      );

      if (existingItem) {
        // Update quantity if product exists
        existingItem.quantity += quantity;
      } else {
        // Add new item if product doesn't exist
        cart.items.push({
          product: productId,
          quantity,
          price: product.price,
        });
      }
    }

    await cart.save();
    await cart.populate("items.product");
    res.json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding item to cart", error: error.message });
  }
});

// Update cart item quantity
router.put("/update/:productId", auth, async (req, res) => {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if product is in stock
    if (product.stock < quantity) {
      return res.status(400).json({ message: "Product is out of stock" });
    }

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity = quantity;
    await cart.save();
    await cart.populate("items.product");
    res.json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating cart", error: error.message });
  }
});

// Remove item from cart
router.delete("/remove/:productId", auth, async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    await cart.populate("items.product");
    res.json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing item from cart", error: error.message });
  }
});

// Clear cart
router.delete("/clear", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    await cart.save();
    res.json({ message: "Cart cleared successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error clearing cart", error: error.message });
  }
});

module.exports = router;
