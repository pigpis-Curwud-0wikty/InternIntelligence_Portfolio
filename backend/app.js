const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require("./routes/user.routes.js");
const skillRoutes = require("./routes/skill.routes.js");
const aboutRoutes = require("./routes/about.routes.js");
const productRoutes = require("./routes/product.routes.js");
const messageRoutes = require("./routes/message.routes.js");
const analyticsRoutes = require("./routes/analytics.routes.js");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175"
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

// Swagger Configuration for Vercel
app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(swaggerSpec));
app.get("/api-docs.json", (req, res) => res.json(swaggerSpec));

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/skill', skillRoutes);
app.use('/api/v1/about', aboutRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/message', messageRoutes);
app.use('/api/v1/analytics', analyticsRoutes);

connectDB();

app.get('/', (req, res) => {
    res.send('Hello World');
});

module.exports = app;
