import express from 'express';
const router = express.Router();
import { restaurantData } from "../schemas/restaurant.schema.js"
import bcrypt from "bcrypt"

// Route to create an account
router.post('/create-account', async (req, res) => {
  try {
    const { restaurantName, password, phoneNumber, address, ownerName, type } = req.body; // remove parentheses
    // Check if required fields are present
    if (!restaurantName || !password || !phoneNumber || !address || !ownerName) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Hash the password, phoneNumber, and address
    const hashedPassword = await bcrypt.hash(password, 10); // await each bcrypt.hash call
    const hashedPhoneNumber = await bcrypt.hash(phoneNumber, 10);
    const hashedAddress = await bcrypt.hash(address, 10);

    // check if restaurant is already registered:
    const checkRegistration = await restaurantData.findOne({ restaurantName });
    if (checkRegistration) {
      res.send({
        message: "cannot register new account",
        data: "account name already registered!"
      })
    }
    // generate token 
    const token = `${ownerName + Date.now()}`;

    // Create a new restaurant document
    const data = new restaurantData({
      restaurantName,
      password: hashedPassword,
      phoneNumber: hashedPhoneNumber,
      address: hashedAddress,
      ownerName,
      type,
      token: token
    });
    const response = await data.save();

    res.status(200).send({
      msg: 'Account created successfully',
      data: response,
    });
  } catch (error) {
    res.status(400).send({
      message: "Error in creating account",
      error: error.message,
    });
  }
});

// Route to login
router.post('/login', async (req, res) => {
  try {
    const { restaurantName, password, phoneNumber } = req.body;

    // Check if either restaurant name or phone number is provided along with the password
    if ((!restaurantName && !phoneNumber) || !password) {
      return res.status(400).send({
        message: "Please provide a restaurant name or phone number along with the password."
      });
    }

    // Find the user by restaurant name or phone number
    const user = await restaurantData.findOne({ $or: [{ restaurantName }, { phoneNumber }] });

    // If the user is not found, respond with an error
    if (!user) {
      return res.status(404).send({
        message: "User not found. Please check your credentials."
      });
    }

    // Compare password
    const comparePassword = await bcrypt.compare(password, user.password);
    if (comparePassword) {
      res.status(200).send({
        message: "Login successful",
        data: `Welcome back ${user.restaurantName}`
      });
    } else {
      // Respond with an error if the password does not match
      return res.status(401).send({
        message: "Invalid password. Please try again."
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error in login, please try again later",
      error: error.message,
    });
  }
});

// route to get all restaurants
router.get('/allrestaurant/:from/:to', async (req, res) => {
  try {
    const from = parseInt(req.params.from, 0);
    const to = parseInt(req.params.to, 10);

    // Calculate the number of documents to fetch
    const limit = to - from + 1;

    // Fetch restaurants with skip and limit
    const restaurants = await restaurantData.find()
      .skip(from)
      .limit(limit);

    res.status(200).send({
      success: true,
      data: restaurants
    });
  } catch (error) {
    res.send({
      success: false,
      message: 'Error fetching restaurants',
      error: error.message
    });
  }
});

// Route to delete an account
router.delete('/delete', (req, res) => {
  // Handle account deletion logic here
});

export default router;
