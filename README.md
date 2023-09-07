## User Authentication using Express, MongoDB, Node.js, React, React Router, and Redux
### Backend Server
In the backend server, we have implemented a user authentication flow using Express, MongoDB, and Node.js. Here's an overview of the steps involved:

1. Setting up MongoDB and Express Server:
We first set up a MongoDB database and an Express server to handle user authentication.

2. Creating User Model:
Using Mongoose schema, we define a user model with the necessary fields to represent user data.

3. User Controller:
We create a user controller that handles the registration and login processes, as well as the corresponding API routes.

4. User Registration:
The user controller for registration collects user details from the request body.
It then creates a user document and hashes the password using the bcrypt package.
Finally, it saves the user in the MongoDB database.

5. User Login:
For login, the user provides an email address and password, which are collected from the request body.
First, it checks if the user's email address exists in the database; if not, it responds with an "invalid email or password" message.
If the user exists, it compares the bcrypt-hashed password, and if the comparison is successful, it generates a token using the user's credentials.

6. Middleware for Authorization:
We create middleware to check the Authorization header token in incoming requests. If the token is valid, the request is allowed to proceed; otherwise, it's denied access to modify or retrieve data.

7. Updating User Credentials:
We provide a route for updating user credentials using the HTTP PUT method.

Packages used in the backend: Express, Mongoose, CORS, Bcrypt, dotenv, JSON Web Token (JWT), Multer, Path, Validator.

## Frontend Client
In the frontend client, we handle user authentication and API calls using React, React Router, Redux, and Axios. Here's how it works:

1. Private Routes:
Certain routes like dashboard, edit-user, and reset-password are protected and only accessible once a user logs in and a valid token is stored locally.

2. Redux for API Calls:
We utilize Redux to manage API calls and store the response objects from the server.

3. Error Handling:
In Redux, we handle bad requests or errors using the rejectWithValue function within createAsyncThunk.

4. Axios for API Calls:
We use the Axios library to make API calls to the backend server.

Packages used in the frontend: React, React Redux, React Router DOM, Axios, Bootstrap.

This README provides a simplified explanation of the user authentication flow in both the backend server and frontend client, along with the key packages used in each part of the application.