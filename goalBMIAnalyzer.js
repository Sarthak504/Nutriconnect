// Define BMI categories and their compatible/incompatible goals
const BMI_GOAL_COMPATIBILITY = {
    SEVERELY_UNDERWEIGHT: {
        bmiRange: { min: 0, max: 16.5 },
        compatibleGoals: ['Healthy Weight Gain', 'Strength Building'],
        incompatibleGoals: ['Weight Loss', 'Fat Loss', 'Intense Cardio'],
        requiredSpecialists: ['Endocrinologist', 'Nutritionist', 'General Physician']
    },
    UNDERWEIGHT: {
        bmiRange: { min: 16.5, max: 18.5 },
        compatibleGoals: ['Gradual Weight Gain', 'Muscle Building', 'General Fitness'],
        incompatibleGoals: ['Weight Loss', 'Fat Loss'],
        requiredSpecialists: ['Nutritionist', 'General Physician']
    },
    NORMAL: {
        bmiRange: { min: 18.5, max: 24.9 },
        compatibleGoals: ['Weight Maintenance', 'Muscle Building', 'Fat Loss', 'General Fitness'],
        incompatibleGoals: ['Rapid Weight Loss', 'Extreme Weight Gain'],
        requiredSpecialists: []
    },
    OVERWEIGHT: {
        bmiRange: { min: 25, max: 29.9 },
        compatibleGoals: ['Weight Loss', 'Fat Loss', 'General Fitness'],
        incompatibleGoals: ['Weight Gain', 'Bulking'],
        requiredSpecialists: ['Nutritionist', 'General Physician']
    },
    OBESE: {
        bmiRange: { min: 30, max: 34.9 },
        compatibleGoals: ['Supervised Weight Loss', 'Light Exercise'],
        incompatibleGoals: ['Weight Gain', 'Bulking', 'Intense Exercise', 'Muscle Building'],
        requiredSpecialists: ['Endocrinologist', 'Cardiologist', 'Bariatric Specialist']
    },
    SEVERELY_OBESE: {
        bmiRange: { min: 35, max: Infinity },
        compatibleGoals: ['Medical Weight Loss', 'Supervised Exercise'],
        incompatibleGoals: ['Weight Gain', 'Bulking', 'High Intensity Training', 'Unsupervised Exercise'],
        requiredSpecialists: ['Bariatric Surgeon', 'Endocrinologist', 'Cardiologist']
    }
};

class GoalCompatibilityAnalyzer {
    static analyzeGoalCompatibility(userData) {
        const { height, weight, fitnessGoal } = userData;
        const bmi = this.calculateBMI(height, weight);
        const bmiCategory = this.getBMICategory(bmi);
        const compatibility = BMI_GOAL_COMPATIBILITY[bmiCategory];

        const isGoalIncompatible = compatibility.incompatibleGoals.includes(fitnessGoal);
        
        return {
            bmi,
            bmiCategory,
            isGoalIncompatible,
            recommendedGoals: compatibility.compatibleGoals,
            requiredSpecialists: isGoalIncompatible ? compatibility.requiredSpecialists : [],
            warningMessage: this.generateWarningMessage(bmiCategory, fitnessGoal, isGoalIncompatible),
            recommendations: this.generateRecommendations(bmiCategory, fitnessGoal)
        };
    }

    static generateWarningMessage(bmiCategory, goal, isIncompatible) {
        if (!isIncompatible) return null;

        const messages = {
            SEVERELY_UNDERWEIGHT: `Your BMI indicates severe underweight. ${goal} could be dangerous. Medical supervision required.`,
            UNDERWEIGHT: `With your current BMI, ${goal} is not recommended. Please consult a healthcare provider.`,
            OVERWEIGHT: `${goal} may not be suitable for your current BMI. Consider weight management first.`,
            OBESE: `${goal} could pose health risks at your current BMI. Medical consultation required.`,
            SEVERELY_OBESE: `${goal} is not safe for your BMI range. Immediate medical consultation recommended.`
        };

        return messages[bmiCategory] || 'Please consult a healthcare provider before starting this fitness goal.';
    }

    static generateRecommendations(bmiCategory, goal) {
        const compatibility = BMI_GOAL_COMPATIBILITY[bmiCategory];
        
        return {
            alternativeGoals: compatibility.compatibleGoals,
            medicalSupervision: compatibility.requiredSpecialists.length > 0,
            recommendedApproach: this.getRecommendedApproach(bmiCategory, goal),
            requiredTests: this.getRequiredTests(bmiCategory)
        };
    }

