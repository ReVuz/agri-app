# B2B Agricultural Marketplace

This project implements a full-stack solution for the B2B Agricultural Marketplace task, structured as two separate components: a **React frontend** and a **Node.js/Express backend**.

---

## 🚀 Live Application Status

| Component | Status | URL |
| :--- | :--- | :--- |
| **Frontend (React/Vercel)** | ✅ Live | [https://b2b-agriculture.vercel.app/](https://b2b-agriculture.vercel.app/) |
| **Backend (Node/Render)** | ✅ Live | [https://agricultural-marketplace.onrender.com](https://agricultural-marketplace.onrender.com) |

---

## ✨ Features

### Frontend (React/Vite)
- Clean, responsive form interface for requirement submission
- Real-time validation and error handling
- Display of matched farmers with their details
- Success/error feedback messages
- Mobile-friendly design

### Backend (Node.js/Express)
- RESTful API endpoint for requirement processing
- Email notification simulation
- CORS-enabled for cross-origin requests
- JSON-based data exchange

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: CSS3
- **HTTP Client**: Fetch API
- **Deployment**: Vercel

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Development**: Nodemon
- **CORS**: cors middleware
- **Deployment**: Render

---

## 🚀 Local Setup Instructions

Follow these steps to set up and run the application locally.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (or Yarn/pnpm)
- Two separate terminal windows
- Code editor (VS Code recommended)

### 1. Project Structure

Ensure your local repository contains these two separate, main directories:

```
agri-app/
├── frontend/              # React/Vite App
│   ├── src/
│   │   ├── AddRequirement.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── backend/               # Node.js/Express API
    ├── server.js
    ├── farmers.js
    └── package.json
```

### 2. Backend Setup (Node.js/Express)

The backend runs on **Port 3000** locally and handles the farmer matching logic.

1. **Navigate**: Open a terminal and change directory to the `/backend` folder.
   ```bash
   cd backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Verify Dependencies**: Ensure these packages are installed:
   - express
   - cors
   - nodemon (dev dependency)

4. **Run Server**: Start the Express server.
   ```bash
   npm run devStart
   ```

5. **Verify Server**: You should see:
   ```
   Server is running on port 3000
   ```

**Important Notes:**
- The server will start listening on `http://localhost:3000`
- The simulated email notifications will appear in this terminal's console output
- Keep this terminal running throughout your testing

### 3. Frontend Setup (React/Vite)

The frontend hosts the form and sends requests to the backend.

1. **Navigate**: Open a **second terminal** and change directory to the `/frontend` folder.
   ```bash
   cd frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Update API URL (Critical for Local Testing)**:
   - Open `src/AddRequirement.jsx`
   - Ensure the backend API URL is pointing to the local backend:
     ```javascript
     const API_URL = 'http://localhost:3000';
     ```
   - For production, change this to your deployed backend URL

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

5. **Access Application**: 
   - The React app will open in your browser, typically at `http://localhost:5173`
   - Or check the terminal output for the exact local URL

---

## Core Functionality Testing

Test the application against the three required scenarios:

| Input (Product Name) | Quantity | Expected Frontend Output | Expected Backend Console Log |
| :--- | :--- | :--- | :--- |
| **Fresh Potato** | 500kg | Notified Farmers: **John Smith** | Email sent to `john.potato@farm.com` |
| **Organic Tomato** | 200kg | Notified Farmers: **Maria Garcia, David Chen** | Emails sent to `maria.tomato@farm.com` and `david.tomato@farm.com` |
| **Carrot** | 100kg | No farmers found for this product. | No notification logs |

### Testing Steps

1. **Test Case 1 - Single Farmer Match**:
   - Enter "Fresh Potato" in Product Name
   - Enter "500" in Quantity
   - Click "Submit Requirement"
   - Verify John Smith appears in the results
   - Check backend terminal for email log

2. **Test Case 2 - Multiple Farmer Match**:
   - Enter "Organic Tomato" in Product Name
   - Enter "200" in Quantity
   - Click "Submit Requirement"
   - Verify both Maria Garcia and David Chen appear
   - Check backend terminal for two email logs

3. **Test Case 3 - No Match**:
   - Enter "Carrot" in Product Name
   - Enter "100" in Quantity
   - Click "Submit Requirement"
   - Verify "No farmers found" message appears
   - Confirm no email logs in backend terminal

---

## Project Structure Details

### Backend Structure

```
backend/
├── server.js          # Main Express application
├── farmers.js 
└── package.json       # Dependencies and scripts
```

### Frontend Structure

```
frontend/
├── src/
│   ├── AddRequirement.jsx   # Main form component
│   ├── App.jsx              # Root component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/
├── package.json
└── vite.config.js
```
