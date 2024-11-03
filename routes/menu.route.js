import express from "express"
import { menuData } from "../schemas/menu.schema.js"
import { restaurantData } from "../schemas/restaurant.schema.js"
import mongoose from "mongoose";
const router = express.Router();

router.post("/add-menu/:id", async (req, res) => { // we are serching the id into the database to get the name of restaurant
  try {
    const id = req.params.id;
    const { dishName, price, image, available } = req.body;
    const restaurant = await restaurantData.findById(id); // check the name of restaurant 
    if (!restaurant) {
      return res.send({
        message: "invalid restaurant ID, please check the ID you have provided"
      })
    }

    // Check if the dishName already exists for this restaurant
    const existingDish = await menuData.findOne({
      menuOf: restaurant.restaurantName,
      dishName,
    });
    if (existingDish) {
      return res.send({
        message: `Dish name "${dishName}" already exists for this restaurant.`,
      });
    }
    const data = new menuData({
      dishName,
      price,
      available,
      restaurantId: id,
      image
    })
    const response = await data.save()
    res.status(200).send({
      meaage: "menu added successfully",
      data: response
    })
  } catch (error) {
    if (error.code == 11000) {
      res.send({
        success: false,
        data: "item already exist"
      })
    }
    else {
      res.status(400).send({
        message: "Something went wrong, please try again later",
        error: error.message,
      });
    }
  }

})

// Route to edit a menu item
router.put("/edit-menu/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { dishName, price, available, image } = req.body; // Values to update

    const updatedMenu = await menuData.findByIdAndUpdate(
      id,
      { dishName, price, available, image },
      { new: true }
    );

    if (!updatedMenu) {
      return res.status(404).send({
        message: "Menu item not found",
      });
    }

    res.status(200).send({
      message: "Menu item updated successfully",
      data: updatedMenu,
    });
  } catch (error) {
    res.status(400).send({
      message: "Error updating menu item",
      error: error.message,
    });
  }
});

// Route to delete a menu item
router.delete("/delete-menu/:id/", async (req, res) => {
  try {
    const id = req.params.id;
    const restaurantID = req.params.id;
    const deletedMenu = await menuData.findByIdAndDelete(id);

    if (!deletedMenu) {
      return res.status(404).send({
        message: "Menu item not found",
      });
    }

    res.status(200).send({
      message: "Menu item deleted successfully",
      data: deletedMenu,
    });
  } catch (error) {
    res.status(400).send({
      message: "Error deleting menu item",
      error: error.message,
    });
  }
});

// Route to get all menus of a specific restaurant
router.get("/all-items/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const menus = await menuData.find({ restaurantId: id });
    res.status(200).send({
      message: "Menus retrieved successfully",
      data: menus,
    });
  } catch (error) {
    res.status(400).send({
      message: "Error retrieving menus",
      error: error.message,
    });
  }
});


// route to insert many menus 
router.post("/insert-many", async (req, res) => {
  try {
    const data = req.body;
    const uploadData = await menuData.insertMany(data);
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

export default router