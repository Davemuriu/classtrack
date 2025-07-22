# ClassTrack

> A simple, single-page student attendance tracker built with vanilla JavaScript and JSON Server.

## Author

**David Muriu**  
[GitHub Profile →](https://github.com/Davemuriu)

---

## Description

**ClassTrack** is a student attendance tracking web application that allows users to:

- Create and manage class sessions
- Add and update students
- Take and review attendance

All data is handled via asynchronous requests to a live backend API powered by `json-server` deployed on **Render**.

This project demonstrates:

- Asynchronous JavaScript (fetch API)
- Clean UI/UX using HTML/CSS/JS
- Dynamic form handling
- SPA (Single Page Application) architecture

---

## Live Links

- **Frontend (GitHub Pages):**  
  [https://davemuriu.github.io/classtrack/](https://davemuriu.github.io/classtrack/)

- **Backend API (Render):**  
  [https://classtrack.onrender.com/](https://classtrack.onrender.com/)

> ⚠️ Make sure `main.js` uses the correct API base URL from the deployed backend.

---

## Project Setup (Local Development)

### 1. Clone the Repo

```bash
git clone git@github.com:Davemuriu/classtrack.git
cd classtrack
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run JSON Server Locally (optional for development)

```bash
npm start
# or
npx json-server --watch db.json --port 3000
```

> You can now access the API at `http://localhost:3000/`

### 4. Open the Frontend

You can open `index.html` directly in your browser or use Live Server in VS Code.

---

## Deployment Notes

- The backend API is deployed to **Render** using `json-server` and a simple `server.js` script.
- The frontend is deployed to **GitHub Pages** from the `main` branch.

---

## Key Features

- Single Page Application (SPA)
- Fully asynchronous data fetching using `fetch`
- Dynamic DOM updates and modals
- Multiple event listeners: `click`, `submit`, `input`, etc.
- Clear UX with modals and validation
- Easily export sessions to Excel

---

## Folder Structure

```
classtrack/
├── index.html         # Main SPA page
├── main.js            # JavaScript logic (API + DOM)
├── style.css          # Custom styling
├── db.json            # Sample student/session data
├── server.js          # JSON Server entry point for Render
├── package.json       # Project metadata + json-server dependency
├── README.md          # Project documentation
└── LICENSE.md         # License
```

---

## License

This project is licensed under the MIT License — see the [LICENSE.md](LICENSE.md) file for details.

© 2025 David Muriu
