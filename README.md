# 🛍️ Styleka - Responsive E-Commerce Web Application

**Styleka** is a fully responsive and interactive e-commerce web application built using **HTML, CSS, JavaScript**, and a basic **Node.js backend** (`server.js`) to simulate login and authentication. It is designed as a modern shopping platform prototype with product catalog browsing, product detail views, user registration, login, cart management, and responsive layout support for all screen sizes.

---

## 📌 Overview

Styleka is aimed at providing a realistic frontend-driven shopping experience, integrated with minimal backend logic. It simulates the end-to-end user journey from visiting the homepage to viewing products, logging in, and managing a shopping cart.

This project can serve as a strong foundation for:
- Web development learning and portfolio building
- Academic assignments or e-commerce system demonstrations
- Further development into a full-stack commercial app

---

## 🗂️ Folder & File Structure

```

Styleka/
├── about.html           # About the website
├── blog.html            # Blog/articles section
├── cancel.html          # Order cancellation confirmation page
├── cart.html            # Shopping cart interface
├── contact.html         # Contact form for customer support
├── index.html           # Homepage showcasing featured products
├── login.html           # User login form
├── register.html        # User registration form
├── shop.html            # All products listing page
├── sproduct.html        # Static template (unused or base product layout)
├── sproduct1.html       # Product 1 detail page
├── sproduct2.html       # Product 2 detail page
├── sproduct3.html       # Product 3 detail page
├── sproduct4.html       # Product 4 detail page
├── sproduct5.html       # Product 5 detail page
├── sproduct6.html       # Product 6 detail page
├── sproduct7.html       # Product 7 detail page
├── sproduct8.html       # Product 8 detail page
├── sproduct9.html       # Product 9 detail page
├── sproduct10.html      # Product 10 detail page
├── sproduct11.html      # Product 11 detail page
├── sproduct12.html      # Product 12 detail page
├── script.js            # Client-side JavaScript for interactivity
├── server.js            # Node.js backend for authentication simulation
├── README.md            # Project documentation

````

---

## 🌟 Features

### ✅ Frontend Features
- **Responsive Design**: Mobile-first and desktop-friendly layout using flexible CSS.
- **Homepage (`index.html`)**: Landing page with navigation to shop and other sections.
- **Product Catalog (`shop.html`)**: Grid-style layout to browse all products.
- **Product Detail Pages (`sproduct1.html` - `sproduct12.html`)**: Each product has a dedicated HTML page with image, price, description, and add-to-cart option.
- **Shopping Cart (`cart.html`)**: Users can view selected items in their cart.
- **Order Management (`cancel.html`)**: Users can simulate order cancellation.
- **Contact Form (`contact.html`)**: Simple HTML form to simulate support inquiries.
- **About and Blog Pages**: Informational pages to simulate a complete e-commerce experience.

### 🔐 Authentication Features
- **Login (`login.html`)** and **Register (`register.html`)** forms with basic form validation.
- **Backend Simulation (`server.js`)**: Simulates server-side login and registration logic using Node.js.

---

## ⚙️ How to Run the Project

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/styleka.git
cd styleka
````

### 2. Start the Backend Server (for authentication simulation)

```bash
node server.js
```

> This starts a simple local Node.js server to simulate user login and authentication. Note that it does not use a database — it serves only as a logical backend prototype.

### 3. Open the Frontend

You can open `index.html` directly in your browser or use a local development server such as **Live Server** in VS Code for better performance.

---

## 💻 Technologies Used

| Technology | Role                         |
| ---------- | ---------------------------- |
| HTML5      | Structure and content        |
| CSS3       | Styling and responsiveness   |
| JavaScript | Client-side interactivity    |
| Node.js    | Backend logic for login/auth |

---

## 🧩 Future Improvements (Optional Ideas)

* Dynamic product rendering using a template engine
* Search and filter functionality on shop page
* Cart persistence using `localStorage` or database
* User login sessions and authentication middleware
* Real backend with Express.js and MongoDB

---


## 📜 License

This project is developed for academic and learning purposes. You may modify and share it with proper credit to the original author.

---

```
