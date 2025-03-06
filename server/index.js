const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// Import the required routes
const userRoute = require("./routes/UserRoute");
const profileRoute = require("./routes/ProfileRoute");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 4000;

// Connect to the database
database.connect();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);



// Routes
app.use("/api/auth", userRoute);
app.use("/api/profile", profileRoute);


const server = app.listen(PORT, () => {
    console.log(`-----Server is running on PORT: ${PORT}------`);
  });
  
  server.on("error", (err) => {
    console.log("Server Error: ", err);
});  

