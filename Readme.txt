Personal Expense Tracker API

A RESTful API for managing personal financial records, including income and expenses, with user authentication and transaction summaries.

Features :

  1. User Registration and Login (JWT Authentication)
  2. Add, update, and delete transactions (Income/Expense)
  3. View all transactions or by ID
  4. Transaction summary (total income, total expenses, and balance)
  5. Secured endpoints with JWT
  6. SQLite database for persistent storage

Technologies Used :

  Backend: Node.js, Express.js
  Database: SQLite
  Authentication: JWT (JSON Web Token)
  Hashing: bcrypt.js for password encryption

Installation and Setup :

Prerequisites :
  Node.js installed on your machine
  SQLite (included by default with Node.js)

Installation Steps:

1. Clone the Repository
   git clone https://github.com/sangati-pavan/Personal-expense-tracker.git

2. Navigate to the Project Directory
  cd expense-tracker

3. Install Dependencies
  npm install

4. Run the Application
  npm start

5. The server will start running on http://localhost:3000

API Endpoints :

1. Authentication:

  1.1 Register a User

    URL: /auth/register
    Method: POST
    Description: Registers a new user.
    Request Body:
      {
        "username": "user1",
        "password": "pass123"
      }
    response:
      {
        "message": "User registered",
        "id": 1
      }

  1.2 Login a User

    URL: /auth/login
    Method: POST
    Description: Authenticates a user and returns a JWT token.
    Request Body:
      {
        "username": "user1",
        "password": "pass123"
      }
    Response:
      {
        "token": "your.jwt.token"
      }

2. Transactions :
  Note: All transaction-related endpoints require the Authorization: Bearer <token> header.

  2.1 Add a Transaction
    URL: /transactions
    Method: POST
    Description: Adds a new transaction (income or expense).
    Request Body:
      {
        "type": "income",
        "category": "Salary",
        "amount": 1000,
        "date": "2024-10-01",
        "description": "October Salary"
      }
    Response:
      {
        "message": "Transaction added",
        "id": 1
      }

  2.2 Get All Transactions

    URL: /transactions
    Method: GET
    Description: Retrieves all transactions for the authenticated user.
    Response:
      [
        {
          "id": 1,
          "type": "income",
          "category": "Salary",
          "amount": 1000,
          "date": "2024-10-01",
          "description": "October Salary",
          "userId": 1
        },
        ...
      ]


  2.3 Get a Transaction by ID

    URL: /transactions/:id
    Method: GET
    Description: Retrieves a transaction by its ID.
    Response:
      {
        "id": 1,
        "type": "income",
        "category": "Salary",
        "amount": 1000,
        "date": "2024-10-01",
        "description": "October Salary",
        "userId": 1
      }


  2.4 Update a Transaction

    URL: /transactions/:id
    Method: PUT
    Description: Updates a transaction by its ID.
    Request Body:
      {
        "type": "expense",
        "category": "Food",
        "amount": 200,
        "date": "2024-10-05",
        "description": "Dinner at a restaurant"
      }
    Response:
      {
        "message": "Transaction updated"
      }

  2.5 Delete a Transaction

    URL: /transactions/:id
    Method: DELETE
    Description: Deletes a transaction by its ID.
    Response:
      {
        "message": "Transaction deleted"
      }


  2.6 Get Transaction Summary

    URL: /transactions/summary
    Method: GET
    Description: Retrieves the total income, total expenses, and balance for the authenticated user.
    Response:
      {
        "totalIncome": 5000,
        "totalExpense": 1200,
        "balance": 3800
      }

  2.7 Testing the API with Postman
  
      User Registration: Use POST /auth/register to create a new user.
      User Login: Use POST /auth/login to get the JWT token.
      For all /transactions routes, include the JWT token in the Authorization header as Bearer <token>.