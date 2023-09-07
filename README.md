## User Authentication using Express, MongoDB, Node.js, React, React Router, and Redux
### Backend Server
In the backend server, I have implemented a user authentication flow using Express, MongoDB, and Node.js. Here's an overview of the steps involved:

#### Setting up MongoDB and Express Server:
I first set up a MongoDB database and an Express server to handle user authentication.

#### Creating User Model:
Using Mongoose schema, I define a user model with the necessary fields to represent user data.

#### User Controller:
I create a user controller that handles the registration and login processes, as well as the corresponding API routes.

#### User Registration:
The user controller for registration collects user details from the request body.
It then creates a user document and hashes the password using the bcrypt package.
Finally, it saves the user in the MongoDB database.

#### User Login:
For login, the user provides an email address and password, which are collected from the request body.
First, it checks if the user's email address exists in the database; if not, it responds with an "invalid email or password" message.
If the user exists, it compares the bcrypt-hashed password, and if the comparison is successful, it generates a token using the user's credentials.

#### Middleware for Authorization:
I create middleware to check the Authorization header token in incoming requests. If the token is valid, the request is allowed to proceed; otherwise, it's denied access to modify or retrieve data.

#### Updating User Credentials:
I provide a route for updating user credentials using the HTTP PUT method.

Packages used in the backend: Express, Mongoose, CORS, Bcrypt, dotenv, JSON Web Token (JWT), Multer, Path, Validator.

## Frontend Client
In the frontend client, I handle user authentication and API calls using React, React Router, Redux, and Axios. Here's how it works:

#### Private Routes:
Certain routes like dashboard, edit-user, and reset-password are protected and only accessible once a user logs in and a valid token is stored locally.

#### Redux for API Calls:
I utilize Redux to manage API calls and store the response objects from the server.

#### Error Handling:
In Redux, I handle bad requests or errors using the rejectWithValue function within createAsyncThunk.

#### Axios for API Calls:
I use the Axios library to make API calls to the backend server.

Packages used in the frontend: React, React Redux, React Router DOM, Axios, Bootstrap.

This README provides a simplified explanation of the user authentication flow in both the backend server and frontend client, along with the key packages used in each part of the application.

https://github.com/Suriya2596/user-authentication/assets/94885532/c3ad5ad3-8800-4ce2-aedc-c0ff946e9f60
