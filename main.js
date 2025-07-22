const STUDENTS_URL = 'https://classtrack.onrender.com/students';
const SESSIONS_URL = 'https://classtrack.onrender.com/sessions';

let students = [];
let sessions = [];

function openModal(id) {
  document.getElementById(id).style.display = "block";
}
function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

function updateStats() {
  document.getElementById("total-students").innerText = students.length;
  document.getElementById("total-sessions").innerText = sessions.length;
  const totalPresent = sessions.reduce((sum, s) => sum + s.presentIds.length, 0);
  const totalPossible = sessions.length * students.length;
  const rate = totalPossible ? Math.round((totalPresent / totalPossible) * 100) : 0;
  document.getElementById("avg-attendance").innerText = rate + "%";
}

function renderStudentList() {
  const container = document.getElementById("student-list");
  container.innerHTML = "";
  students.forEach(s => {
    const div = document.createElement("div");
    div.className = "student-card";
    div.innerHTML = `
      <strong>${s.name}</strong> (${s.regNo})
      <button class="btn btn-sm btn-danger delete-student" data-id="${s.id}">X</button>`;
    container.appendChild(div);
  });
}

function renderAttendanceList(containerId, nameAttr, presentIds = []) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  students.forEach(s => {
    const checked = presentIds.includes(s.id) ? "checked" : "";
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="checkbox" name="${nameAttr}" value="${s.id}" ${checked}>
      ${s.name} (${s.regNo})`;
    container.appendChild(label);
    container.appendChild(document.createElement("br"));
  });
}

function renderSessions() {
  const container = document.getElementById("sessions-list");
  container.innerHTML = "";
  sessions.forEach(s => {
    const presentNames = s.presentIds.map(id => {
      const student = students.find(st => st.id === id);
      return student ? `${student.name} (${student.regNo})` : `[Unknown ID: ${id}]`;
    }).join(", ");
    const div = document.createElement("div");
    div.innerHTML = `
      <h4>${s.name}</h4>
      <p><strong>Date:</strong> ${s.date} <strong>Time:</strong> ${s.time}</p>
      <p><strong>Present:</strong> ${presentNames}</p>
      <button class="btn btn-sm btn-primary edit-session" data-id="${s.id}">Edit</button>
      <button class="btn btn-sm btn-danger delete-session" data-id="${s.id}">Delete</button>
      <hr>`;
    container.appendChild(div);
  });
}

// Initialize app
function initializeApp() {
  fetch(STUDENTS_URL)
    .then(r => r.json())
    .then(data => {
      students = data;
      renderStudentList();
      renderAttendanceList("attendance-student-list", "present");
      updateStats();
    })
    .then(() => fetch(SESSIONS_URL))
    .then(r => r.json())
    .then(data => {
      sessions = data;
      renderSessions();
      updateStats();
    })
    .then(() => setupEvents());
}

function setupEvents() {
  const studentNameInput = document.getElementById("student-name");
  const studentRegInput = document.getElementById("student-reg");
  const studentForm = document.getElementById("student-form");
  const attendanceForm = document.getElementById("attendance-form");

  // Input validation: real-time
  studentNameInput.addEventListener("input", () => {
    if (!studentNameInput.value.trim()) {
      studentNameInput.style.borderColor = "red";
    } else {
      studentNameInput.style.borderColor = "";
    }
  });

  studentRegInput.addEventListener("input", () => {
    if (!studentRegInput.value.trim()) {
      studentRegInput.style.borderColor = "red";
    } else {
      studentRegInput.style.borderColor = "";
    }
  });

  // Submit student
  studentForm.onsubmit = e => {
    e.preventDefault();
    const name = studentNameInput.value.trim();
    const regNo = studentRegInput.value.trim();
    if (!name || !regNo) return alert("All fields are required.");

    fetch(STUDENTS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, regNo })
    })
      .then(res => res.json())
      .then(newStudent => {
        students.push(newStudent);
        renderStudentList();
        renderAttendanceList("attendance-student-list", "present");
        updateStats();
        closeModal("student-modal");
        studentForm.reset();
      });
  };

  // Delete student with confirm
  document.getElementById("student-list").addEventListener("click", e => {
    if (e.target.classList.contains("delete-student")) {
      const id = e.target.dataset.id;
      if (confirm("Are you sure you want to delete this student?")) {
        fetch(`${STUDENTS_URL}/${id}`, { method: "DELETE" }).then(() => {
          students = students.filter(s => s.id != id);
          renderStudentList();
          renderAttendanceList("attendance-student-list", "present");
          updateStats();
        });
      }
    }
  });

  // Submit session
  attendanceForm.onsubmit = e => {
    e.preventDefault();
    const name = document.getElementById("session-name").value.trim();
    const presentIds = Array.from(document.querySelectorAll("input[name='present']:checked")).map(cb => +cb.value);
    const now = new Date();
    const session = {
      name,
      date: now.toISOString().split("T")[0],
      time: now.toTimeString().split(" ")[0],
      presentIds
    };

    fetch(SESSIONS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(session)
    })
      .then(r => r.json())
      .then(newSession => {
        sessions.push(newSession);
        renderSessions();
        updateStats();
        closeModal("attendance-modal");
        attendanceForm.reset();
      });
  };

  // Delete or Edit session
  document.getElementById("sessions-list").addEventListener("click", e => {
    const id = parseInt(e.target.dataset.id);
    if (!id) return;

    if (e.target.classList.contains("delete-session")) {
      if (confirm("Are you sure you want to delete this session?")) {
        fetch(`${SESSIONS_URL}/${id}`, { method: "DELETE" }).then(() => {
          sessions = sessions.filter(s => s.id !== id);
          renderSessions();
          updateStats();
        });
      }
    } else if (e.target.classList.contains("edit-session")) {
      const session = sessions.find(s => s.id === id);
      if (session) {
        document.getElementById("edit-session-id").value = session.id;
        document.getElementById("edit-session-name").value = session.name;
        document.getElementById("edit-session-date").value = session.date;
        document.getElementById("edit-session-time").value = session.time;
        renderAttendanceList("edit-attendance-list", "edit-present", session.presentIds);
        openModal("edit-session-modal");
      }
    }
  });

  // Update session
  document.getElementById("update-session").onclick = () => {
    const id = +document.getElementById("edit-session-id").value;
    const name = document.getElementById("edit-session-name").value.trim();
    const date = document.getElementById("edit-session-date").value;
    const time = document.getElementById("edit-session-time").value;
    const presentIds = Array.from(document.querySelectorAll("input[name='edit-present']:checked")).map(cb => +cb.value);

    if (!name || !date || !time) return alert("All fields required");

    const updatedSession = { id, name, date, time, presentIds };
    fetch(`${SESSIONS_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedSession)
    }).then(r => r.json()).then(updated => {
      const index = sessions.findIndex(s => s.id === updated.id);
      sessions[index] = updated;
      renderSessions();
      updateStats();
      closeModal("edit-session-modal");
    });
  };

  // Modal triggers
  document.getElementById("add-student-btn").onclick = () => openModal("student-modal");
  document.getElementById("take-attendance-btn").onclick = () => openModal("attendance-modal");
  document.getElementById("view-sessions-btn").onclick = () => {
    renderSessions();
    openModal("sessions-modal");
  };

  // Modal closers
  document.getElementById("close-student-modal").onclick = () => closeModal("student-modal");
  document.getElementById("close-attendance-modal").onclick = () => closeModal("attendance-modal");
  document.getElementById("close-sessions-modal").onclick = () => closeModal("sessions-modal");
  document.getElementById("close-edit-session-modal").onclick = () => closeModal("edit-session-modal");
}

initializeApp();
