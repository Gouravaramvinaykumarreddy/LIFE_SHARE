-- LifeShare Database Schema
-- Focus: Secure, unique hospital registration and resource tracking

CREATE TABLE IF NOT EXISTS hospitals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    registration_id VARCHAR(50) UNIQUE NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    contact_number VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    organisation_size VARCHAR(50),
    owner_name VARCHAR(255) NOT NULL,
    license_number VARCHAR(100) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE resource_status AS ENUM ('available', 'reserved', 'used', 'expired');

CREATE TABLE IF NOT EXISTS organs (
    id SERIAL PRIMARY KEY,
    hospital_id INTEGER REFERENCES hospitals(id) ON DELETE CASCADE,
    type VARCHAR(100) NOT NULL, -- e.g., 'Heart', 'Kidney', 'Liver'
    blood_group VARCHAR(5) NOT NULL,
    status resource_status DEFAULT 'available',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS equipment (
    id SERIAL PRIMARY KEY,
    hospital_id INTEGER REFERENCES hospitals(id) ON DELETE CASCADE,
    type VARCHAR(100) NOT NULL, -- e.g., 'Ventilator', 'ECMO'
    model VARCHAR(255),
    status resource_status DEFAULT 'available',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS units_blood (
    id SERIAL PRIMARY KEY,
    hospital_id INTEGER REFERENCES hospitals(id) ON DELETE CASCADE,
    blood_group VARCHAR(5) NOT NULL,
    units INTEGER NOT NULL DEFAULT 0,
    status resource_status DEFAULT 'available',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Note: The routes use the name 'blood' in some places, so we'll check and use that name if needed.
-- Let's stick with the 'blood' name for consistency with initialize_sqlite.js.
CREATE TABLE IF NOT EXISTS blood (
    id SERIAL PRIMARY KEY,
    hospital_id INTEGER REFERENCES hospitals(id) ON DELETE CASCADE,
    blood_group VARCHAR(5) NOT NULL,
    units INTEGER NOT NULL DEFAULT 0,
    status resource_status DEFAULT 'available',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE request_urgency AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE request_status AS ENUM ('pending', 'matched', 'completed', 'cancelled');

CREATE TABLE IF NOT EXISTS requests (
    id SERIAL PRIMARY KEY,
    hospital_id INTEGER REFERENCES hospitals(id) ON DELETE CASCADE,
    resource_type VARCHAR(20) NOT NULL, -- 'organ', 'equipment' or 'blood'
    target_resource_id INTEGER, -- id from related table
    urgency request_urgency DEFAULT 'medium',
    status request_status DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    request_id INTEGER REFERENCES requests(id),
    donor_hospital_id INTEGER REFERENCES hospitals(id),
    recipient_hospital_id INTEGER REFERENCES hospitals(id),
    resource_type VARCHAR(20) NOT NULL,
    resource_id INTEGER NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    hospital_id INTEGER REFERENCES hospitals(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    type VARCHAR(50), -- 'match', 'update', 'alert'
    read_status BOOLEAN DEFAULT FALSE,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id SERIAL PRIMARY KEY,
    action TEXT NOT NULL,
    hospital_id INTEGER REFERENCES hospitals(id),
    details JSONB,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
