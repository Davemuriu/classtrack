# ClassTrack

**ClassTrack** is a simple web-based student attendance tracking system. It allows users to manage sessions and students, mark attendance, and view records — all powered by a lightweight JSON backend.

## Live Demo

- **Frontend:** [https://davemuriu.github.io/classtrack/](https://davemuriu.github.io/classtrack/)
- **Backend (API):** [https://classtrack.onrender.com/](https://classtrack.onrender.com/)

## Features

- View and manage class sessions
- Add and delete sessions
- Add and edit student information
- Mark attendance using checkboxes
- Mobile-friendly modal interface

## Project Structure
classtrack/
├── index.html # Main frontend page
├── main.js # JavaScript logic for UI + fetch
├── style.css # Custom styling
├── db.json # Sample JSON data (used in development)
├── server.js # JSON server configuration (for backend)
├── package.json # Node dependencies and scripts
└── README.md # Project overview


## Technologies Used

- HTML5, CSS3, JavaScript (Vanilla)
- [json-server](https://github.com/typicode/json-server) for mock REST API
- [Render](https://render.com/) for backend deployment
- [GitHub Pages](https://pages.github.com/) for frontend hosting

## Setup & Development

### 1. Clone the Repository

```bash
git clone git@github.com:Davemuriu/classtrack.git
cd classtrack
npm install
node server.js
# Or just:
npx json-server --watch db.json --port 3000

Simply open index.html in your browser or use Live Server (VS Code extension).

Deployment
Frontend: Pushed to GitHub, served via GitHub Pages.

Backend: Deployed to Render using json-server.