    static getRecommendedApproach(bmiCategory, goal) {
        // Custom approaches based on BMI category and goal
        const approaches = {
            SEVERELY_UNDERWEIGHT: {
                steps: [
                    'Immediate medical evaluation',
                    'Nutritional assessment',
                    'Gradual calorie increase',
                    'Light strength training under supervision'
                ]
            },
            OBESE: {
                steps: [
                    'Medical clearance required',
                    'Supervised weight management program',
                    'Gradual exercise introduction',
                    'Regular health monitoring'
                ]
            }
            // Add more approaches for other categories
        };

        return approaches[bmiCategory] || { steps: ['Consult with healthcare provider'] };
    }

    static getRequiredTests(bmiCategory) {
        const testsByCategory = {
            SEVERELY_UNDERWEIGHT: [
                'Complete blood count',
                'Thyroid function',
                'Nutritional deficiency panel'
            ],
            OBESE: [
                'Cardiovascular assessment',
                'Diabetes screening',
                'Sleep apnea screening'
            ],
            SEVERELY_OBESE: [
                'Comprehensive metabolic panel',
                'ECG',
                'Sleep study',
                'Hormone panel'
            ]
        };

        return testsByCategory[bmiCategory] || [];
    }
}

// Example usage
document.getElementById('fitnessGoalForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const userData = {
        height: parseFloat(document.getElementById('height').value),
        weight: parseFloat(document.getElementById('weight').value),
        fitnessGoal: document.getElementById('fitnessGoal').value
    };

    const analysis = GoalCompatibilityAnalyzer.analyzeGoalCompatibility(userData);
    
    if (analysis.isGoalIncompatible) {
        // Get doctor recommendations based on required specialists
        const doctorRecommendations = await getDoctorRecommendations(analysis.requiredSpecialists);
        displayIncompatibleGoalWarning(analysis, doctorRecommendations);
    } else {
        displayCompatibleGoalMessage(analysis);
    }
});

function displayIncompatibleGoalWarning(analysis, doctors) {
    document.getElementById('results').innerHTML = `
        <div class="alert alert-warning">
            <h3>Health Advisory</h3>
            <p>${analysis.warningMessage}</p>
            
            <div class="recommended-goals">
                <h4>Recommended Goals for Your BMI:</h4>
                <ul>
                    ${analysis.recommendedGoals.map(goal => `<li>${goal}</li>`).join('')}
                </ul>
            </div>

            <div class="required-specialists">
                <h4>Recommended Medical Consultations:</h4>
                ${doctors.map(doctor => `
                    <div class="doctor-card">
                        <h5>Dr. ${doctor.name}</h5>
                        <p>Specialty: ${doctor.specialty}</p>
                        <p>Experience: ${doctor.experience} years</p>
                        <button onclick="bookAppointment(${doctor.id})">
                            Schedule Consultation
                        </button>
                    </div>
                `).join('')}
            </div>

            <div class="required-tests">
                <h4>Recommended Health Assessments:</h4>
                <ul>
                    ${analysis.recommendations.requiredTests.map(test => 
                        `<li>${test}</li>`
                    ).join('')}
                </ul>
            </div>
        </div>
    `;
}

// Mock function to get dietitian data
function getDietitianData() {
    return {
        name: "Dr. Priya Sharma",
        specialty: "Weight Loss",
        experience: "12 years",
        consultationFee: "₹2,500",
        availability: "Mon-Sat",
        description: "Expert in sustainable weight loss through balanced Indian nutrition and lifestyle modifications.",
        email: "priya.sharma@example.com",
        phone: "123-456-7890",
        profileImage: "path/to/profile-image.jpg"
    };
}

// Function to display dietitian data
function displayDietitianData() {
    const data = getDietitianData();
    document.getElementById('dietitianName').textContent = data.name;
    document.getElementById('specialty').textContent = data.specialty;
    document.getElementById('experience').textContent = data.experience;
    document.getElementById('consultationFee').textContent = data.consultationFee;
    document.getElementById('availability').textContent = data.availability;
    document.getElementById('description').textContent = data.description;
    document.getElementById('email').textContent = data.email;
    document.getElementById('phone').textContent = data.phone;
    document.getElementById('profileImage').src = data.profileImage;
}

// Call the function to display data on page load
document.addEventListener('DOMContentLoaded', displayDietitianData); 