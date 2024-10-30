import express from "express";
import bcrypt from "bcrypt";
import { customerData } from "../schemas/customers.schema.js";

const router = express.Router();

// Create Account Route
router.post("/create-account", async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;

    // Validate request body
    if (!name || !phoneNumber) {
      return res.status(400).send({
        message: "Both name and Phone number are required",
      });
    }

    // Check if customer with the same phone number already exists
    const existingNumber = await customerData.findOne({ phoneNumber });
    if (existingNumber) {
      return res.status(400).send({
        message: "Phone number already registered. Please login.",
      });
    }

    // Create new customer
    const newCustomer = new customerData({
      name,
      phoneNumber,
    });

    const savedCustomer = await newCustomer.save();
    res.status(201).send({
      message: "Account created successfully.",
      data: savedCustomer,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error creating account, please try again later.",
      error: error.message,
    });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { phoneNumber, name } = req.body;

    // Validate request body
    if (!phoneNumber || !name) {
      return res.send({
        message: "Both name and phone number are required.",
      });
    }

    // Check if the customer exists with the provided phone number
    const customerName = await customerData.findOne({ name });
    const customerPhone = await customerData.findOne({ phoneNumber });
    const validDetails = await customerData.findOne({ name, phoneNumber });
    if (!customerName) {
      return res.status(404).send({
        message: "No account found with the provided Name.",
      });
    }
    if (!customerPhone) {
      return res.status(404).send({
        message: "No account found with the provided Phone Number.",
      });
    }

    if (validDetails) {
      res.status(200).send({
        message: `Welcome back, ${validDetails.name}!`,
        data: validDetails,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error logging in, please try again later.",
      error: error.message,
    });
  }
});

// Route to update customer information (name or phone number)
router.put("/update-account/:id", async (req, res) => {
  try {
    const id = req.params.id; // Get customer ID from URL parameters
    const { name, phoneNumber } = req.body; // Destructure the new name and phone number from the request body

    // Validate request body
    if (!name && !phoneNumber) {
      return res.status(400).send({
        message: "At least one field (name or phone number) must be provided for update.",
      });
    }

    // Find the customer by ID
    const customer = await customerData.findById(id);
    if (!customer) {
      return res.status(404).send({
        message: "Customer not found.",
      });
    }

    // Update name if provided
    if (name) {
      customer.name = name;
    }

    // Update phone number if provided
    if (phoneNumber) {
      // Check if the new phone number is already registered
      const existingCustomer = await customerData.findOne({ phoneNumber });
      if (existingCustomer) {
        return res.status(400).send({
          message: "Phone number already registered. Please use a different number.",
        });
      }
      customer.phoneNumber = phoneNumber;
    }

    // Save the updated customer record
    const updatedCustomer = await customer.save();
    res.status(200).send({
      message: "Account updated successfully.",
      data: updatedCustomer,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error updating account, please try again later.",
      error: error.message,
    });
  }
});

export default router;
