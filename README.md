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



## Setup & Run Locally

### 1 Clone & Install
```bash
git clone <repo-url>
cd smart-rewards-backend
npm install
```

### 2 Environment Variables
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

## Mongo Replica-Set (Required for Transactions)
Transactions require replica-set enabled Mongo.



## Start Server
```bash
npm start
```
Server: http://localhost:5000

---

## Postman Testing
Import from:
```
Postman Collection/Smart Rewards.postman_collection.json
```

Test flow:
1 Signup User A & B
2 Login → auto-saves tokens
3 POST /rewards/seed (run once)
4 Add wallet money
5 Redeem vouchers
6 GET /wallet → verify balance + transactions

---

## Mongo Index Exports
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

## Error Handling & Logging
- Global error handler returns structured JSON
- Custom logger logs:
```
{ timestamp, method, url, status, responseTimeMs }
```

---



## Author
Sagnik Biswas – Backend Engineer

---


