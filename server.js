const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const listingRoutes = require("./routes/listings");
const bookingRoutes = require("./routes/bookings");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: [
    "https://stay-finder-frontend-3.onrender.com",
    "http://localhost:5173"
  ]
}));

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/bookings", bookingRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
