import express from "express"
import { menuData } from "../schemas/menu.schema.js"
import { restaurantData } from "../schemas/restaurant.schema.js";
const router = express.Router();

router.post("/add-menu/:id", async (req, res) => {
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
      res.status(200).send({
        meaage: "Dish Already exist"
      })
    } else {

      res.status(400).send({
        message: "Error updating menu item",
        error: error,
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

// route to get one menu
router.get("/get-one/:restaurantID/:menuID", async (req, res) => {
  try {
    const { restaurantID, menuID } = req.params;
    const findMenu = await menuData.findById(menuID);

    if (!findMenu) {
      // Return 404 if the menu is not found
      return res.status(404).send({
        success: false,
        message: "Menu not found"
      });
    }

    if (findMenu.restaurantId.toString() === restaurantID) {
      // Return the menu data if the restaurant ID matches
      return res.send({
        success: true,
        data: findMenu
      });
    } else {
      // Return a 400 status if the restaurant ID does not match
      return res.status(400).send({
        success: false,
        message: "The restaurant ID and menu ID do not match"
      });
    }
  } catch (error) {
    // Handle other errors
    res.status(500).send({
      success: false,
      message: "An error occurred while retrieving the menu",
      error: error.message
    });
  }
});


// Route to fetch all available or unavailable dishes for a restaurant
router.get("/:id&available=:status", async (req, res) => {
  try {
    const { id, status } = req.params;
    const isAvailable = status === "true"; // Convert the 'available' parameter to a boolean

    // Find dishes by restaurant ID and availability status
    const dishes = await menuData.find({
      restaurantId: id,
      available: isAvailable,
    });

    res.status(200).send({
      message: `Dishes retrieved successfully for availability status: ${status}`,
      data: dishes,
    });
  } catch (error) {
    res.status(400).send({
      message: "Error retrieving dishes",
      error: error.message,
    });
  }
});


export default router