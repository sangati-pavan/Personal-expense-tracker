const express = require('express');
const app = express();
const authRoutes = require('./routes/auth').router;
const transactionRoutes = require('./routes/transactions');

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/transactions', transactionRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
