# ClassTrack

> A simple, single-page student attendance tracker built with vanilla JavaScript and JSON Server.

## Author

**David Muriu**
[GitHub Profile →](https://github.com/Davemuriu)

---

## Description

**ClassTrack** is a student attendance tracking web application that allows users to:

* Create and manage class sessions
* Add and update students
* Take and review attendance
* All data is handled via asynchronous requests to a custom `json-server` backend API

This project demonstrates:

* Asynchronous JavaScript (fetch API)
* Clean UI/UX using HTML/CSS/JS
* Dynamic form handling
* SPA (Single Page Application) architecture

---

## Live Links

* **Frontend on GitHub Pages:**
  [https://davemuriu.github.io/classtrack/](https://davemuriu.github.io/classtrack/)

* **Backend (json-server on Render):**
  [https://classtrack.onrender.com/](https://classtrack.onrender.com/)

---

## Project Setup Instructions

### Clone & Run Locally

1. **Clone the repo:**

```bash
git clone git@github.com:Davemuriu/classtrack.git
cd classtrack
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the JSON server:**

```bash
npm start
# or
npx json-server --watch db.json --port 3000
```

4. **Open `index.html` in your browser.**

> Alternatively, serve using Live Server (VS Code extension).

---

## Key Features

* **SPA (Single Page Application):** All content loads within a single HTML file.
* **Asynchronous Data Fetching:** Uses `fetch()` with JSON.
* **Dynamic Event Listeners:** Includes at least 3 listeners (click, submit, DOMContentLoaded).
* **Form Handling:** With clear/reset behavior after submission.
* **Validation:** Form fields include basic checks.
* **Clean Code:** DRY principles using reusable functions.

---

## Visual & UX Notes

* Minimal, mobile-responsive design.
* Clear labels for all form fields.
* Simple modal-based interfaces.
* Buttons styled with clear, readable hierarchy.
* Layout optimized for usability and clarity.

---

## Folder Structure

```
classtrack/
├── index.html        # Single HTML page (SPA)
├── main.js           # JS logic with API calls + DOM updates
├── style.css         # All UI styling
├── db.json           # Sample student/session data
├── server.js         # Optional entry point for Render deployment
├── package.json      # json-server dependency
├── README.md         # Project documentation
└── LICENSE.md        # MIT License
```

---

## License

This project is licensed under the MIT License — see the [LICENSE.md](LICENSE.md) file for details.

© 2025 David Muriu
