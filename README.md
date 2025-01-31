🍔 Food Delivery Website

A MERN stack food delivery platform where users can browse, add food items to their cart, place orders, and make payments via Stripe. The application also includes an admin panel for managing food items and order status.

🚀 Features

User Features

Sign up & Log in (JWT authentication, bcrypt for password hashing)

Browse food items

Add items to cart & manage quantity

Secure checkout with Stripe

View order history in My Orders

Admin Features

Add and delete food items

View list of food

View list of orders

Mark orders as delivered or out for delivery

Other Features

Cloudinary integration for image storage

Responsive UI with React & Tailwind CSS

Real-time order updates

🛠️ Tech Stack

MongoDB for database

Express.js for backend framework

React.js for frontend framework

Node.js for server-side runtime

Cloudinary for image storage

Stripe for payment processing

JWT & bcrypt for authentication and password hashing

Tailwind CSS for styling

Mongoose for MongoDB object modeling

Axios for API requests

📦 Packages Used

Backend Dependencies

express for building the backend

mongoose for MongoDB interaction

dotenv for environment variable management

cors for handling cross-origin requests

jsonwebtoken for JWT authentication

bcryptjs for password hashing

cloudinary for image storage

stripe for payment processing

Frontend Dependencies

react for building the frontend

react-router-dom for navigation

axios for API calls

tailwindcss for styling

🏗️ Installation

Clone the repository:

git clone https://github.com/RaushanGupta1516/FOOD-DELIVERY-PAGE.git

cd food-delivery

Set up the backend:

cd backend

npm install

Create a .env file and add:

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret

STRIPE_SECRET_KEY=your_stripe_key

Start the server:

npm run dev

Set up the frontend:

cd ../frontend

npm install

npm start

📚 What I Learned

Built a complete MERN stack application.

Implemented JWT authentication and bcrypt for password hashing.

Integrated Cloudinary for storing images securely.

Implemented Stripe for handling secure online payments.

Designed RESTful APIs for managing food items and orders.

Used Axios for API calls between frontend and backend.

Configured CORS to allow frontend-backend communication.

Styled the application using Tailwind CSS for a responsive UI.

Built an admin panel to manage food items and order status.

Learned to deploy both frontend and backend.
