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
3. Configure .env file
    ```sh
    DATABASE_URL=your_database_url
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
