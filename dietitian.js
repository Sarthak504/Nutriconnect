// Initialize dietitian data management
const DietitianManager = {
    // Get all dietitians including mock and registered ones
    getAllDietitians() {
        const storedDietitians = localStorage.getItem('registeredDietitians');
        const registeredDietitians = storedDietitians ? JSON.parse(storedDietitians) : [];
        return [...mockDietitians, ...registeredDietitians];
    },

    // Add new dietitian
    addDietitian(dietitianData) {
        const dietitians = this.getAllDietitians();
        const newId = Date.now(); // Generate unique ID
        
        const newDietitian = {
            ...dietitianData,
            id: newId,
            rating: 4.5, // Default rating for new dietitians
            verified: false, // New dietitians start unverified
            dateJoined: new Date().toISOString()
        };

        const storedDietitians = localStorage.getItem('registeredDietitians');
        const registeredDietitians = storedDietitians ? JSON.parse(storedDietitians) : [];
        
        registeredDietitians.push(newDietitian);
        localStorage.setItem('registeredDietitians', JSON.stringify(registeredDietitians));
        
        return newDietitian;
    },

    // Validate dietitian data
    validateDietitianData(data) {
        const errors = [];
        
        if (!data.name || data.name.length < 3) {
            errors.push('Name must be at least 3 characters long');
        }
        
        if (!data.qualification) {
            errors.push('Qualification is required');
        }
        
        if (!data.specialty) {
            errors.push('Specialty is required');
        }
        
        if (!data.experience || isNaN(data.experience) || data.experience < 0) {
            errors.push('Valid experience in years is required');
        }
        
        if (!data.availability) {
            errors.push('Availability schedule is required');
        }
        
        if (!data.consultationFee || isNaN(data.consultationFee) || data.consultationFee < 0) {
            errors.push('Valid consultation fee is required');
        }
        
        return errors;
    }
};

// Handle form submission
document.getElementById('dietitianForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    try {
        // Collect form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            qualification: document.getElementById('qualification').value.trim(),
            specialty: document.getElementById('specialty').value,
            experience: parseInt(document.getElementById('experience').value),
            availability: document.getElementById('availability').value.trim(),
            consultationFee: parseFloat(document.getElementById('consultationFee').value),
            description: document.getElementById('description').value.trim()
        };

        // Validate data
        const validationErrors = DietitianManager.validateDietitianData(formData);
        if (validationErrors.length > 0) {
            throw new Error(validationErrors.join('\n'));
        }

        // Add new dietitian
        const newDietitian = DietitianManager.addDietitian(formData);

        // Show success message
        showSuccessPopup();
        
        // Clear form
        this.reset();

        // Optional: Redirect after delay
        setTimeout(() => {
            window.location.href = '/client/index.html';
        }, 3000);

    } catch (error) {
        console.error('Error:', error);
        showNotification(error.message, 'error');
    }
});

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = document.createElement('i');
    icon.className = type === 'error' ? 'fas fa-exclamation-circle' : 'fas fa-info-circle';
    
    const text = document.createElement('span');
    text.textContent = message;
    
    notification.appendChild(icon);
    notification.appendChild(text);
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Show success popup
function showSuccessPopup() {
    const popup = document.getElementById('successPopup');
    popup.classList.add('active');
    
    // Add confetti effect
    addConfettiEffect();
}

// Close popup
function closePopup() {
    const popup = document.getElementById('successPopup');
    popup.classList.remove('active');
}

// Add confetti effect
function addConfettiEffect() {
    const confettiCount = 200;
    const colors = ['#2ecc71', '#27ae60', '#3498db', '#2980b9'];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        document.body.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => confetti.remove(), 3000);
    }
} 