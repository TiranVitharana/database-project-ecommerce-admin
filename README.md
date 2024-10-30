
# Admin Panel - E-Commerce Platform

This project is an **Admin Panel** for a single-vendor e-commerce platform, developed as part of the **3rd Semester Database Systems Project** at the **University of Moratuwa, Department of Computer Science and Engineering, Faculty of Engineering**. The application allows for role-based access control (RBAC) for different types of users: Admin, Delivery Person, and Inventory Manager. It was built using **MySQL**, **Next.js**, and **TypeScript**.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
  - [Role-Based Access Control (RBAC)](#role-based-access-control-rbac)
  - [Product Management](#product-management)
  - [Order and Inventory Management](#order-and-inventory-management)
  - [Delivery Management](#delivery-management)
  - [Reporting and Analytics](#reporting-and-analytics)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The admin panel is designed for a single-vendor e-commerce platform and supports the management of products, inventory, and orders, as well as delivery tracking and reporting features. It allows administrators, delivery personnel, and inventory managers to access specific functionalities according to their roles.

## Features

### Role-Based Access Control (RBAC)

- **Admin**: Full access to all functionalities, including user management and detailed analytics.
- **Delivery Person**: Access to manage and track delivery statuses.
- **Inventory Manager**: Access to manage product inventory and stock levels.

### Product Management

- Maintain product catalog with options for multiple variants (e.g., size, color).
- Categorize products to enable efficient search and sorting functionality.
- Define custom attributes for different types of products.

### Order and Inventory Management

- Handle customer orders, including tracking order status and managing payment methods (cash on delivery, card).
- Automatically update inventory after an order checkout to ensure consistency.

### Delivery Management

- Calculate estimated delivery time based on product availability and delivery location.
- Track delivery status and update as necessary.

### Reporting and Analytics

- Generate quarterly sales reports and other analytics, such as:
  - Products with the highest sales
  - Most ordered product categories
  - Customer order reports
  - Interest in products over specific time periods

## Technologies Used

- **MySQL**: For database management and transaction consistency.
- **Next.js**: For building a robust, scalable front-end.
- **TypeScript**: Ensures type safety and better error handling.

## Installation

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/admin-panel-ecommerce.git
   ```
2. Navigate to the project directory:
   ```bash
   cd admin-panel-ecommerce
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up the MySQL database and add the necessary environment variables in a `.env` file.

5. Run the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Log in with the respective role (Admin, Delivery Person, Inventory Manager).
2. Navigate through the panel based on role-based permissions.
3. Use available features to manage products, inventory, orders, and delivery tracking.
4. Access reports and analytics in the Admin dashboard.

## Project Structure

The project follows a standard Next.js and TypeScript structure, with organized directories for pages, components, and services.

## Contributing

Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request.

## License

This project is licensed under the MIT License.
