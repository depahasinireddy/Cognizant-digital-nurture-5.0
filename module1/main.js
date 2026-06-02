// main.js - Community Event Portal
// Human-friendly, educational JavaScript demonstrating many core features

/* 1. Basic load handlers */
console.log('Welcome to the Community Portal — JavaScript is running.');

window.addEventListener('load', () => {
    alert('Page fully loaded. Welcome to the Community Portal!');
});

/* 2. Event model using a class (objects & prototypes) */
class Event {
    constructor(name, dateISO, seats, category = 'General', location = 'TBD', description = '') {
        this.name = name; // const-like: property that shouldn't be reassigned
        this.date = dateISO; // ISO date string
        this.seats = seats; // we will treat this as a mutable value (let in logic)
        this.category = category;
        this.location = location;
        this.description = description;
    }

    // Method lives on the prototype automatically when using class syntax
    checkAvailability() {
        const now = new Date();
        const eventDate = new Date(this.date);
        return eventDate >= now && this.seats > 0;
    }
}

/* 3. In-memory events list (arrays & methods) */
let events = [];

// Helper to create example events (some past, some future)
function seedEvents() {
    const today = Date.now();
    // Use const for name/date values and let for seats when mutated
    const sample = [
        new Event('Open Air movie nights', new Date(today + 7 * 86400000).toISOString().slice(0, 10), 50, 'Entertainment', 'Park', 'A community initiative to promote environment.'),
        new Event('Food Carnival', new Date(today + 3 * 86400000).toISOString().slice(0, 10), 20, 'food stalls', 'Community Hall', 'Experience the best local cusine.'),
        new Event('Community Clean up', new Date(today - 2 * 86400000).toISOString().slice(0, 10), 0, 'grow green', 'Center', 'Past clean-up event.'),
        new Event('Talent shows & Open Mics', new Date(today + 14 * 86400000).toISOString().slice(0, 10), 30, 'Cultural Fest', 'Park', 'Casual community soccer.'),
        new Event('Society Tournaments', new Date(today + 1 * 86400000).toISOString().slice(0, 10), 5, 'Sports', 'Community Hall', 'Showcase local talent.')
    ];

    // add using push()
    sample.forEach(s => events.push(s));
}

seedEvents();

/* 4. Closure to track registrations by category */
function makeCategoryTracker() {
    const counts = {};
    return function(category) {
        counts[category] = (counts[category] || 0) + 1;
        return counts[category];
    };
}

const incrementCategoryRegistration = makeCategoryTracker();

/* 5. Add, filter, and utility functions (higher-order functions) */
function addEvent(name, dateISO, seats, category, location, description) {
    const evt = new Event(name, dateISO, seats, category, location, description);
    events.push(evt);
    renderEvents(events);
}

function filterEventsByCategory(callback) {
    return events.filter(callback);
}

/* 6. Mock async API (Promises & async/await) */
function mockFetchEvents() {
    // return a promise resolved after a small delay to simulate fetching
    return new Promise((resolve) => {
        setTimeout(() => resolve([...events]), 700); // spread to clone list
    });
}

function mockPostRegistration(payload) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.85) {
                resolve({ success: true, id: Date.now() });
            } else {
                reject(new Error('Network error: failed to register'));
            }
        }, 700);
    });
}

/* 7. DOM helpers and rendering (DOM manipulation) */
const eventListEl = document.querySelector('#eventList');
const spinnerEl = document.querySelector('#spinner');
const searchInput = document.querySelector('#searchInput');
const categorySelect = document.querySelector('#categoryFilter');
const locationSelect = document.querySelector('#locationFilter');

function showSpinner(show = true) {
    if (!spinnerEl) return;
    if (show) {
        spinnerEl.classList.remove('removed');
        spinnerEl.classList.add('text-center');
    } else {
        spinnerEl.classList.add('removed');
    }
}

function clearChildren(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
}

function renderEvents(list) {
    if (!eventListEl) return;
    clearChildren(eventListEl);

    // Loop through events and only render upcoming events with seats
    list.forEach((evt, idx) => {
        // Use if-else to hide past or full events
        if (!evt.checkAvailability()) {
            // Skip rendering past or full events
            return;
        }

        const card = document.createElement('div');
        card.className = 'eventCard event-item';

        // Destructure event details (modern JS)
        const { name, date, seats, category, location, description } = evt;

        const title = document.createElement('h3');
        title.textContent = `${name} — ${category}`;

        const meta = document.createElement('p');
        meta.textContent = `When: ${date} | Where: ${location} | Seats: ${seats}`;

        const desc = document.createElement('p');
        desc.textContent = description;

        const regs = document.createElement('p');
        regs.textContent = `Available seats: ${seats}`;

        const btn = document.createElement('button');
        btn.className = 'cta-button registerBtn';
        btn.textContent = 'Register';
        btn.dataset.index = idx;
        btn.addEventListener('click', () => handleRegister(idx));

        card.appendChild(title);
        card.appendChild(meta);
        card.appendChild(desc);
        card.appendChild(regs);
        card.appendChild(btn);

        // show object entries in console (Objects & utilities)
        console.log('Event details:', Object.entries(evt));

        eventListEl.appendChild(card);
    });
}

