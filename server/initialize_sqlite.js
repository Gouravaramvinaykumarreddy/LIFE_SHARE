const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./lifeshare.db');

const schema = `
CREATE TABLE IF NOT EXISTS hospitals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    registration_id TEXT UNIQUE NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    country TEXT NOT NULL,
    contact_number TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    organisation_size TEXT,
    owner_name TEXT NOT NULL,
    license_number TEXT UNIQUE,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS organs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    hospital_id INTEGER REFERENCES hospitals(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    blood_group TEXT NOT NULL,
    status TEXT DEFAULT 'available',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS equipment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    hospital_id INTEGER REFERENCES hospitals(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    model TEXT,
    status TEXT DEFAULT 'available',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blood (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    hospital_id INTEGER REFERENCES hospitals(id) ON DELETE CASCADE,
    blood_group TEXT NOT NULL,
    units INTEGER NOT NULL,
    status TEXT DEFAULT 'available',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    hospital_id INTEGER REFERENCES hospitals(id) ON DELETE CASCADE,
    resource_type TEXT NOT NULL,
    target_resource_id INTEGER,
    urgency TEXT DEFAULT 'medium',
    status TEXT DEFAULT 'pending',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    request_id INTEGER REFERENCES requests(id),
    donor_hospital_id INTEGER REFERENCES hospitals(id),
    recipient_hospital_id INTEGER REFERENCES hospitals(id),
    resource_type TEXT NOT NULL,
    resource_id INTEGER NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    hospital_id INTEGER REFERENCES hospitals(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    type TEXT,
    read_status BOOLEAN DEFAULT FALSE,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    action TEXT NOT NULL,
    hospital_id INTEGER REFERENCES hospitals(id),
    details TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;

db.serialize(() => {
  db.exec(schema, (err) => {
    if (err) {
      console.error('SQLite Schema Error:', err.message);
    } else {
      console.log('SQLite Database Initialized at ./lifeshare.db');
    }
    db.close();
  });
});
