const express = require('express');
const connectDB = require('../config/db');
const userRoutes = require("../routes/user.routes.js");
const skillRoutes = require("../routes/skill.routes.js");
const aboutRoutes = require("../routes/about.routes.js");
const productRoutes = require("../routes/product.routes.js");
const messageRoutes = require("../routes/message.routes.js");
const analyticsRoutes = require("../routes/analytics.routes.js");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../swagger");
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS origins - supports both development and production
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175"
];

// Add production frontend URL if specified in environment variables
if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

// Health Check Route (No DB dependency)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Swagger Documentation
try {
    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec, { explorer: true })
    );

    app.get("/api-docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
} catch (err) {
    console.error("Swagger setup failed:", err);
}

// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/skill', skillRoutes);
app.use('/api/v1/about', aboutRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/message', messageRoutes);
app.use('/api/v1/analytics', analyticsRoutes);

// Connect to Database
connectDB();

// Root Route
app.get('/', (req, res) => {
    res.send('Backend working on Vercel!');
});

module.exports = app;
