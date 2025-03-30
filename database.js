const Database = {
    // Mock data for initial state
    mockDietitians: [
        {
            id: 1,
            name: "Dr. Priya Sharma",
            specialty: "Weight Loss",
            experience: "12 years",
            rating: 4.9,
            availability: "Mon-Sat",
            consultationFee: "₹2,500",
            description: "Expert in sustainable weight loss through balanced nutrition.",
            verified: true
        },
        // Add more mock dietitians as needed
    ],

    mockDoctors: [
        {
            id: 1,
            name: "Dr. Rajesh Kumar",
            qualification: "MD, Internal Medicine",
            experience: "15 years",
            hospital: "City Hospital",
            rating: 4.8,
            availability: "Mon-Fri",
            consultationFee: "₹3,000",
            description: "Specialist in internal medicine and nutrition"
        },
        // Add more mock doctors as needed
    ],

    // Add event listeners for database changes
    listeners: {
        dietitians: new Set(),
        doctors: new Set(),
        clients: new Set()
    },

    // Add listener function
    addListener(type, callback) {
        if (this.listeners[type]) {
            this.listeners[type].add(callback);
        }
    },

    // Remove listener function
    removeListener(type, callback) {
        if (this.listeners[type]) {
            this.listeners[type].delete(callback);
        }
    },

    // Notify listeners
    notifyListeners(type) {
        if (this.listeners[type]) {
            this.listeners[type].forEach(callback => callback());
        }
    },

    // Save client data
    saveClient(clientData) {
        let clients = this.getClients();
        clientData.id = Date.now();
        clients.push(clientData);
        localStorage.setItem('clients', JSON.stringify(clients));
        this.notifyListeners('clients');
        return clientData;
    },

    // Get all clients
    getClients() {
        const data = localStorage.getItem('clients');
        return data ? JSON.parse(data) : [];
    },

    // Get all doctors
    getDoctors() {
        const storedDoctors = localStorage.getItem('doctors');
        return storedDoctors ? JSON.parse(storedDoctors) : this.mockDoctors;
    },

    // Get all dietitians
    getDietitians() {
        const storedDietitians = localStorage.getItem('dietitians');
        const registeredDietitians = storedDietitians ? JSON.parse(storedDietitians) : [];
        return [...this.mockDietitians, ...registeredDietitians];
    },

    // Save doctor data
    saveDoctor(doctorData) {
        let doctors = this.getDoctors();
        doctorData.id = Date.now();
        doctors.push(doctorData);
        localStorage.setItem('doctors', JSON.stringify(doctors));
        this.notifyListeners('doctors');
        return doctorData;
    },

    // Save dietitian data
    saveDietitian(dietitianData) {
        let dietitians = this.getDietitians();
        dietitianData.id = Date.now();
        dietitians.push(dietitianData);
        localStorage.setItem('dietitians', JSON.stringify(dietitians));
        this.notifyListeners('dietitians');
        return dietitianData;
    },

    // Add update functions
    updateDietitian(id, updatedData) {
        let dietitians = this.getDietitians();
        const index = dietitians.findIndex(d => d.id === id);
        if (index !== -1) {
            dietitians[index] = { ...dietitians[index], ...updatedData };
            localStorage.setItem('dietitians', JSON.stringify(dietitians));
            this.notifyListeners('dietitians');
            return true;
        }
        return false;
    },

    updateDoctor(id, updatedData) {
        let doctors = this.getDoctors();
        const index = doctors.findIndex(d => d.id === id);
        if (index !== -1) {
            doctors[index] = { ...doctors[index], ...updatedData };
            localStorage.setItem('doctors', JSON.stringify(doctors));
            this.notifyListeners('doctors');
            return true;
        }
        return false;
    },

    updateClient(id, updatedData) {
        let clients = this.getClients();
        const index = clients.findIndex(c => c.id === id);
        if (index !== -1) {
            clients[index] = { ...clients[index], ...updatedData };
            localStorage.setItem('clients', JSON.stringify(clients));
            this.notifyListeners('clients');
            return true;
        }
        return false;
    }
};

// Initialize DietitianManager
const DietitianManager = {
    getAllDietitians() {
        return Database.getDietitians();
    },

    addDietitian(dietitianData) {
        return Database.saveDietitian(dietitianData);
    },

    validateDietitianData(data) {
        const errors = [];
        if (!data.name || data.name.length < 3) {
            errors.push('Name must be at least 3 characters long');
        }
        if (!data.specialty) {
            errors.push('Specialty is required');
        }
        if (!data.experience) {
            errors.push('Experience is required');
        }
        return errors;
    }
};

// Initialize mock data if not already present
(function initializeDatabase() {
    if (!localStorage.getItem('doctors')) {
        localStorage.setItem('doctors', JSON.stringify(Database.mockDoctors));
    }
    if (!localStorage.getItem('dietitians')) {
        localStorage.setItem('dietitians', JSON.stringify(Database.mockDietitians));
    }
})(); 