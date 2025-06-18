const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const listingRoutes = require("./routes/listings");
require("dotenv").config();
const userRoute = require("./routes/users");
const authRoutes = require("./routes/auth");




const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoute);
app.use("listings", listingRoutes);
app.use("/api/auth", authRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
const listingRoute = require("./routes/listings");
const bookingRoute = require("./routes/bookings");

app.use("/api/listings", listingRoute);
app.use("/api/bookings", bookingRoute);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

