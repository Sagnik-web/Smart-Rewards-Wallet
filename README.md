# Smart Rewards & Wallet Backend – Node.js + MongoDB

A backend system simulating a **wallet + rewards platform**, featuring:
- JWT Authentication
- Wallet system: add & redeem balance
- Voucher rewards
- MongoDB indexing
- Custom logging & global error handling

---

## Tech Stack
- Node.js
- Express.js
- MongoDB
- JWT Auth



## 🛠 Setup & Run Locally

### 1️⃣ Clone & Install
```bash
git clone <repo-url>
cd smart-rewards-backend
npm install
```

### 2️⃣ Environment Variables
Copy and edit:
```bash
cp .env.example .env
```


Example values:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/smart_rewards
JWT_SECRET=your_secret_here
```

---

## 🧬 Mongo Replica-Set (Required for Transactions)
Transactions require replica-set enabled Mongo.



## ▶ Start Server
```bash
npm start
```
Server: http://localhost:5000

---

## 🧪 Postman Testing
Import from:
```
Postman Collection/Smart Rewards.postman_collection.json
```

Test flow:
1️⃣ Signup User A & B
2️⃣ Login → auto-saves tokens
3️⃣ POST /rewards/seed (run once)
4️⃣ Add wallet money
5️⃣ Redeem vouchers
6️⃣ GET /wallet → verify balance + transactions

---

## 🗂 Mongo Index Exports
Stored under:
```
index-exports/
├─ users.json
├─ wallets.json
├─ transactions.json
├─ redeemedrewards.json
└─ vouchers.json
```


Generated using:
```js
db.users.getIndexes()
db.transactions.getIndexes()
db.redeemedrewards.getIndexes()
db.wallets.getIndexes()
db.vouchers.getIndexes()
```

---


Include:
- Controllers → Services → DB
- Wallet update transaction path
- Voucher redemption flow
- Indexing markers


---

## ⚙ Error Handling & Logging
- Global error handler returns structured JSON
- Custom logger logs:
```
{ timestamp, method, url, status, responseTimeMs }
```

---



## 🧑‍💻 Author
Sagnik Biswas – Backend Engineer

---


