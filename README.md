# Personal Finance Tracker

## Setup Instructions

1. **Clone the Repository**
```bash
git clone https://github.com/priyanshuguptadev/personal-finance-tracker
cd personal-finance-tracker
```

2. **Setup Backend**
```bash
cd backend
npm install
# Create .env file from .env.example
npm run dev
```

3. **Setup Frontend**
```bash
cd frontend
npm install
# Create .env with VITE_API_URL=http://localhost:5000/api
npm run dev
```

4. **Access Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Environment Variables


## API Endpoints
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

That's it! Your Finance Tracker is ready to use.
