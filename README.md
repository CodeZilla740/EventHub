# EventHub 🎉

EventHub is a web-based event management platform that allows users to discover, register, and manage events efficiently. Organizers can create and manage events, while users can browse and register for upcoming events.

## Features

* User authentication using JWT
* Role-based access (User and Organizer)
* Create and manage events
* Event registration system
* Upload event images
* View event details
* Responsive UI

## Tech Stack

**Frontend**

* React.js
* HTML5
* CSS3
* JavaScript

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB

**Other Tools**

* JWT Authentication
* Multer for file uploads

## Installation

1. Clone the repository

```
git clone https://github.com/yourusername/EventHub.git
```

2. Navigate to the project folder

```
cd EventHub
```

3. Install dependencies

```
npm install
```

4. Create a `.env` file in the root directory and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

5. Run the application

```
npm start
```

## Project Structure

```
EventHub
│
├── controllers
├── models
├── routes
├── uploads
├── node_modules
├── .env
├── package.json
└── server.js
```

## Usage

* Users can browse available events.
* Organizers can create new events.
* Users can register for events.
* Admin/Organizer can manage event details.

## Future Improvements

* Event search and filters
* Payment integration for paid events
* Email notifications for registrations
* Admin dashboard analytics

## Author

Anu

## License

This project is for educational purposes.
