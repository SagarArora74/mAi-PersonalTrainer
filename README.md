# mAI-PersonalTrainer

mAI-PersonalTrainer is a full-stack AI-powered personal training platform that provides personalized workout and nutrition recommendations based on user profiles, fitness goals, body metrics, activity levels, and preferences.

## Live Application

**Live Demo:**  
https://mai-personal-trainer-3siy5olch-potatoes3.vercel.app

**Backend API:**  
https://mai-personaltrainer-api.onrender.com

---

## Overview

The application allows users to create and manage their fitness profiles and receive personalized workout and nutrition plans. It combines a React.js frontend with a Node.js and Express.js backend, MongoDB for persistent data storage, and Google Gemini for AI-powered plan generation.

The platform is designed to provide users with structured fitness recommendations through a personalized dashboard.

---

## Key Features

- User registration and login
- JWT-based authentication and authorization
- Secure password hashing using bcrypt
- User profile creation and management
- Personalized workout plan generation
- Interactive weekly workout calendar
- Exercise-specific sets, repetitions, rest periods, duration, and intensity
- Personalized nutrition and diet plans
- Daily calorie and protein targets
- BMR and TDEE information
- AI-powered workout and nutrition recommendations using Google Gemini
- Workout guidelines and fitness recommendations
- AI plan regeneration
- User-specific data management
- Responsive user interface
- Cloud deployment of the complete application

---

## Technology Stack

### Frontend

- React.js
- Vite
- JavaScript
- CSS
- Fetch API

### Backend

- Node.js
- Express.js
- RESTful APIs
- JSON Web Token (JWT)
- bcrypt
- CORS

### Database

- MongoDB
- MongoDB Atlas
- Mongoose

### Artificial Intelligence

- Google Gemini API

### Deployment

- Vercel - Frontend
- Render - Backend
- MongoDB Atlas - Database

---

## System Architecture

```text
                    ┌─────────────────────┐
                    │        User         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       Vercel        │
                    │   React + Vite      │
                    │      Frontend       │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               ▼
                    ┌─────────────────────┐
                    │       Render        │
                    │  Node.js + Express  │
                    │       Backend       │
                    └──────────┬──────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
                    ▼                     ▼
          ┌──────────────────┐   ┌──────────────────┐
          │   MongoDB Atlas  │   │   Google Gemini  │
          │     Database     │   │       AI         │
          └──────────────────┘   └──────────────────┘
```

---

## Application Workflow

1. The user registers an account.
2. The user logs in using their credentials.
3. The user creates a fitness profile containing personal and fitness information.
4. The backend securely stores the profile data in MongoDB.
5. User profile information is used to generate personalized fitness recommendations.
6. Google Gemini generates personalized workout and nutrition plans based on the user's requirements.
7. The generated plans are stored and made available through the user's dashboard.
8. Users can view their weekly workout schedule, nutrition targets, exercises, and workout guidelines.

---

## REST API

The backend provides RESTful API endpoints for authentication, profile management, workout plans, nutrition plans, and AI-powered plan generation.

| Endpoint | Purpose |
|----------|---------|
| `/api/auth` | User registration and authentication |
| `/api/profile` | User profile management |
| `/api/diet` | Nutrition and diet plan management |
| `/api/workout` | Workout plan management |
| `/api/ai-plan` | AI-powered workout and nutrition plan generation |

---

## Authentication and Security

The application implements authentication and authorization using JSON Web Tokens (JWT).

Security measures include:

- JWT-based authentication
- Protected API routes
- Password hashing using bcrypt
- User-specific data access
- Environment variables for sensitive credentials
- CORS configuration for frontend-backend communication

---

## Project Structure

```text
mAi-PersonalTrainer/
│
├── client/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── server/
│   ├── config/
│   ├── routes/
│   ├── models/
│   ├── server.js
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

---

## Local Development

### Prerequisites

Before running the application locally, ensure the following are installed or available:

- Node.js
- npm
- MongoDB Atlas account
- Google Gemini API key

### Clone the Repository

```bash
git clone https://github.com/SagarArora74/mAi-PersonalTrainer.git
cd mAi-PersonalTrainer
```

---

### Frontend Setup

Navigate to the frontend directory:

```bash
cd client
npm install
```

Create a `.env` file inside the `client` directory:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

---

### Backend Setup

Open a new terminal and navigate to the backend directory:

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Start the backend server:

```bash
npm start
```

The backend will run at:

```text
http://localhost:5000
```

---

## Environment Variables

Sensitive credentials should never be committed to the repository.

### Frontend

Create `client/.env`:

```env
VITE_API_URL=your_backend_url
```

### Backend

Create `server/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Ensure that `.env` files are included in `.gitignore`.

---

## Deployment

The application is deployed using the following cloud services:

| Component | Platform |
|-----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |

The React frontend communicates with the deployed Express.js backend through RESTful APIs.

The backend handles authentication, user profile management, workout and nutrition data, and communication with the Google Gemini API for AI-powered plan generation.

---

## Future Improvements

Potential future enhancements include:

- Fitness progress visualization
- Workout history and analytics
- Integration with wearable fitness devices
- Exercise demonstration videos
- Advanced nutrition tracking
- Progress-based workout plan adjustments
- Additional AI-powered fitness insights

---

## Author

**Sagar Arora**

GitHub:  
https://github.com/SagarArora74

---

## License

This project is developed for educational and portfolio purposes.
