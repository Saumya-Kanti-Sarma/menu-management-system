import express from 'express';
import bcrypt from 'bcrypt';
import { restaurantData } from '../schemas/restaurant.schema.js';
import mongoose from 'mongoose';
const router = express.Router();
import { EncryptAlgo, DecryptAlgo } from '../utils/Encrypt.utils.js';

// Route to create an account
router.post('/create-account', async (req, res) => {
  try {
    const { restaurantName, password, phoneNumber, address, ownerName, since, email, about } = req.body;

    // Validate required fields
    if (!restaurantName || !password || !email || !phoneNumber) {
      return res.status(400).send({ message: "All required fields must be provided." });
    }

    // Check for duplicate accounts
    const existingAccount = await restaurantData.findOne({
      $or: [{ restaurantName }, { email }, { phoneNumber }],
    });

    if (existingAccount) {
      return res.status(400).send({
        message: "Account already exists with the provided details.",
      });
    }

    // Hash sensitive fields
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new account
    const data = new restaurantData({
      restaurantName,
      password: hashedPassword,
      phoneNumber,
      address,
      ownerName,
      since,
      email,
      about
    });

    const response = await data.save();

    res.status(201).send({
      message: 'Account created successfully.',
      data: {
        restaurantName: response.restaurantName,
        email: response.email,
        token: response.token, // Return token
      },
    });
  } catch (error) {
    res.status(500).send({
      message: "Error in creating account.",
      error: error.message,
    });
  }
});


// Route to login
router.post('/login', async (req, res) => {
  try {
    const { restaurantName, password } = req.body;

    if (!restaurantName || !password) {
      return res.status(400).send({
        message: "All Details required",
      });
    }
    else if (!restaurantName) {
      return res.status(400).send({
        message: "Restaurant name required",
      });
    }
    else if (!password) {
      return res.status(400).send({
        message: "password required",
      });
    }

    // Find the user
    const user = await restaurantData.findOne({ restaurantName });

    if (!user) {
      return res.status(404).send({
        message: "No account found with the provided details.",
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password." });
    }

    // Respond with a success message and token
    res.status(200).send({
      message: `Welcome back, ${user.restaurantName}!`,
      data: user, // Return token for authentication
    });
  } catch (error) {
    res.status(500).send({
      message: "Error during login.",
      error: error.message,
    });
  }
});


router.post("/forgot-password/:id", async (req, res) => {
  const id = req.params.id;
  const { email, password } = req.body;

  try {
    // Find the user by ID
    const verifyUser = await restaurantData.findById(id);
    if (!verifyUser) {
      return res.status(404).send({ message: "User not found!" });
    }

    // Check if the email matches
    if (verifyUser.email !== email) {
      return res.status(400).send({ message: "Email does not match!" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the password
    const newData = await restaurantData.findByIdAndUpdate(
      id,
      { $set: { password: hashedPassword } },
      { new: true } // Return the updated document
    );

    res.status(200).send({
      message: "Password changed successfully!",
      data: newData,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// get info
router.get('/get-info/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const restaurant = await restaurantData.findById(id);
    if (!restaurant) {
      res.status(400).send({
        message: "cannot Find the restaurant"
      })
    }
    const newData = {
      ownerName: restaurant.ownerName,
      restaurantName: restaurant.restaurantName,
      email: restaurant.email,
      ownerName: restaurant.ownerName,
      since: restaurant.since,
      address: restaurant.address,
      phoneNumber: restaurant.phoneNumber,
      about: restaurant.about,
    }
    res.status(200).send({
      restaurantDetails: newData
    })


  } catch (error) {
    res.status(400).send({
      message: "cannot get info right now, please try later",
      error: error,
    })
  }
})


// update data
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      restaurantName,
      email,
      ownerName,
      since,
      address,
      phoneNumber,
      coverPics,
      about,
      highlights,
      password,
    } = req.body;

    // Validate the provided ID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ message: "Invalid account ID." });
    }

    // Create an object for the fields to update
    const updateData = {};

    // Hash password if it exists
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Add other fields to the update object
    if (restaurantName) updateData.restaurantName = restaurantName;
    if (email) updateData.email = email;
    if (address) updateData.address = address;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;
    if (ownerName) updateData.ownerName = ownerName;
    if (since) updateData.since = since;
    if (coverPics) updateData.coverPics = coverPics;
    if (about) updateData.about = about;
    if (highlights) updateData.highlights = highlights;

    // Check if there's any data to update
    if (Object.keys(updateData).length === 0) {
      return res.status(400).send({ message: "No update data provided." });
    }

    // Update the account
    const updatedAccount = await restaurantData.findByIdAndUpdate(
      id,
      { $set: updateData }, // Use $set to avoid overwriting the entire document
      { new: true, runValidators: true } // Return updated document and validate the data
    );

    // Handle case where the account does not exist
    if (!updatedAccount) {
      return res.status(404).send({ message: "Account not found." });
    }

    res.status(200).send({
      message: "Account updated successfully.",
      data: updatedAccount,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error updating account.",
      error: error.message,
      ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
      IV: process.env.IV,
    });
  }
});


// Route to delete an account
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAccount = await restaurantData.findByIdAndDelete(id);

    if (!deletedAccount) {
      return res.status(404).send({ message: "Account not found." });
    }

    res.status(200).send({
      message: "Account deleted successfully.",
    });
  } catch (error) {
    res.status(500).send({
      message: "Error deleting account.",
      error: error.message,
    });
  }
});


export default router;