/* 8. Registration logic with try-catch and seat management */
async function handleRegister(index) {
    try {
        const evt = events[index];
        if (!evt) throw new Error('Event not found');

        // Use let for seats because we'll modify it
        let seatsLeft = evt.seats;

        if (new Date(evt.date) < new Date()) {
            alert('This event has already passed.');
            return;
        }

        if (seatsLeft <= 0) {
            alert('Sorry, this event is full.');
            return;
        }

        // Simulate sending registration to server
        showSpinner(true);
        const payload = { eventName: evt.name, timestamp: Date.now() };
        const res = await mockPostRegistration(payload);

        if (res && res.success) {
            // decrement seat count using -- operator
            evt.seats = --seatsLeft;
            incrementCategoryRegistration(evt.category);
            alert(`Registered for ${evt.name}. Seats remaining: ${evt.seats}`);
            renderEvents(events);
        }
    } catch (err) {
        console.error('Registration failed:', err);
        alert('Registration failed: ' + err.message);
    } finally {
        showSpinner(false);
    }
}

/* 9. Async loader to fetch and render events */
async function loadAndRenderEvents() {
    try {
        showSpinner(true);
        const fetched = await mockFetchEvents();
        // Clone list before filtering using spread operator
        const cloned = [...fetched];
        renderEvents(cloned);
    } catch (err) {
        console.error('Failed to load events', err);
    } finally {
        showSpinner(false);
    }
}

/* 10. UI event hookups: filters, search, keydown */
if (categorySelect) {
    categorySelect.addEventListener('change', () => {
        const cat = categorySelect.value;
        const filtered = cat ? filterEventsByCategory(e => e.category === cat) : events;
        renderEvents(filtered);
    });
}

if (locationSelect) {
    locationSelect.addEventListener('change', () => {
        const loc = locationSelect.value;
        const filtered = loc ? events.filter(e => e.location.includes(loc)) : events;
        renderEvents(filtered);
    });
}

if (searchInput) {
    searchInput.addEventListener('keydown', (ev) => {
        // quick search on enter
        if (ev.key === 'Enter') {
            const q = searchInput.value.trim().toLowerCase();
            const filtered = events.filter(e => e.name.toLowerCase().includes(q));
            renderEvents(filtered);
        }
    });
}

/* 11. Form handling (preventDefault, validation) */
const form = document.querySelector('#eventForm');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        // Capture inputs
        const name = document.querySelector('#name').value.trim();
        const email = document.querySelector('#email').value.trim();
        const selected = document.querySelector('#eventType').value;

        // Simple validation
        if (!name || !email || !selected) {
            const msg = document.querySelector('#successMessage');
            if (msg) msg.textContent = 'Please fill name, email and choose an event.';
            return;
        }

        // Simulate sending registration
        try {
            showSpinner(true);
            const response = await mockPostRegistration({ name, email, selected });
            if (response.success) {
                document.querySelector('#successMessage').textContent = 'Registration successful — thank you!';
            }
        } catch (err) {
            console.error(err);
            document.querySelector('#successMessage').textContent = 'Failed to submit — try again later.';
        } finally {
            showSpinner(false);
        }
    });
}

/* 12. Small helper functions to keep legacy inline handlers working */
function zoomImage(img) {
    img.style.transform = 'scale(1.08)';
    setTimeout(() => img.style.transform = '', 700);
}

function validatePhone() {
    const phone = document.querySelector('#phone').value || '';
    if (!/^\d{10}$/.test(phone)) {
        alert('Phone number should be 10 digits.');
    }
}

function showFee(val) {
    const fee = document.querySelector('#fee');
    if (fee) fee.textContent = val ? `Fee: ₹${val}` : '';
}

function countCharacters() {
    const txt = document.querySelector('#feedback').value || '';
    document.querySelector('#charCount').textContent = txt.length;
}

function videoReady() {
    console.log('Video can play.');
}

function findLocation() {
    const locEl = document.querySelector('#location');
    if (!navigator.geolocation) {
        locEl.textContent = 'Geolocation not available in this browser.';
        return;
    }
    navigator.geolocation.getCurrentPosition((pos) => {
        locEl.textContent = `Lat: ${pos.coords.latitude.toFixed(3)}, Lon: ${pos.coords.longitude.toFixed(3)}`;
    }, () => locEl.textContent = 'Unable to get location.');
}

function confirmRegistration() {
    // used by inline onclick — keep it minimal
    console.log('Confirming registration (form submit handled by JS).');
}

function savePreference() {
    const pref = document.querySelector('#eventType').value;
    localStorage.setItem('preferredEvent', pref);
    alert('Preference saved.');
}

function clearPreferences() {
    localStorage.removeItem('preferredEvent');
    alert('Preferences cleared.');
}

/* 13. jQuery demo and graceful fallback */
if (window.jQuery) {
    // Use delegated handler for register buttons
    $(document).on('click', '.registerBtn', function () {
        const idx = $(this).data('index');
        // Trigger the same registration logic
        handleRegister(idx);
    });

    // Example required by the task: $('#registerBtn').click(...)
    $('#registerBtn').click(function (e) {
        e.preventDefault();
        $('#successMessage').text('jQuery handled the click — demo only').fadeIn(200).delay(800).fadeOut(600);
    });

    $('#jqDemoBtn').click(() => $('.eventCard').fadeOut(250).fadeIn(500));
} else {
    console.warn('jQuery not detected; demos will be skipped.');
}

/* 14. Kick things off */
loadAndRenderEvents();

// Export some helpers for debugging in the console
window.__community = { events, addEvent, filterEventsByCategory, makeCategoryTracker };
