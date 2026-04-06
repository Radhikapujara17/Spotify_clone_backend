# 🎵 Spotify Clone: Node.js Backend Development Plan

This document outlines the step-by-step technical plan to build a custom backend for your Spotify clone using **Node.js**. Since you are new to Node.js, each phase includes a "Concepts Explained" section.

---

## 🛠 Project Stack
- **Runtime:** Node.js
- **Framework:** Express.js (Web server)
- **Database:** Supabase (PostgreSQL for data storage)
- **Authentication:** Supabase Auth (or JWT)
- **External API:** Spotify Web API (For retrieving songs, albums, and playlists)

---

## 🏁 Phase 1: Environment & Initial Server
**Goal:** Create a working "Hello World" server.

1.  **Initialize Project:** Run `npm init -y` to create `package.json`.
2.  **Install Express:** Run `npm install express`.
3.  **Basic Server:** Create `server.js` to listen on port 5000.
4.  **Nodemon:** Install `nodemon` so the server restarts automatically when you save code.

### 📚 Concepts Explained
- **Node.js:** A tool that lets you run JavaScript on your computer (instead of just in a browser).
- **NPM (Node Package Manager):** A library of pre-written tools. `package.json` is a list of all tools your project uses.
- **Express.js:** A "framework" that makes it easy to handle web requests (like when a user visits a URL).
- **Port:** A specific "door" on your computer (like 5000) where your server waits for visitors.

---

## 📁 Phase 2: Folder Structure & API Routes
**Goal:** Organize the project and define how the frontend talks to the backend.

1.  **Folders:** Create `routes/`, `controllers/`, and `services/`.
2.  **Routes:** Define URLs like `/api/spotify` and `/api/users`.
3.  **Controllers:** Write functions that handle the logic for those URLs (e.g., "Get playlists to return to React").

### 📚 Concepts Explained
- **REST API:** A standard way for a Frontend (React) to ask a Backend (Node) for data using URLs.
- **Routes:** The "URL paths" of your API (e.g., `/api/spotify/playlists`).
- **Controllers:** The "brains" of your routes. When a user hits a route, the controller decides what to do.
- **JSON:** The "language" used to send data back and forth. It looks like a JavaScript object.

---

## 🗄️ Phase 3: Database Integration (Supabase)
**Goal:** Store user information, saved playlists, and liked songs permanently.

1.  **Setup Supabase:** Create a free project on Supabase and get your API keys.
2.  **Supabase Client:** Install `@supabase/supabase-js` and initialize the connection in your Node app.
3.  **Tables:** Create tables for `Users` and `SavedSongs` in the Supabase Dashboard.

### 📚 Concepts Explained
- **Supabase:** An open-source Firebase alternative based on PostgreSQL. It gives you a database, authentication, and API out of the box.
- **PostgreSQL:** A powerful, open-source relational database used by Supabase.
- **Client library:** The `@supabase/supabase-js` library helps your Node backend talk to your Supabase project securely.

---

## 🔐 Phase 4: User Authentication
**Goal:** Allow users to Sign Up and Log In securely.

1.  **Supabase Auth:** Use Supabase's built-in authentication for email/password or OAuth (like Google login).
2.  **Protect Routes:** Verify the user's Supabase access token in your backend before returning private data.
3.  **User Profiles:** Store additional user data securely in your Supabase tables linked to the Auth UUID.

### 📚 Concepts Explained
- **Supabase Auth:** Handles all the hard parts of logging users in, and issuing secure tokens without needing custom bcrypt/JWT management.
- **Access Token:** A secure "pass" given to the user after login. They send this pass with every request so the server knows who they are.

---

## 🎶 Phase 5: Spotify Web API Integration
**Goal:** Fetch real music data (songs, playlists, search results) from Spotify.

1.  **Spotify App:** Register an app on the Spotify Developer Dashboard to get your `client_id` and `client_secret`.
2.  **Access Token:** Create a backend route to request an access token from Spotify using the Client Credentials flow.
3.  **Fetch Data:** Write service functions to call Spotify API endpoints (e.g., `https://api.spotify.com/v1/browse/new-releases`).
4.  **Send to Frontend:** Your Node backend will fetch the data from Spotify and send it to your React app.

### 📚 Concepts Explained
- **Spotify Web API:** A public service provided by Spotify that lets developers access their catalog of music.
- **OAuth 2.0 / Client Credentials Flow:** A secure way for your backend server to prove to Spotify who it is, so it gets permission to fetch data.
- **Service Functions:** Dedicated files in your backend specifically for talking to external APIs like Spotify.

---

## 🚀 Phase 6: Connecting to React
**Goal:** Make the Frontend talk to your new Backend.

1.  **CORS:** Enable "Cross-Origin Resource Sharing" so your React app is allowed to talk to your Node server.
2.  **Fetch/Axios:** Use these in React to call your Node.js API routes, which will intern call Spotify or Supabase.

### 📚 Concepts Explained
- **CORS:** A security feature. By default, browsers block websites from talking to servers they don't "own." You must tell Node.js to "allow" your React app's address.
- **Axios:** A popular tool for making requests from React to your backend.

---

## 🛠 Next Steps
1. Create the project folder.
2. Initialize NPM.
3. Install Express & connected packages (`cors`, `dotenv`).
4. Set up Supabase and Spotify Developer applications to get your API keys!
