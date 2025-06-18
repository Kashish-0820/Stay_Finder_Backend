const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const listingRoutes = require("./routes/listings");
require("dotenv").config();
const userRoute = require("./routes/users");
const authRoutes = require("./routes/auth");
const bookingRoute = require("./routes/bookings");

const app = express();
app.use(cors({
  origin: "https://stay-finder-frontend-3.onrender.com"
}));
app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);   // ✅ yeh sahi hai
app.use("/api/bookings", bookingRoute);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Start server
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
