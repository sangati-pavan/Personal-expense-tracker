const express = require('express');
const db = require('../config/database');
const { authenticateJWT } = require('./auth');
const router = express.Router();

// Add new transaction
router.post('/', authenticateJWT, (req, res) => {
  const { type, category, amount, date, description } = req.body;
  const userId = req.user.id;

  const query = `INSERT INTO transactions (type, category, amount, date, description, userId) VALUES (?, ?, ?, ?, ?, ?)`;
  db.run(query, [type, category, amount, date, description, userId], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Error adding transaction' });
    }
    res.status(201).json({ message: 'Transaction added', id: this.lastID });
  });
});

// Get all transactions
router.get('/', authenticateJWT, (req, res) => {
  const userId = req.user.id;
  db.all(`SELECT * FROM transactions WHERE userId = ?`, [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Error retrieving transactions' });
    }
    res.json(rows);
  });
});

// Get a transaction by ID
router.get('/:id', authenticateJWT, (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  db.get(`SELECT * FROM transactions WHERE id = ? AND userId = ?`, [id, userId], (err, row) => {
    if (err || !row) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json(row);
  });
});

// Update a transaction
router.put('/:id', authenticateJWT, (req, res) => {
  const { id } = req.params;
  const { type, category, amount, date, description } = req.body;
  const userId = req.user.id;

  const query = `UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ? AND userId = ?`;
  db.run(query, [type, category, amount, date, description, id, userId], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Error updating transaction' });
    }
    res.json({ message: 'Transaction updated' });
  });
});

// Delete a transaction
router.delete('/:id', authenticateJWT, (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const query = `DELETE FROM transactions WHERE id = ? AND userId = ?`;
  db.run(query, [id, userId], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Error deleting transaction' });
    }
    res.json({ message: 'Transaction deleted' });
  });
});


router.get('/summary', authenticateJWT, (req, res) => {
  const userId = req.user.id;

  db.get(
    `SELECT 
       (SELECT IFNULL(SUM(amount), 0) FROM transactions WHERE type = 'income' AND userId = ?) AS totalIncome,
       (SELECT IFNULL(SUM(amount), 0) FROM transactions WHERE type = 'expense' AND userId = ?) AS totalExpense`,
    [userId, userId],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Error retrieving summary' });
      }
      const balance = row.totalIncome - row.totalExpense;
      res.json({ totalIncome: row.totalIncome, totalExpense: row.totalExpense, balance });
    }
  );
});

module.exports = router;
