Documentation for Restaurant Menu Management System

<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<VARIOUS SCHEMAS>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

This document outlines the schemas used in the Restaurant Menu Management System. The system is designed with four primary entities:

1. Restaurant Schema

  Purpose: Stores essential information about each registered restaurant.
    Fields:
      restaurantName (String): Unique name of the restaurant.
      password (String): Password for secure access.
      phoneNumber (String): Contact number of the restaurant, unique.
      address (String): Physical address.
      ownerName (String): Name of the restaurant owner.
      type (Array of Strings): Category type(s) like club, events, family restaurant, dhaba.
      created (Date): Date of registration, defaults to the current date.
      embedding (Array of Numbers): Vector data for enabling advanced search; indexed for spatial search.


2. Menu Schema

  Purpose: Defines individual menu items (dishes) offered by a restaurant.
    Fields:
      dishName (String): Name of the dish; unique within each restaurant.
      image (String): URL of the dish image(comes from firebase).
      price (Number): Price of the dish.
      available (Boolean): Availability status; defaults to true.
      menuOf (ObjectId): Reference to the restaurant the dish belongs to.
      Indexes: Ensures unique dish names within each restaurant by indexing on menuOf and dishName.


3. Customer Schema

  Purpose: Holds customer data for user interactions and authentication.
    Fields:
      name (String): Name of the customer.
      phoneNumber (String): Contact number, unique per customer.
      password (String): Secure password for customer login.


4. Ratings Schema

  Purpose: Stores reviews and ratings provided by customers on individual menu items.
    Fields:
      customerID (ObjectId): References the customer leaving the rating.
      dishID (ObjectId): References the dish being rated.
      review (String): Optional text review of the dish.
      stars (Number): Star rating between 0 and 5, defaults to 0.
      like (Array of ObjectIds): References customers who liked the review.
      dislike (Array of ObjectIds): References customers who disliked the review.


Relationships & References
  1. Restaurant ↔ Menu: menuOf in Menu references Restaurant.
  2. Customer ↔ Ratings: customerID in Ratings references Customer.
  3. Menu ↔ Ratings: dishID in Ratings references Menu.
  
      This structure ensures efficient data retrieval, unique constraints, and ease of scalability in handling multiple restaurant menus, customers, and reviews.