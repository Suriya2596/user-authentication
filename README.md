## User Authentication using Express, MongoDB, Node.js, React, React Router Dom, and Redux

### Backend Server
In the backend server, I have implemented a user authentication flow using Express, MongoDB, and Node.js. Here's an overview of the steps involved:

1. First, set up a MongoDB database and an Express server to handle user authentication.
2. Using Mongoose schema, define a user model with the necessary fields to represent user data.
3. Create a user controller that handles the registration and login processes, as well as the corresponding API routes.
4. The user controller for registration collects user details from the request body.
5. It then creates a user document and hashes the password using the bcrypt package. Finally, it saves the user in the MongoDB database.
6. For login, the user provides an email address and password, which are collected from the request body. First, check if the user's email address exists in the database; if not, respond with an "invalid email or password" message.
7. If the user exists, compare the bcrypt-hashed password, and if the comparison is successful, generate a token using the user's credentials.
8. Create middleware to check the Authorization header token in incoming requests. If the token is valid, allow the request to proceed; otherwise, deny access to modify or retrieve data.
9. Provide a route for updating user credentials using the HTTP PUT method.

Packages used in the backend: Express, Mongoose, CORS, Bcrypt, dotenv, JSON Web Token (JWT), Multer, Path, Validator.

### Frontend Client
In the frontend client, I handle user authentication and API calls using React, React Router, Redux, and Axios. Here's how it works:

1. Certain routes like dashboard, edit-user, and reset-password are protected and only accessible once a user logs in and a valid token is stored locally.
2. Utilize Redux to manage API calls and store the response objects from the server.
3. In Redux, handle bad requests or errors using the rejectWithValue function within createAsyncThunk.
4. Use the Axios library to make API calls to the backend server.

Packages used in the frontend: React, React Redux, React Router DOM, Axios, Bootstrap.

This README provides a simplified explanation of the user authentication flow in both the backend server and frontend client, along with the key packages used in each part of the application.

https://github.com/Suriya2596/user-authentication/assets/94885532/c3ad5ad3-8800-4ce2-aedc-c0ff946e9f60

## Setup the project
### Step 1: Install Node.js on Your PC and Clone the Repository
1. Download and install the appropriate version of Node.js for your PC from https://nodejs.org/en/download.
2. Run the command in Command Prompt: git clone https://github.com/Suriya2596/user-authentication
### Step 2: Setting Up the Backend
1. Open the project in Visual Studio.
2. Open the new terminal.
3. Navigate to the 'server' directory using the command: cd server.
4. Install the required packages by running: npm install.
5. Create a .env file and copy this JWT="TOKEN" and paste.
6. Start the server by running: nodemon server.js.
### Step 3: Setting Up the Frontend
2. Open the new terminal.
3. Navigate to the 'client' directory using the command: cd client.
4. Install the necessary packages by running: npm install.
5. Launch the front end by running: npm run dev.
### Step 4: Registration and Login
1. After launching the application, register using your details.
2. Login with your credentials to start using the application.
