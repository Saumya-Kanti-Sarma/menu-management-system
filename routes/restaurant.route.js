import express from 'express';
const router = express.Router();
import { restaurantData } from "../schemas/restaurant.schema.js"
import bcrypt from "bcrypt"

// Route to create an account
router.post('/create-account', async (req, res) => {
  try {
    const { restaurantName, password, phoneNumber, address, ownerName } = req.body; // remove parentheses
    // Check if required fields are present
    if (!restaurantName || !password || !phoneNumber || !address || !ownerName) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Hash the password, phoneNumber, and address
    const hashedPassword = await bcrypt.hash(password, 10); // await each bcrypt.hash call
    const hashedPhoneNumber = await bcrypt.hash(phoneNumber, 10);
    const hashedAddress = await bcrypt.hash(address, 10);

    // Create a new restaurant document
    const data = new restaurantData({
      restaurantName,
      password: hashedPassword,
      phoneNumber: hashedPhoneNumber,
      address: hashedAddress,
      ownerName,
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

    if ((!restaurantName && !phoneNumber) || !password) {
      return res.status(400).send({
        message: "Please provide a restaurant name or phone number along with the password."
      });
    }
    // login with restarant name
    if (restaurantName && password) {
      const checkName = await restaurantData.findOne({ restaurantName });
      if (!checkName) {
        return res.status(404).send({
          message: "No account with the provided name found"
        });
      }

      const comparePassword = await bcrypt.compare(password, checkName.password);
      if (comparePassword) {
        return res.status(200).send({
          message: `Welcome back ${checkName.restaurantName}`,
        });
      } else {
        return res.status(400).send({
          message: "Password is incorrect"
        });
      }
    }
  } catch (error) {
    res.status(400).send({
      message: "Error in login, please try again later",
      error: error.message,
    });
  }
});

// Route to delete an account
router.delete('/delete', (req, res) => {
  // Handle account deletion logic here
});

export default router;
