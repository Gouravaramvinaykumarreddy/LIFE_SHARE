const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query, logAudit } = require('../db');

// Signup
router.post('/signup', async (req, res) => {
  const {
    name, registration_id, address, city, state, country,
    contact_number, email, organisation_size, owner_name,
    license_number, password
  } = req.body;

  try {
    // 1. Validation (Unique check)
    const existing = await query(
      'SELECT id FROM hospitals WHERE registration_id = $1 OR contact_number = $2 OR email = $3',
      [registration_id, contact_number, email]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Hospital already registered with the provided ID, number or email.' });
    }

    // 2. Hash Password
    const password_hash = await bcrypt.hash(password, 10);

    // 3. Insert Hospital
    const result = await query(
      `INSERT INTO hospitals (
        name, registration_id, address, city, state, country,
        contact_number, email, organisation_size, owner_name,
        license_number, password_hash
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id, name`,
      [name, registration_id, address, city, state, country, contact_number, email, organisation_size, owner_name, license_number, password_hash]
    );

    const hospitalId = result.rows[0].id;
    await logAudit('Signup', hospitalId, { hospitalName: name });

    res.status(201).json({ message: 'Hospital registered successfully', hospital: result.rows[0] });
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ error: 'Server error during registration.' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log(`Login attempt for email: ${email}`);
    const result = await query('SELECT * FROM hospitals WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      console.warn(`Login failed: No hospital found for email ${email}`);
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const hospital = result.rows[0];
    const isMatch = await bcrypt.compare(password, hospital.password_hash);

    if (!isMatch) {
      console.warn(`Login failed: Incorrect password for ${email}`);
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: hospital.id, name: hospital.name, role: 'hospital' },
      process.env.JWT_SECRET || 'lifeshare_secret_key',
      { expiresIn: '1d' }
    );

    await logAudit('Login', hospital.id);

    res.json({
      token,
      hospital: { id: hospital.id, name: hospital.name, email: hospital.email, city: hospital.city }
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ error: 'Server error during login.' });
  }
});

module.exports = router;
