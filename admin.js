// Check admin authentication
document.addEventListener('DOMContentLoaded', function() {
    // Check if admin is logged in
    if (!localStorage.getItem('adminLoggedIn')) {
        window.location.href = 'admin-login.html';
        return;
    }
    
    // Initialize dashboard
    loadAllData();
    refreshDatabaseView();
    setupLiveUpdates();
});

// Logout function
function logoutAdmin() {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = 'admin-login.html';
}

// Load all data
function loadAllData() {
    loadDietitians();
    loadDoctors();
    loadClients();
}

// Load dietitians
function loadDietitians() {
    const dietitians = Database.getDietitians();
    const container = document.getElementById('dietitiansList');
    container.innerHTML = dietitians.map(dietitian => `
        <div class="data-card">
            <div class="verification-badge ${dietitian.verified ? 'verified' : 'unverified'}">
                <i class="fas ${dietitian.verified ? 'fa-check-circle' : 'fa-clock'}"></i>
                ${dietitian.verified ? 'Verified' : 'Pending Verification'}
            </div>
            <h3>${dietitian.name}</h3>
            <p><i class="fas fa-graduation-cap"></i> ${dietitian.qualification || 'N/A'}</p>
            <p><i class="fas fa-stethoscope"></i> ${dietitian.specialty}</p>
            <p><i class="fas fa-clock"></i> Experience: ${dietitian.experience}</p>
            <p><i class="fas fa-star"></i> Rating: ${dietitian.rating}</p>
            <div class="action-buttons">
                <button class="edit-btn" onclick="editDietitian(${dietitian.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="delete-btn" onclick="deleteDietitian(${dietitian.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

// Load doctors
function loadDoctors() {
    const doctors = Database.getDoctors();
    const container = document.getElementById('doctorsList');
    container.innerHTML = doctors.map(doctor => `
        <div class="data-card">
            <h3>${doctor.name}</h3>
            <p><i class="fas fa-graduation-cap"></i> ${doctor.qualification}</p>
            <p><i class="fas fa-hospital"></i> ${doctor.hospital}</p>
            <p><i class="fas fa-clock"></i> Experience: ${doctor.experience}</p>
            <p><i class="fas fa-star"></i> Rating: ${doctor.rating}</p>
            <div class="action-buttons">
                <button class="edit-btn" onclick="editDoctor(${doctor.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="delete-btn" onclick="deleteDoctor(${doctor.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

// Load clients
function loadClients() {
    const clients = Database.getClients();
    const container = document.getElementById('clientsList');
    container.innerHTML = clients.map(client => `
        <div class="data-card">
            <h3>${client.name}</h3>
            <p><i class="fas fa-user"></i> Age: ${client.age}</p>
            <p><i class="fas fa-venus-mars"></i> Gender: ${client.gender}</p>
            <p><i class="fas fa-weight"></i> BMI: ${calculateBMI(client.weight, client.height).toFixed(1)}</p>
            <p><i class="fas fa-bullseye"></i> Goal: ${client.goal}</p>
            <div class="action-buttons">
                <button class="edit-btn" onclick="editClient(${client.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="delete-btn" onclick="deleteClient(${client.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

// Show section
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.data-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Update nav buttons
    document.querySelectorAll('.nav-links button').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`button[onclick="showSection('${sectionId}')"]`).classList.add('active');
}

// Database view functions
function refreshDatabaseView() {
    updateDatabaseStats();
    updateDatabaseContent();
}

function updateDatabaseStats() {
    const dietitians = Database.getDietitians();
    const doctors = Database.getDoctors();
    const clients = Database.getClients();

    document.getElementById('dietitianCount').textContent = dietitians.length || 0;
    document.getElementById('doctorCount').textContent = doctors.length || 0;
    document.getElementById('clientCount').textContent = clients.length || 0;
}

function updateDatabaseContent() {
    const dataType = document.getElementById('dataTypeSelect').value;
    let content = {};

    if (dataType === 'all' || dataType === 'dietitians') {
        content.dietitians = Database.getDietitians();
    }
    if (dataType === 'all' || dataType === 'doctors') {
        content.doctors = Database.getDoctors();
    }
    if (dataType === 'all' || dataType === 'clients') {
        content.clients = Database.getClients();
    }

    document.getElementById('databaseContent').textContent = 
        JSON.stringify(content, null, 2);
}

// Export data
function exportData() {
    const dataType = document.getElementById('dataTypeSelect').value;
    let exportContent = {};

    if (dataType === 'all' || dataType === 'dietitians') {
        exportContent.dietitians = Database.getDietitians();
    }
    if (dataType === 'all' || dataType === 'doctors') {
        exportContent.doctors = Database.getDoctors();
    }
    if (dataType === 'all' || dataType === 'clients') {
        exportContent.clients = Database.getClients();
    }

    const blob = new Blob(
        [JSON.stringify(exportContent, null, 2)], 
        { type: 'application/json' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `database_export_${dataType}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Add event listeners
document.getElementById('dataTypeSelect').addEventListener('change', updateDatabaseContent);

// Initialize database view
document.addEventListener('DOMContentLoaded', function() {
    refreshDatabaseView();
});

// Calculate BMI function (needed for client display)
function calculateBMI(weight, height) {
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
}

// Setup live updates
function setupLiveUpdates() {
    // Listen for dietitian changes
    Database.addListener('dietitians', () => {
        loadDietitians();
        updateDatabaseStats();
        updateDatabaseContent();
    });

    // Listen for doctor changes
    Database.addListener('doctors', () => {
        loadDoctors();
        updateDatabaseStats();
        updateDatabaseContent();
    });

    // Listen for client changes
    Database.addListener('clients', () => {
        loadClients();
        updateDatabaseStats();
        updateDatabaseContent();
    });
}

// Add delete functions
function deleteDietitian(id) {
    if (confirm('Are you sure you want to delete this dietitian?')) {
        let dietitians = Database.getDietitians();
        dietitians = dietitians.filter(d => d.id !== id);
        localStorage.setItem('dietitians', JSON.stringify(dietitians));
        Database.notifyListeners('dietitians');
    }
}

function deleteDoctor(id) {
    if (confirm('Are you sure you want to delete this doctor?')) {
        let doctors = Database.getDoctors();
        doctors = doctors.filter(d => d.id !== id);
        localStorage.setItem('doctors', JSON.stringify(doctors));
        Database.notifyListeners('doctors');
    }
}

function deleteClient(id) {
    if (confirm('Are you sure you want to delete this client?')) {
        let clients = Database.getClients();
        clients = clients.filter(c => c.id !== id);
        localStorage.setItem('clients', JSON.stringify(clients));
        Database.notifyListeners('clients');
    }
}

// Add edit functions
function editDietitian(id) {
    const dietitian = Database.getDietitians().find(d => d.id === id);
    if (dietitian) {
        // Show edit form/modal
        showEditForm('dietitian', dietitian);
    }
}

function editDoctor(id) {
    const doctor = Database.getDoctors().find(d => d.id === id);
    if (doctor) {
        showEditForm('doctor', doctor);
    }
}

function editClient(id) {
    const client = Database.getClients().find(c => c.id === id);
    if (client) {
        showEditForm('client', client);
    }
}

// Add this function to show edit form
function showEditForm(type, data) {
    // Create modal HTML
    const modal = document.createElement('div');
    modal.className = 'edit-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Edit ${type.charAt(0).toUpperCase() + type.slice(1)}</h3>
            <form id="editForm">
                ${Object.entries(data)
                    .filter(([key]) => key !== 'id')
                    .map(([key, value]) => `
                        <div class="form-group">
                            <label for="${key}">${key.charAt(0).toUpperCase() + key.slice(1)}</label>
                            <input type="text" id="${key}" value="${value}">
                        </div>
                    `).join('')}
                <div class="modal-buttons">
                    <button type="submit">Save</button>
                    <button type="button" onclick="closeEditForm()">Cancel</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    // Handle form submission
    document.getElementById('editForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const updatedData = {};
        Object.keys(data).forEach(key => {
            if (key !== 'id') {
                updatedData[key] = document.getElementById(key).value;
            }
        });

        // Update the database
        switch(type) {
            case 'dietitian':
                Database.updateDietitian(data.id, updatedData);
                break;
            case 'doctor':
                Database.updateDoctor(data.id, updatedData);
                break;
            case 'client':
                Database.updateClient(data.id, updatedData);
                break;
        }

        closeEditForm();
    });
}

function closeEditForm() {
    const modal = document.querySelector('.edit-modal');
    if (modal) {
        modal.remove();
    }
} 