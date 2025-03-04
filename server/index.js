const express = require("express");
const app = express();
require("dotenv").config();

// Import the required routes
const userRoute = require("./routes/UserRoute");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 4000;

// Connect to the database
database.connect();

// Middleware
app.use(express.json());
app.use(cookieParser());


// Routes
app.use("/api/auth", userRoute);


const server = app.listen(PORT, () => {
    console.log(`-----Server is running on PORT: ${PORT}------`);
  });
  
  server.on("error", (err) => {
    console.log("Server Error: ", err);
});  

