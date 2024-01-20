# Transaction Dashboard

The Coding Challenge is a comprehensive project that involves building both backend and frontend components. The backend tasks include creating APIs to initialize a database, list transactions with search and pagination, provide statistics, generate a bar chart based on price ranges, and create a pie chart for unique categories. The frontend tasks involve utilizing these APIs to construct a dynamic web page featuring a transaction table with search and pagination functionality, transaction statistics display, and a bar chart reflecting price ranges. 
## Backend Task

### Data Source
- **Third-Party API URL**: [https://s3.amazonaws.com/roxiler.com/product_transaction.json](https://s3.amazonaws.com/roxiler.com/product_transaction.json)
- **Request Method**: GET
- **Response Format**: JSON

### Initialize Database API
Create an API to initialize the database. Fetch the JSON from the third-party API and initialize the database with seed data. You are free to define your own efficient table/collection structure.

### List Transactions API
Create an API to list all transactions:
- Supports search and pagination on product transactions.
- Matches search text on product title/description/price.
- Returns product transactions based on matching results.
- If the search parameter is empty, returns all records of the specified page number.
- Default pagination values: page = 1, per page = 10.

### Statistics API
Create an API for statistics:
- Total sale amount of the selected month.
- Total number of sold items of the selected month.
- Total number of not sold items of the selected month.

### Bar Chart API
Create an API for a bar chart:
- Response should contain price range and the number of items in that range for the selected month, regardless of the year.
- Price ranges:
  - 0 - 100
  - 101 - 200
  - 201-300
  - 301-400
  - 401-500
  - 501 - 600
  - 601-700
  - 701-800
  - 801-900
  - 901-above

### Pie Chart API
Create an API for a pie chart:
- Find unique categories and the number of items from that category for the selected month, regardless of the year.
- Example:
  - X category: 20 items
  - Y category: 5 items
  - Z category: 3 items

### Combined API
Create an API that fetches data from all the above APIs, combines the response, and sends a final response of the combined JSON.

## Frontend Task

By using the above-created APIs, implement the following on a single page:

### Transactions Table
- Use the transactions listing API to display transactions in a table.
- Select month dropdown should display Jan to Dec months as options.
- Default selection: March.
- Table lists transactions of the selected month irrespective of the year using the API.
- Search transaction box filters transactions based on title/description/price.
- Clicking Next/Previous loads the next/previous page data from the API.

### Transactions Statistics
- Display total sale amount, total sold items, and total not sold items for the selected month from the dropdown using the API.

### Transactions Bar Chart
- Display the price range and the number of items in that range for the selected month irrespective of the year using the API.
- Apply the month selected from the dropdown above the table.


## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Rusteee16/transaction-dashboard.git
   ```

2. **Install dependencies:**

  ```bash
  cd transaction-dashboard
  npm install
  ```

3. **Set up environment variables:**

Create a .env file in the root of the project.

Add the following variables:

```bash
MONGODB_URI = your_mongodb_url
APIDATA_URL = https://s3.amazonaws.com/roxiler.com/product_transaction.json
DOMAIN = http://localhost:3000 
```

4. **Run the application:**

```
npm run dev
```

Visit http://localhost:3000 in your browser to access the application.

Feel free to explore and enhance the application as needed! If you have any questions or encounter issues, please open an issue. Happy coding! 🚀


