const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");

// Get all listings
router.get("/", async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get listing by ID
router.get("/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).send("Listing not found");
    }
    res.status(200).json(listing);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch listing by ID" });
  }
});

// Add new listing
router.post("/", async (req, res) => {
  try {
    const newListing = new Listing(req.body);
    await newListing.save();
    res.status(201).json(newListing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE listing by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedListing = await Listing.findByIdAndDelete(req.params.id);
    if (!deletedListing) {
      return res.status(404).send("Listing not found");
    }
    res.send("Listing deleted successfully");
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// UPDATE listing by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedListing) {
      return res.status(404).send("Listing not found");
    }
    res.json(updatedListing);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
