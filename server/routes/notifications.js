const express = require('express');
const router = express.Router();
const { query } = require('../db');
const auth = require('../middleware/auth');

// Get all notifications for the hospital
router.get('/', auth, async (req, res) => {
  const hospitalId = req.hospital.id;
  try {
    const result = await query(
      'SELECT r.* FROM notifications r WHERE r.hospital_id = $1 ORDER BY r.timestamp DESC',
      [hospitalId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notifications.' });
  }
});

// Mark notification as read
router.put('/:id/read', auth, async (req, res) => {
  const notificationId = req.params.id;
  const hospitalId = req.hospital.id;

  try {
    const result = await query(
      'UPDATE notifications SET read_status = TRUE WHERE id = $1 AND hospital_id = $2 RETURNING *',
      [notificationId, hospitalId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Notification not found.' });
    }

    res.json({ message: 'Notification marked as read.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update notification.' });
  }
});

module.exports = router;
