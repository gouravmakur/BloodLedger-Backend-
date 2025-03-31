const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db.js');
const allowedOrigins = ["https://blood-ledger-eight.vercel.app"];

dotenv.config();

// MongoDB connection
connectDB();

const app = express();

// CORS Configuration
app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }));

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/test', require('./routes/testRroute.js'));
app.use('/api/v1/auth', require('./routes/authRoute.js'));
app.use('/api/v1/inventory', require('./routes/inventoryRoutes.js'));
app.use('/api/v1/analytics', require('./routes/analyticsRoutes.js'));
app.use('/api/v1/admin', require('./routes/adminRoutes.js'));

// Root Route (For Testing)
app.get("/", (req, res) => {
    res.send("BloodLedger Backend is running!");
});

// Server Port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
    console.log(`Server running in ${process.env.DEV_MODE} on port ${PORT}`.bgBlue.white)
);
