const events = [];

// Redirect to pages based on user type
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const userType = document.querySelector("#user-type").value;
            if (userType === "admin") {
                window.location.href = "admin.html";
            } else {
                window.location.href = "event-list.html";
            }
        });
    }

    // Handle Add Event in Admin Panel
    const addEventForm = document.querySelector("#add-event-form");
    if (addEventForm) {
        addEventForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.querySelector("#event-name").value;
            const date = document.querySelector("#event-date").value;
            const location = document.querySelector("#event-location").value;
            const description = document.querySelector("#event-description").value;

            const event = { name, date, location, description };
            events.push(event);
            showAlert("Event added successfully!");
            displayEvents();
            addEventForm.reset();
        });
    }
});

// Display events (Admin Panel)
const displayEvents = () => {
    const adminEventList = document.querySelector(".admin-events");
    if (adminEventList) {
        adminEventList.innerHTML = "";
        events.forEach((event, index) => {
            const eventCard = document.createElement("div");
            eventCard.classList.add("event-card");
            eventCard.innerHTML = `
                <h3>${event.name}</h3>
                <p><strong>Date:</strong> ${event.date}</p>
                <p><strong>Location:</strong> ${event.location}</p>
                <p>${event.description}</p>
                <button onclick="deleteEvent(${index})" class="btn">Delete</button>
            `;
            adminEventList.appendChild(eventCard);
        });
    }
};

// Delete event
const deleteEvent = (index) => {
    events.splice(index, 1);
    displayEvents();
};

// Show alert
const showAlert = (message) => {
    alert(message);
};

// Sample Data
const userData = {
    name: "John Doe",
    email: "johndoe@example.com",
    registeredEvents: [
        { name: "Hackathon 2024", date: "2024-12-10", location: "Auditorium" },
        { name: "Tech Fest", date: "2024-12-20", location: "Convention Hall" },
    ],
    favoriteEvents: [
        { name: "Sports Meet", date: "2024-12-15", location: "Sports Ground" },
    ],
};

// Populate User Info
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("user-name").innerText = userData.name;
    document.getElementById("user-email").innerText = userData.email;

    // Populate Registered Events
    populateEvents("registered-events", userData.registeredEvents);

    // Populate Favorite Events
    populateEvents("favorite-events", userData.favoriteEvents);
});

// Populate Events Function
const populateEvents = (containerId, events) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (events.length === 0) {
        container.innerHTML = "<p>No events to display.</p>";
        return;
    }

    events.forEach((event) => {
        const card = document.createElement("div");
        card.classList.add("event-card");
        card.innerHTML = `
            <h4>${event.name}</h4>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <button class="btn">View Details</button>
        `;
        container.appendChild(card);
    });
};
document.addEventListener("DOMContentLoaded", () => {
    const eventForm = document.getElementById("event-form");
    const eventList = document.getElementById("event-list");

    let events = [];

    // Function to render events
    const renderEvents = () => {
        eventList.innerHTML = "";

        if (events.length === 0) {
            eventList.innerHTML = "<p>No events added yet.</p>";
            return;
        }

        events.forEach((event, index) => {
            const eventCard = document.createElement("div");
            eventCard.classList.add("event-card");
            eventCard.innerHTML = `
                <h4>${event.name}</h4>
                <p><strong>Date:</strong> ${event.date}</p>
                <p><strong>Location:</strong> ${event.location}</p>
                <p>${event.description}</p>
                <div class="actions">
                    <button class="btn edit-btn" data-index="${index}">Edit</button>
                    <button class="btn delete-btn" data-index="${index}">Delete</button>
                </div>
            `;
            eventList.appendChild(eventCard);
        });
    };

    // Add event handler
    eventForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("event-name").value;
        const date = document.getElementById("event-date").value;
        const location = document.getElementById("event-location").value;
        const description = document.getElementById("event-description").value;

        events.push({ name, date, location, description });
        renderEvents();

        // Reset form
        eventForm.reset();
    });

    // Delete or edit events
    eventList.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        if (e.target.classList.contains("delete-btn")) {
            events.splice(index, 1);
            renderEvents();
        } else if (e.target.classList.contains("edit-btn")) {
            const event = events[index];
            document.getElementById("event-name").value = event.name;
            document.getElementById("event-date").value = event.date;
            document.getElementById("event-location").value = event.location;
            document.getElementById("event-description").value = event.description;

            // Remove the event being edited
            events.splice(index, 1);
            renderEvents();
        }
    });

    renderEvents();
});

