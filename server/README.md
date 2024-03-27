# capstone-325 - server

## Built With

-   JavaScript
-   Node
-   npm
-   nodemon
-   Express
-   MongoDB
-   Mongoose

## Getting Started

### Prerequisites

-   npm (Node Packet Manager)

    -   To install npm, you need to install Node.js, which includes npm
    -   Install Node.js via installer: https://nodejs.org/en/download/current
    -   Verify installation by running

        ```sh
        node -v
        npm -v
        ```

    -   If installed correctly, these commands will display the versions of Node.js and npm installed on your system

### Installation

1. Clone the repo and then navigate to the new directory
    ```sh
    git clone https://github.com/dean-ferreira/capstone-325.git
    cd capstone-325/server/
    ```
2. Install all Development Dependencies listed in package.json
    ```sh
    npm install
    ```
3. Get an API Key at https://collectapi.com/api/gasPrice/gas-prices-api
4. Configure .env file
    ```sh
    DATABASE_URL=your_database_url
    API_KEY=apikey your_api_key
    ```

## Usage

-   Start a server:
    ```sh
    npm start
    ```
-   To start a development server with nodemon:
    ```sh
    npm run dev
    ```

## API Routes

1. `/seed`
    - GET `/`
        - Populate your application's collections with sample data illustrating the use case of the collections.
        - Read Operation
2. `/states`
    - GET `/`
        - Retrieve all states
        - Read Operation
    - GET `/:id`
        - Retrieve state by id
        - Read Operation
    - GET `/lowest/:num`
        - Retrieve x number of states with the lowest average price
        - Read Operation
    - GET `/highest/:num`
        - Retrieve x number of states with the highest average price
        - Read Operation
3. `/fav`
    - GET `/`
        - Retrieve all favorites
        - Read Operation
    - GET `/user/:id`
        - Retrieve favorite by user id
        - Read Operation
    - POST `/`
        - Create a favorite
        - Create Operation
    - DELETE `/:id`
        - Delete a favorite by state id
        - Delete Operation
4. `/users`
    - GET `/`
        - Retrieve all users
        - Read Operation
    - GET `/:id`
        - Retrieve user by id
        - Read Operation
    - POST `/`
        - Create user
        - Create Operation
    - PATCH `/:id`
        - Update user by id
        - Update Operation
    - DELETE `/:id` - Delete user by id - Delete operation
5. `/orders`
    - GET `/`
        - Retrieve all orders
        - Read Operation
    - GET `/user/:id`
        - Retrieve orders by user id
        - Read Operation
    - POST `/`
        - Create an order
        - Create Operation
    - DELETE `/:id`
        - Delete an order by id
        - Delete Operation
