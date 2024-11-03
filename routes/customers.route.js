import express from "express";
import bcrypt from "bcrypt";
import { customerData } from "../schemas/customers.schema.js";

const router = express.Router();

// Create Account Route
router.post("/create-account", async (req, res) => {
  try {
    const { name, phoneNumber, password } = req.body;

    // Validate request body
    if (!name || !phoneNumber) {
      return res.send({
        message: "Both name and Phone number are required",
      });
    }

    // Check if customer with the same phone number already exists
    const existingNumber = await customerData.findOne({ phoneNumber });
    if (existingNumber) {
      return res.send({
        message: "Phone number already registered. Please login.",
      });
    }

    // encrypt new password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new customer
    const newCustomer = new customerData({
      name,
      phoneNumber,
      password: hashedPassword
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
    const { phoneNumber, name, password } = req.body;
    // Check if the customer exists with the provided phone number
    const validDetails = await customerData.findOne({ $or: [{ name }, { phoneNumber }] });
    if (!validDetails) {
      return res.status(404).send({
        message: "No account found with the provided details.",
      });
    }
    // compare password and proceed for login
    const comparePassword = await bcrypt.compare(password, validDetails.password);
    if (comparePassword) {
      res.send({
        status: true,
        data: `welcome back ${validDetails.name}`
      })
    }
    else {
      res.send({
        status: false,
        data: `wrong password. Please try again.`
      })
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
    const { name, phoneNumber, password } = req.body;

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
      customer.phoneNumber = phoneNumber;
    }
    // Update phone number if provided
    if (password) {
      customer.password = password;
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

// route to get all customer
router.get('/allcustomer/:from/:to', async (req, res) => {
  try {
    const from = parseInt(req.params.from, 0);
    const to = parseInt(req.params.to, 10);

    // Calculate the number of documents to fetch
    const limit = to - from + 1;

    // Fetch restaurants with skip and limit
    const restaurants = await customerData.find()
      .skip(from)
      .limit(limit);

    res.status(200).send({
      success: true,
      data: restaurants
    });
  } catch (error) {
    res.send({
      success: false,
      message: 'Error fetching customers',
      error: error.message
    });
  }
});

// route to insert many restaurant 
router.post("/insert-many", async (req, res) => {
  try {
    const data = req.body;
    const uploadData = await customerData.insertMany(data);
    if (uploadData) {
      res.send({
        success: true,
        data: uploadData
      })
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error
    })
  }
})

export default router;
