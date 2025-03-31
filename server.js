const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db.js');

dotenv.config();

// MongoDB connection
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/test', require('./routes/testRroute.js'));
app.use('/api/v1/auth', require('./routes/authRoute.js'));
app.use('/api/v1/inventory', require('./routes/inventoryRoutes.js'));
app.use('/api/v1/analytics', require('./routes/analyticsRoutes.js'));
app.use('/api/v1/admin', require('./routes/adminRoutes.js'));

// Root Route to fix 404 error
app.get("/", (req, res) => {
    res.send("BloodLedger Backend is running!");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
    console.log(`Server running in ${process.env.DEV_MODE} on ${PORT}`.bgBlue.white)
);