# URL Shortener

A simple and efficient **URL Shortener** application built using the **MERN stack** (MongoDB, Express, React, Node.js). This app allows users to shorten long URLs, track the number of clicks, and provides a login system for managing and tracking user-specific shortened links.

## 🚀 Features

- 🌐 **Shorten Long URLs**: Convert long URLs into short, easy-to-share links.
- 📊 **Track Clicks**: Get analytics on how many times a shortened link has been clicked.
- 🔐 **User Authentication**: Register and log in to track and manage your own shortened links.
- 🗄 **Database**: MongoDB stores URL data and user information.
- 🧠 **Caching**: Local storage caching ensures faster performance by avoiding repeated API calls.
- 📅 **User-Specific Links**: Users can view all the URLs they have shortened after logging in.
- 🛠️ **Click Analytics**: Links track how many clicks they’ve received in real-time.

## 🛠️ Tech Stack

- **Frontend**: React.js, HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Deployment**: [Vercel](https://vercel.com/) for frontend, [Heroku](https://heroku.com/) for backend

## 📂 Project Structure

```bash
URL-Shortener/
├── backend/             # Backend API (Node.js & Express)
├── frontend/            # Frontend (React.js)
├── .env                 # Environment variables
├── README.md            # Project documentation
└── package.json         # Project metadata and dependencies

🖥️ Live Demo
Check out the live project here:

Frontend: URL Shortener Frontend
Backend: URL Shortener Backend
⚙️ Installation
To run this project locally, follow these steps:

Prerequisites
Node.js (v14+)
MongoDB
A MongoDB cluster or a locally running MongoDB instance
Backend Setup
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/url-shortener.git
Navigate to the backend directory:

bash
Copy code
cd url-shortener/backend
Install backend dependencies:

bash
Copy code
npm install
Create a .env file in the backend root directory and add the following:

bash
Copy code
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
PORT=3000
Run the backend server:

bash
Copy code
npm start
The server will run on http://localhost:3000.

Frontend Setup
Navigate to the frontend directory:

bash
Copy code
cd ../frontend
Install frontend dependencies:

bash
Copy code
npm install
Create a .env file in the frontend root directory and add the following:

bash
Copy code
REACT_APP_BACKEND_URL=http://localhost:3000
Run the React app:

bash
Copy code
npm start
The app will run on http://localhost:3001.

🚀 Usage
Open the frontend at http://localhost:3001.
Register or log in with your credentials.
Enter a long URL in the input field and hit Shorten Now!.
Your shortened link will appear below, along with the number of clicks.
Click on the shortened link to see the updated analytics (click tracking).
Refreshing the page will still show your previously shortened URLs (cached and fetched from the database).
🌍 Deployment
Frontend
The frontend is deployed using Vercel.

Visit Vercel and log in or sign up.

Connect your GitHub repository and deploy the frontend.

Set environment variables for the frontend in Vercel:

bash
Copy code
REACT_APP_BACKEND_URL=https://your-backend-url.com
Backend
The backend is deployed using Heroku.

Visit Heroku and log in or sign up.

Create a new Heroku app and connect it to your GitHub repository.

Set environment variables in the Heroku settings:

bash
Copy code
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
Deploy the backend from Heroku’s dashboard or through GitHub actions.

📦 API Endpoints
Here are some of the key API endpoints for this project:

Authentication
POST /auth/register: Register a new user.
POST /auth/login: Log in an existing user and receive a JWT token.
URL Management
POST /url: Create a new shortened URL.

Request body: { url: "https://longurl.com" }
Requires a valid JWT token for user authentication.
GET /url/user: Fetch all shortened URLs created by the authenticated user.

Requires a valid JWT token.
GET /url/analytics/
: Fetch analytics (click data) for a specific shortened URL.

Requires a valid JWT token.
💡 Key Features in Detail
User Authentication: Users can sign up, log in, and manage their own dashboard of shortened URLs.

Local Storage Caching: To enhance performance, the app caches the shortened URLs in the browser’s local storage and avoids fetching the same data multiple times.

Analytics and Click Tracking: The app provides real-time tracking of how many times each shortened link has been clicked. Data is updated whenever the link is clicked.

🤝 Contributing
Contributions are welcome! Feel free to open issues or submit pull requests if you want to enhance or fix something.

Fork the repository.
Create a new feature branch: git checkout -b feature/my-new-feature.
Commit your changes: git commit -m 'Add some feature'.
Push to the branch: git push origin feature/my-new-feature.
Open a pull request.
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
