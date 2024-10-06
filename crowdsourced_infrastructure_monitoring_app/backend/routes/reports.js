const express = require('express');
const router = express.Router();
const db = require('../db');

// Route to get all reports, optionally filtered by location
router.get('/reports', (req, res) => {
  const location = req.query.location;
  let query = 'SELECT id, title, description, location, status FROM reports';

  if (location) {
    query += ` WHERE location LIKE '%${location}%'`;
  }

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Route to submit a new report
router.post('/reports', (req, res) => {
  const { title, description, location, image } = req.body;
  const query = 'INSERT INTO reports (title, description, location, image) VALUES (?, ?, ?, ?)';

  db.query(query, [title, description, location, image], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json({ message: 'Report submitted', reportId: result.insertId });
    }
  });
});

// Route to post a comment on a report
router.post('/reports/:id/comments', (req, res) => {
  const reportId = req.params.id;
  const comment = req.body.comment;
  const query = 'INSERT INTO comments (report_id, comment) VALUES (?, ?)';

  db.query(query, [reportId, comment], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json({ message: 'Comment added', commentId: result.insertId });
    }
  });
});

// Route to approve or reject a report
router.patch('/reports/:id/status', (req, res) => {
  const reportId = req.params.id;
  const status = req.body.status;
  const query = 'UPDATE reports SET status = ? WHERE id = ?';

  db.query(query, [status, reportId], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json({ message: `Report ${status}` });
    }
  });
});

module.exports = router;
