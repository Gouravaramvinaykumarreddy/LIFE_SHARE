# ❤️ LifeShare - Global Hospital Resource Network

LifeShare is a secure, real-time medical grid designed for hospitals to instantly share, request, and track critical medical resources such as human organs, specialized medical equipment, and blood units. Rapid communication during life-threatening scenarios is necessary, and LifeShare replaces traditional phone calls and fragmented registries with an immediate and completely transparent system.

## ✨ Key Features

- **🌐 Real-Time Global Inventory Dashboard:** View live listings of available organs, blood inventory, and critical medical equipment across the network.
- **⚡ Instant Waitlist Matches:** If the organ a patient needs isn't available, hospitals can join an automated waitlist. When that organ is registered by any hospital, the requesting hospital is notified immediately.
- **🤝 Network Synergy Rating:** Hospitals earn a positive "Synergy Rating" (Points) for successfully matching and sharing life-saving resources, encouraging collaboration.
- **🔐 Secure Access:** Restricted only to verified hospital administrators utilizing robust JWT-based authentication.
- **🔔 Live Alerts:** Instant WebSocket notifications for matches, acceptances, and newly available waitlisted items.
- **📊 Immutable Activity Log:** A transparent ledger of every transaction made between hospitals for ethical auditing.

## 🛠️ Technology Stack

**Frontend**
- React 19 (Vite)
- Tailwind CSS & Lucide Icons (Styling, UI)
- Framer Motion (Animations)
- Socket.io-client (Real-time events)

**Backend**
- Node.js & Express.js
- SQLite (Local development) / PostgreSQL (Production ready)
- Socket.io (WebSocket implementation)
- JSON Web Tokens (JWT) for secure authentication
- Bcrypt.js for hash-based password protection

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone & Install
Navigate into your cloned repository and install the dependencies for both the client and the server.

```bash
# Install Server Dependencies
cd server
npm install

# Install Client Dependencies
cd ../client
npm install
```

### 2. Set Up the Environment
You will need `.env` files in both your `server` and `client` directories.
- In `server/.env`, ensure you have your `JWT_SECRET` and `PORT` defined (see `server/.env.example`).

### 3. Initialize & Seed the Database
To populate the SQLite database with test hospitals and items, run the seeding script:

```bash
cd server
npm run seed
```

*Note: The seeded hospitals follow test login credentials, e.g., `city@central.com` / password: `password123`.*

### 4. Run the Application
You can run the frontend and backend servers simultaneously. Open two terminal windows:

**Terminal 1 (Backend Server):**
```bash
cd server
npm run dev
# The server will start on port 5000
```

**Terminal 2 (Frontend Client):**
```bash
cd client
npm run dev
# The frontend application will start on localhost:5173
```

Navigate to `http://localhost:5173` in your browser and log in with your seeded hospital account to begin!

---

## 🤝 Contributing
For hackathon purposes or open-source collaboration, please fork the repository and create a pull request with your suggested improvements. All contributions towards optimizing emergency response paths are welcome!

## 📜 License
This project is licensed under the MIT License.
