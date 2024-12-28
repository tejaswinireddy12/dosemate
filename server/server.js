// Step 1: Import required dependencies
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');
require('dotenv').config();
console.log('Environment variables loaded:', process.env.MONGO_URI);


// Step 2: Load environment variables
dotenv.config();

// Step 3: Initialize Express application
const app = express();
app.use(express.json());  // To parse JSON bodies

// Enable CORS with credentials support
app.use(cors({
    origin: 'http://localhost:3000',  // Frontend URL (adjust for production)
    credentials: true  // Enable credentials (cookies) for cross-origin requests
}));

// Step 4: MongoDB connection (replace MONGO_URI with your MongoDB connection string)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);  // Exit if unable to connect to MongoDB
    });
    

// Step 5: Define MongoDB schema and model (User model)
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true }
});
const UserModel = mongoose.model('User', UserSchema);

// Step 6: Set up session management
app.use(session({
    secret: process.env.SESSION_SECRET,  // Session secret for cookie signing
    resave: false,
    saveUninitialized: false,  // Avoid saving empty sessions
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,  // MongoDB URI for session storage
    }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 }  // Session cookie expiration: 1 day
}));

// Step 7: Signup route (handling user registration)
app.post('/signup', async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        // Validate input fields
        if (!email || !password || !name || !phone) {
            return res.status(400).json({ error: 'Please provide all required fields' });
        }

        // Check if email or phone already exists in the database
        const existingUser = await UserModel.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Email or phone number already exists' });
        }

        // Password strength validation (simple regex, you can improve it)
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ error: 'Password must be between 6 and 20 characters, and include at least one numeric digit, one uppercase and one lowercase letter' });
        }

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user and save to database
        const newUser = new UserModel({ name, email, password: hashedPassword, phone });
        const savedUser = await newUser.save();

        // Respond with the newly created user info (excluding password)
        res.status(201).json({
            id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
            phone: savedUser.phone
        });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'An error occurred during signup' });
    }
});

// Step 8: Login route (handling user authentication)
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input fields
        if (!email || !password) {
            return res.status(400).json({ error: 'Please provide both email and password' });
        }

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'No user found with this email' });
        }

        // Compare the password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Incorrect password" });
        }

        // Save user session
        req.session.user = { id: user._id, name: user.name, email: user.email, phone: user.phone };

        // Respond with success and user info (without password)
        res.json({ message: 'Success', user: req.session.user });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'An error occurred during login' });
    }
});

// Step 9: Logout route (handling user logout)
app.post('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                res.status(500).json({ error: 'Failed to logout' });
            } else {
                res.status(200).json({ message: 'Logout successful' });
            }
        });
    } else {
        res.status(400).json({ error: 'No session found' });
    }
});

// Step 10: Get user route (checking if user is authenticated)
app.get('/user', (req, res) => {
    if (req.session.user) {
        res.json({ user: req.session.user });
    } else {
        res.status(401).json({ error: 'Not authenticated' });
    }
});

// Step 11: Start the server
const port = process.env.PORT || 6000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
