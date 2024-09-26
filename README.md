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
