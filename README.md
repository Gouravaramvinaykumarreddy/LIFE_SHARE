# ❤️ LifeShare — Connected Hospital Resource Network

LifeShare is a digital platform built exclusively for **verified hospitals** to share life-critical resources — organs, medical equipment, and blood units — in real time. Instead of every hospital working in isolation, LifeShare creates a connected network where availability, urgency, and compatibility are visible instantly, cutting down the time it takes to save a life.

---

## 📌 Project Summary

LifeShare allows hospitals to:

- **Request organs** based on urgency and compatibility
- **Share medical equipment** such as ventilators, ICU beds, or specialized devices
- **Track availability and location** of organs and equipment in real time
- **Receive instant notifications** the moment an organ or piece of equipment becomes available
- **Operate securely** — only verified, authorized hospital staff can access the system

---

## 🌍 Why This Project Matters

### 1. Saves Human Lives
A patient may urgently need an organ that's available at another hospital — but without a connected system, finding it can take hours. LifeShare closes that gap by showing in real time where a matching organ exists.

### 2. Better Utilization of Medical Resources
Expensive equipment often sits idle at one hospital while another nearby hospital needs it urgently. LifeShare enables temporary sharing instead of redundant purchasing, reducing waste and improving overall healthcare efficiency.

### 3. Faster Emergency Response
During road accidents, transplant emergencies, natural disasters, or pandemics, every minute counts. LifeShare lets hospitals send requests, locate nearby resources, and begin transport immediately.

### 4. Real-Time Visibility
Hospitals often don't know which hospital has a kidney available, where a ventilator currently is, or whether an organ has already been dispatched. LifeShare solves this with live tracking and real-time status updates.

### 5. Secure Medical Collaboration
Medical data is highly sensitive. LifeShare restricts access to verified hospital authorities only, reducing the risk of unauthorized access and protecting patient-related information.

### 6. Supports Government Healthcare Planning
A centralized network generates valuable data on organ demand, equipment shortages, and regional healthcare needs — insights that can inform better public health policy and emergency planning.

---

## ⚙️ How It Works

1. A hospital updates available organs or equipment on the network.
2. The information is synchronized across all connected hospitals.
3. Another hospital places a request based on need.
4. The system checks priority and compatibility.
5. Authorized staff approve the request.
6. Instant notifications are sent to all relevant parties.
7. The organ or equipment is dispatched.
8. Live tracking continues until successful delivery.

---

## ✨ Key Features (Implemented)

- **🌐 Real-Time Global Inventory Dashboard** — live listings of available organs, blood inventory, and critical equipment across the network
- **⚡ Instant Waitlist Matching** — hospitals join an automated waitlist when a needed resource isn't available, and get notified the moment it is
- **🤝 Network Synergy Rating** — hospitals earn a rating for successfully sharing and matching life-saving resources, encouraging collaboration
- **🔐 Secure Access** — restricted to verified hospital administrators via JWT-based authentication
- **🔔 Live Alerts** — instant WebSocket notifications for matches, acceptances, and newly available resources
- **📊 Immutable Activity Log** — a transparent record of every transaction between hospitals for ethical auditing

---

## 🛠️ Technology Stack

**Frontend**

![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

**Backend**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

**Database**

![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### 1. Clone & Install

```bash
# Install Server Dependencies
cd server
npm install

# Install Client Dependencies
cd ../client
npm install
```

### 2. Set Up the Environment

You'll need `.env` files in both the `server` and `client` directories. In `server/.env`, set your `JWT_SECRET` and `PORT` (see `server/.env.example`).

### 3. Initialize & Seed the Database

```bash
cd server
npm run seed
```

> Seeded hospitals come with test login credentials, e.g. `city@central.com` / `password123`.

### 4. Run the Application

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
# Runs on port 5000
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
# Runs on localhost:5173
```

Open `http://localhost:5173` and log in with a seeded hospital account to explore.

---

## 🔭 Future Scope

- Connect hospitals across the entire country
- Use AI to recommend the best hospital match and optimal transport routes
- Strengthen security with blockchain and biometric authentication
- Enable international organ-sharing collaboration
- Build dedicated support for disaster and pandemic response
- Provide governments with analytics for healthcare planning

---

## 🤝 Contributing

Contributions are welcome — fork the repo and open a pull request. Improvements toward faster, safer emergency response paths are especially appreciated.

## 📜 License

This project is licensed under the MIT License.

---

*Built with the belief that no patient should lose time — or a life — to a broken information gap.*
