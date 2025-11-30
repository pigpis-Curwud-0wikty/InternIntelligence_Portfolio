const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const userRoutes = require("./routes/user.routes.js");
const skillRoutes = require("./routes/skill.routes.js");
const aboutRoutes = require("./routes/about.routes.js");
const productRoutes = require("./routes/product.routes.js");
const messageRoutes = require("./routes/message.routes.js");
const analyticsRoutes = require("./routes/analytics.routes.js");
const swaggerSpec = require("./swagger");
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==== CORS ====
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175"
];

if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

// ==== SWAGGER CONFIG FOR VERCEL ====
const swaggerUiDist = require("swagger-ui-dist").getAbsoluteFSPath();

// Serve Swagger UI static files
app.use("/api-docs", express.static(swaggerUiDist));

// Serve main Swagger UI HTML
app.get("/api-docs", (req, res) => {
    res.sendFile(path.join(swaggerUiDist, "index.html"));
});

// Provide Swagger config
app.get("/api-docs/swagger-config.json", (req, res) => {
    res.json({
        urls: [
            {
                url: "/api-docs.json",
                name: "API Documentation"
            }
        ]
    });
});

// Serve your API specification JSON
app.get("/api-docs.json", (req, res) => {
    res.json(swaggerSpec);
});

// ==== ROUTES ====
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/skill', skillRoutes);
app.use('/api/v1/about', aboutRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/message', messageRoutes);
app.use('/api/v1/analytics', analyticsRoutes);

// ==== DATABASE ====
connectDB();

// ==== ROOT ====
app.get('/', (req, res) => {
    res.send('Hello World');
});

module.exports = app;
