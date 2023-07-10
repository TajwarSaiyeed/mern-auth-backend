const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes");
const { notFound, errorHandler } = require("./middleware/error.middleware");
const cors = require("cors");

// Load environment variables
dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(
  cors({
    origin: "https://mern-auth-tajwar.vercel.app/",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDB();

// Routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

// Error handling
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

/**
    POST /api/users** - Register a new user
    POST /api/users/auth** - Authenticate a user and get token
    POST /api/users/logout** - Logout user and clear cookie
    GET /api/users/profile** - Get user profile
    PUT /api/users/profile** - Update profile
 */
