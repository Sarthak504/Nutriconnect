const Database = {
    saveClient(clientData) {
        let clients = this.getClients();
        clientData.id = Date.now();
        clients.push(clientData);
        localStorage.setItem('clients', JSON.stringify(clients));
        return clientData;
    },

    getClients() {
        const data = localStorage.getItem('clients');
        return data ? JSON.parse(data) : [];
    },

    getDietitians() {
        // Return mock data since we're not using a database
        return mockDietitians;
    }
};

function calculateBMI(weight, height) {
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
}

function getBMICategory(bmi) {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
}

function getBMIMessage(bmi, category) {
    switch (category) {
        case "Underweight":
            return "Your BMI indicates you're underweight. Consider consulting with a dietitian for healthy weight gain.";
        case "Normal weight":
            return "Your BMI is in the healthy range. Focus on maintaining your current weight.";
        case "Overweight":
            return "Your BMI indicates you're overweight. Consider weight management options.";
        case "Obese":
            return "Your BMI indicates obesity. We recommend consulting with a dietitian for a healthy weight loss plan.";
        default:
            return "Please consult with a healthcare professional for personalized advice.";
    }
}

// Mock dietitian data with specialties matching client goals
const mockDietitians = [
    {
        id: 1,
        name: "Dr. Priya Sharma",
        specialty: "Weight Loss",
        experience: "12 years",
        rating: 4.9,
        availability: "Mon-Sat",
        consultationFee: "₹2,500",
        description: "Expert in sustainable weight loss through balanced Indian nutrition and lifestyle modifications."
    },
    {
        id: 2,
        name: "Dr. Amit Patel",
        specialty: "Muscle Building",
        experience: "10 years",
        rating: 4.8,
        availability: "Mon-Fri",
        consultationFee: "₹2,800",
        description: "Specializes in muscle gain and strength training nutrition programs."
    },
    {
        id: 3,
        name: "Dr. Neha Gupta",
        specialty: "Height Growth",
        experience: "15 years",
        rating: 4.9,
        availability: "Tue-Sun",
        consultationFee: "₹3,000",
        description: "Pediatric nutritionist specializing in growth and development for teens."
    },
    {
        id: 4,
        name: "Dr. Rajesh Kumar",
        specialty: "Cardiovascular Health",
        experience: "14 years",
        rating: 4.7,
        availability: "Mon-Sat",
        consultationFee: "₹2,700",
        description: "Expert in heart-healthy diets and cardiac rehabilitation nutrition."
    },
    {
        id: 5,
        name: "Dr. Meera Reddy",
        specialty: "Body Toning",
        experience: "8 years",
        rating: 4.8,
        availability: "Wed-Sun",
        consultationFee: "₹2,300",
        description: "Specializes in body composition improvement and lean muscle development."
    },
    {
        id: 6,
        name: "Dr. Sanjay Verma",
        specialty: "Weight Loss",
        experience: "11 years",
        rating: 4.7,
        availability: "Mon-Fri",
        consultationFee: "₹2,400",
        description: "Focus on clinical weight management and metabolic health."
    },
    {
        id: 7,
        name: "Dr. Anita Desai",
        specialty: "Muscle Building",
        experience: "9 years",
        rating: 4.8,
        availability: "Tue-Sat",
        consultationFee: "₹2,600",
        description: "Expert in sports nutrition and muscle development programs."
    },
    {
        id: 8,
        name: "Dr. Kiran Shah",
        specialty: "Height Growth",
        experience: "13 years",
        rating: 4.6,
        availability: "Mon-Sat",
        consultationFee: "₹2,900",
        description: "Specializes in nutrition for optimal height growth and bone health."
    },
    {
        id: 9,
        name: "Dr. Arjun Malhotra",
        specialty: "Cardiovascular Health",
        experience: "16 years",
        rating: 4.9,
        availability: "Mon-Fri",
        consultationFee: "₹3,200",
        description: "Specializes in preventive cardiac nutrition and lifestyle management."
    },
    {
        id: 10,
        name: "Dr. Pooja Sharma",
        specialty: "Body Toning",
        experience: "7 years",
        rating: 4.7,
        availability: "Tue-Sun",
        consultationFee: "₹2,200",
        description: "Expert in body toning and fitness nutrition programs."
    },
    {
        id: 11,
        name: "Dr. Ritu Kapoor",
        specialty: "Healthy Weight Gain",
        experience: "9 years",
        rating: 4.8,
        availability: "Mon-Fri",
        consultationFee: "₹2,400",
        description: "Expert in healthy weight gain through balanced nutrition and meal planning."
    },
    {
        id: 12,
        name: "Dr. Suresh Iyer",
        specialty: "Endurance Training",
        experience: "12 years",
        rating: 4.9,
        availability: "Tue-Sun",
        consultationFee: "₹2,800",
        description: "Specializes in nutrition for endurance athletes and stamina improvement."
    },
    {
        id: 13,
        name: "Dr. Maya Deshmukh",
        specialty: "Bone Health",
        experience: "14 years",
        rating: 4.8,
        availability: "Mon-Sat",
        consultationFee: "₹2,900",
        description: "Expert in bone health nutrition and osteoporosis prevention."
    },
    {
        id: 14,
        name: "Dr. Vikram Mehta",
        specialty: "Weight Loss",
        experience: "13 years",
        rating: 4.7,
        availability: "Wed-Mon",
        consultationFee: "₹2,700",
        description: "Specializes in customized weight loss programs and metabolic health."
    },
    {
        id: 15,
        name: "Dr. Anjali Sinha",
        specialty: "Muscle Building",
        experience: "8 years",
        rating: 4.6,
        availability: "Mon-Fri",
        consultationFee: "₹2,300",
        description: "Expert in muscle gain nutrition and strength development."
    },
    {
        id: 16,
        name: "Dr. Rahul Khanna",
        specialty: "Height Growth",
        experience: "11 years",
        rating: 4.8,
        availability: "Tue-Sat",
        consultationFee: "₹2,600",
        description: "Specializes in nutrition for adolescent growth and development."
    },
    {
        id: 17,
        name: "Dr. Nandini Raj",
        specialty: "Endurance Training",
        experience: "10 years",
        rating: 4.7,
        availability: "Mon-Sat",
        consultationFee: "₹2,500",
        description: "Expert in sports nutrition and endurance performance."
    },
    {
        id: 18,
        name: "Dr. Arun Kumar",
        specialty: "Bone Health",
        experience: "15 years",
        rating: 4.9,
        availability: "Mon-Fri",
        consultationFee: "₹3,100",
        description: "Specializes in bone density improvement and joint health."
    },
    {
        id: 19,
        name: "Dr. Prerna Malhotra",
        specialty: "Healthy Weight Gain",
        experience: "7 years",
        rating: 4.6,
        availability: "Wed-Sun",
        consultationFee: "₹2,200",
        description: "Expert in healthy mass gaining and nutritional counseling."
    },
    {
        id: 20,
        name: "Dr. Deepak Verma",
        specialty: "Cardiovascular Health",
        experience: "16 years",
        rating: 4.9,
        availability: "Mon-Sat",
        consultationFee: "₹3,300",
        description: "Specializes in heart-healthy diets and cardiac wellness."
    },
    {
        id: 21,
        name: "Dr. Shweta Joshi",
        specialty: "Body Toning",
        experience: "9 years",
        rating: 4.7,
        availability: "Tue-Sun",
        consultationFee: "₹2,400",
        description: "Expert in body composition and lean muscle development."
    },
    {
        id: 22,
        name: "Dr. Karthik Raman",
        specialty: "Endurance Training",
        experience: "13 years",
        rating: 4.8,
        availability: "Mon-Fri",
        consultationFee: "₹2,800",
        description: "Specializes in marathon nutrition and endurance sports."
    },
    {
        id: 23,
        name: "Dr. Sarika Patel",
        specialty: "Bone Health",
        experience: "12 years",
        rating: 4.7,
        availability: "Mon-Sat",
        consultationFee: "₹2,700",
        description: "Expert in bone health and calcium metabolism optimization."
    },
    {
        id: 24,
        name: "Dr. Rajat Sharma",
        specialty: "Healthy Weight Gain",
        experience: "10 years",
        rating: 4.8,
        availability: "Wed-Mon",
        consultationFee: "₹2,500",
        description: "Specializes in healthy weight gain and muscle development."
    },
    {
        id: 25,
        name: "Dr. Meenakshi Reddy",
        specialty: "Height Growth",
        experience: "14 years",
        rating: 4.9,
        availability: "Mon-Fri",
        consultationFee: "₹3,000",
        description: "Expert in growth optimization and developmental nutrition."
    }
];

console.log(mockDietitians);

// Add this function to calculate match score
function calculateMatchScore(dietitian, selectedGoal) {
    let score = 0;
    const mainGoal = selectedGoal.split('-')[0].trim();

    // Specialty match (50 points)
    if (dietitian.specialty.toLowerCase() === mainGoal.toLowerCase()) {
        score += 50;
    } else if (relatedSpecialties[mainGoal]?.includes(dietitian.specialty)) {
        score += 30; // Related specialty gets fewer points
    }

    // Experience points (up to 25 points)
    const experience = parseInt(dietitian.experience);
    score += Math.min(experience * 2, 25);

    // Rating points (up to 25 points)
    score += dietitian.rating * 5;

    return Math.min(score, 100); // Cap at 100%
}

// Update the getMatchingDietitians function
function getMatchingDietitians(goal) {
    const mainGoal = goal.split('-')[0].trim();
    
    // Get all dietitians including registered ones
    const allDietitians = Database.getDietitians();
    
    // Find dietitians matching the goal
    let matchingDietitians = allDietitians.filter(dietitian => {
        return dietitian.specialty.toLowerCase() === mainGoal.toLowerCase();
    });

    // If no exact matches, try related specialties
    if (matchingDietitians.length === 0) {
        const relatedSpecialties = {
            "Weight Loss": ["Body Toning", "Cardiovascular Health"],
            "Muscle Building": ["Body Toning", "Weight Gain"],
            "Height Growth": ["Bone Health", "Healthy Weight Gain"],
            "Cardiovascular Health": ["Weight Loss", "Endurance Training"],
            "Body Toning": ["Muscle Building", "Weight Loss"],
            "Healthy Weight Gain": ["Muscle Building", "Height Growth"],
            "Endurance Training": ["Cardiovascular Health", "Body Toning"],
            "Bone Health": ["Height Growth", "Healthy Weight Gain"]
        };

        const relatedGoals = relatedSpecialties[mainGoal] || [];
        matchingDietitians = allDietitians.filter(dietitian => 
            relatedGoals.includes(dietitian.specialty)
        );
    }

    // Calculate match score for each dietitian
    matchingDietitians = matchingDietitians.map(dietitian => ({
        ...dietitian,
        matchScore: calculateMatchScore(dietitian, goal)
    }));

    // Sort by verification status, match score, and rating
    return matchingDietitians.sort((a, b) => {
        // Verified dietitians come first
        if (a.verified !== b.verified) return b.verified ? 1 : -1;
        // Then sort by match score
        if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
        // Finally sort by rating
        return b.rating - a.rating;
    });
}

// Update the getRecommendations function
function getRecommendations(bmi, selectedGoal) {
    const bmiCategory = getBMICategory(bmi);
    let recommendation = {
        suitable: true,
        message: "",
        suggestedGoals: [],
        recommendedDietitians: [],
        feedbackMessage: ""
    };

    const mainGoal = selectedGoal.split('-')[0].trim();

    // Add professional feedback messages based on BMI and goal selection
    switch (bmiCategory) {
        case "Underweight":
            if (mainGoal === "Weight Loss") {
                recommendation.suitable = false;
                recommendation.feedbackMessage = `
                    <div class="feedback-message warning">
                        <i class="fas fa-info-circle"></i>
                        <div>
                            <h4>Important Health Consideration</h4>
                            <p>We notice you're interested in weight loss, but your BMI of ${bmi.toFixed(1)} indicates you're currently underweight. 
                            For your health and well-being, we recommend focusing on building a strong, healthy body first.</p>
                            <p>Consider these more suitable goals for your current health status:</p>
                        </div>
                    </div>
                `;
            } else if (mainGoal === "Healthy Weight Gain" || mainGoal === "Muscle Building") {
                recommendation.feedbackMessage = `
                    <div class="feedback-message positive">
                        <i class="fas fa-check-circle"></i>
                        <div>
                            <h4>Excellent Goal Selection!</h4>
                            <p>You've made a great choice! Your selected goal aligns perfectly with your current health needs. 
                            Building healthy weight and strength will help improve your overall well-being.</p>
                        </div>
                    </div>
                `;
            }
            break;

        case "Normal weight":
            if (mainGoal === "Body Toning" || mainGoal === "Cardiovascular Health") {
                recommendation.feedbackMessage = `
                    <div class="feedback-message positive">
                        <i class="fas fa-check-circle"></i>
                        <div>
                            <h4>Perfect Goal Choice!</h4>
                            <p>Excellent selection! Your goal is ideal for maintaining and enhancing your already healthy BMI. 
                            This will help you build strength and improve overall fitness.</p>
                        </div>
                    </div>
                `;
            }
            break;

        case "Overweight":
            if (mainGoal === "Weight Loss" || mainGoal === "Cardiovascular Health") {
                recommendation.feedbackMessage = `
                    <div class="feedback-message positive">
                        <i class="fas fa-check-circle"></i>
                        <div>
                            <h4>Great Health Decision!</h4>
                            <p>You've made a wise choice that aligns well with your health needs. 
                            Our experts will help you achieve your goals safely and effectively.</p>
                        </div>
                    </div>
                `;
            } else if (mainGoal === "Weight Gain") {
                recommendation.suitable = false;
                recommendation.feedbackMessage = `
                    <div class="feedback-message warning">
                        <i class="fas fa-info-circle"></i>
                        <div>
                            <h4>Personalized Health Recommendation</h4>
                            <p>Based on your current BMI of ${bmi.toFixed(1)}, we recommend exploring different fitness goals 
                            that would be more beneficial for your health journey. Here are some options that would serve you better:</p>
                        </div>
                    </div>
                `;
            }
            break;

        case "Obese":
            if (mainGoal === "Weight Loss" || mainGoal === "Cardiovascular Health") {
                recommendation.feedbackMessage = `
                    <div class="feedback-message positive">
                        <i class="fas fa-check-circle"></i>
                        <div>
                            <h4>Commendable Health Choice!</h4>
                            <p>You've taken an important step towards better health. Our experienced dietitians will guide you 
                            through a safe and sustainable journey to achieve your goals.</p>
                        </div>
                    </div>
                `;
            } else {
                recommendation.suitable = false;
                recommendation.feedbackMessage = `
                    <div class="feedback-message warning">
                        <i class="fas fa-info-circle"></i>
                        <div>
                            <h4>Important Health Guidance</h4>
                            <p>For your optimal health and safety, we recommend prioritizing different fitness goals at this time. 
                            Our experts suggest focusing on these health-promoting objectives:</p>
                        </div>
                    </div>
                `;
            }
            break;
    }

    // Enhanced BMI-based goal suggestions
    switch (bmiCategory) {
        case "Underweight": // BMI < 18.5
            if (mainGoal === "Weight Loss") {
                recommendation.suitable = false;
                recommendation.message = `Your BMI (${bmi.toFixed(1)}) indicates you're underweight. Weight loss could be harmful. We recommend:`;
                recommendation.suggestedGoals = [
                    "Healthy Weight Gain - Nutrient-dense diet",
                    "Muscle Building - Strength training and nutrition"
                ];
                
                // Get dietitians for recommended goals
                const weightGainDietitians = getMatchingDietitians("Healthy Weight Gain");
                const muscleBuildingDietitians = getMatchingDietitians("Muscle Building");

                recommendation.recommendedDietitians = [
                    ...weightGainDietitians,
                    ...muscleBuildingDietitians
                ].slice(0, 6);
            }
            break;

        case "Overweight": // BMI 25-29.9
            if (mainGoal === "Weight Gain" || mainGoal === "Healthy Weight Gain") {
                recommendation.suitable = false;
                recommendation.message = `Your BMI (${bmi.toFixed(1)}) indicates you're overweight. Instead of weight gain, consider these healthier options:`;
                recommendation.suggestedGoals = [
                    "Weight Loss - Balanced diet and exercise",
                    "Body Toning - Muscle definition",
                    "Cardiovascular Health - Heart-healthy lifestyle"
                ];
                
                const weightLossDietitians = getMatchingDietitians("Weight Loss");
                const toningDietitians = getMatchingDietitians("Body Toning");
                const cardioHealthDietitians = getMatchingDietitians("Cardiovascular Health");

                recommendation.recommendedDietitians = [
                    ...weightLossDietitians,
                    ...toningDietitians,
                    ...cardioHealthDietitians
                ].slice(0, 6);
            }
            break;

        case "Obese": // BMI >= 30
            if (!["Weight Loss", "Cardiovascular Health"].includes(mainGoal)) {
                recommendation.suitable = false;
                recommendation.message = `Your BMI (${bmi.toFixed(1)}) indicates obesity. For your health and safety, we strongly recommend focusing on:`;
                recommendation.suggestedGoals = [
                    "Weight Loss - Balanced diet and exercise",
                    "Cardiovascular Health - Heart-healthy lifestyle"
                ];
                
                const weightLossDietitians = getMatchingDietitians("Weight Loss");
                const cardioHealthDietitians = getMatchingDietitians("Cardiovascular Health");

                recommendation.recommendedDietitians = [
                    ...weightLossDietitians,
                    ...cardioHealthDietitians
                ].slice(0, 6);

                // Add specific health warning
                recommendation.message += "\nPlease consult with healthcare professionals before starting any fitness program.";
            }
            break;

        case "Normal weight":
            // Add positive reinforcement for healthy choices
            if (["Weight Loss", "Weight Gain"].includes(mainGoal)) {
                recommendation.message = `Your BMI (${bmi.toFixed(1)}) is in the healthy range. Consider these goals to maintain and improve your health:`;
                recommendation.suggestedGoals = [
                    "Body Toning - Muscle definition",
                    "Endurance Training - Stamina improvement",
                    "Cardiovascular Health - Heart-healthy lifestyle"
                ];
                // Still show their chosen dietitians but add suggestions
                const chosenDietitians = getMatchingDietitians(selectedGoal);
                const suggestedDietitians = [
                    ...getMatchingDietitians("Body Toning"),
                    ...getMatchingDietitians("Endurance Training")
                ];

                recommendation.recommendedDietitians = [
                    ...chosenDietitians,
                    ...suggestedDietitians
                ].slice(0, 6);
            }
            break;
    }

    // If no specific recommendations were set, use the original goal
    if (recommendation.recommendedDietitians.length === 0) {
        recommendation.recommendedDietitians = getMatchingDietitians(selectedGoal);
    }

    return recommendation;
}

// Add this doctors data array
const mockDoctors = [
    {
        id: 1,
        name: "Dr. Sunil Kumar",
        qualification: "MBBS, MD (Internal Medicine)",
        experience: "15 years",
        rating: 4.9,
        availability: "Mon-Sat",
        consultationFee: "₹1,500",
        hospital: "City General Hospital",
        description: "General physician with expertise in managing obesity and related health conditions."
    },
    {
        id: 2,
        name: "Dr. Anita Desai",
        qualification: "MBBS, MD (General Medicine)",
        experience: "12 years",
        rating: 4.8,
        availability: "Mon-Fri",
        consultationFee: "₹1,200",
        hospital: "LifeCare Medical Center",
        description: "Experienced in treating various health conditions and providing comprehensive care."
    },
    {
        id: 3,
        name: "Dr. Rajesh Sharma",
        qualification: "MBBS, DNB (Family Medicine)",
        experience: "18 years",
        rating: 4.9,
        availability: "Tue-Sun",
        consultationFee: "₹1,800",
        hospital: "Health First Hospital",
        description: "Family physician specializing in preventive care and chronic disease management."
    },
    {
        id: 4,
        name: "Dr. Priya Mehta",
        qualification: "MBBS, MD (Internal Medicine)",
        experience: "14 years",
        rating: 4.7,
        availability: "Mon-Sat",
        consultationFee: "₹1,400",
        hospital: "Medicare Hospital",
        description: "Expert in managing complex medical conditions and preventive healthcare."
    },
    {
        id: 5,
        name: "Dr. Arun Patel",
        qualification: "MBBS, MD (General Medicine)",
        experience: "20 years",
        rating: 4.9,
        availability: "Mon-Fri",
        consultationFee: "₹2,000",
        hospital: "Apollo Medical Center",
        description: "Senior physician with extensive experience in treating various health conditions."
    },
    {
        id: 6,
        name: "Dr. Meera Singh",
        qualification: "MBBS, DNB (Family Medicine)",
        experience: "11 years",
        rating: 4.6,
        availability: "Wed-Mon",
        consultationFee: "₹1,300",
        hospital: "City Care Hospital",
        description: "Focuses on family healthcare and managing chronic conditions."
    },
    {
        id: 7,
        name: "Dr. Vikram Reddy",
        qualification: "MBBS, MD (Internal Medicine)",
        experience: "16 years",
        rating: 4.8,
        availability: "Mon-Sat",
        consultationFee: "₹1,600",
        hospital: "Wellness Medical Center",
        description: "Specializes in internal medicine and managing complex health conditions."
    },
    {
        id: 8,
        name: "Dr. Shalini Gupta",
        qualification: "MBBS, MD (General Medicine)",
        experience: "13 years",
        rating: 4.7,
        availability: "Tue-Sun",
        consultationFee: "₹1,400",
        hospital: "Hope Hospital",
        description: "Experienced in providing comprehensive medical care and health management."
    },
    {
        id: 9,
        name: "Dr. Karthik Iyer",
        qualification: "MBBS, DNB (Family Medicine)",
        experience: "19 years",
        rating: 4.9,
        availability: "Mon-Fri",
        consultationFee: "₹1,900",
        hospital: "Prime Care Hospital",
        description: "Senior family physician with expertise in managing various health conditions."
    },
    {
        id: 10,
        name: "Dr. Nandini Shah",
        qualification: "MBBS, MD (Internal Medicine)",
        experience: "17 years",
        rating: 4.8,
        availability: "Mon-Sat",
        consultationFee: "₹1,700",
        hospital: "Life Line Hospital",
        description: "Specializes in preventive care and managing chronic health conditions."
    }
];

// Function to determine if medical consultation is needed
function needsMedicalConsultation(bmi, age) {
    // Define critical thresholds
    const criticalConditions = {
        severeUnderweight: bmi < 16.5,
        severeObesity: bmi >= 35,
        elderlyRisk: age >= 50 && (bmi < 18.5 || bmi >= 30)
    };

    return (
        criticalConditions.severeUnderweight ||
        criticalConditions.severeObesity ||
        criticalConditions.elderlyRisk
    );
}

// Function to get appropriate mix of doctors and dietitians based on condition
function getRelevantHealthProfessionals(bmi, age, goal) {
    // Get condition-specific recommendations
    const condition = {
        severeUnderweight: bmi < 16.5,
        severeObesity: bmi >= 35,
        elderlyRisk: age >= 50 && (bmi < 18.5 || bmi >= 30)
    };

    let professionals = {
        doctors: [],
        dietitians: []
    };

    // Select relevant doctors (only 2 most experienced)
    let relevantDoctors = [...mockDoctors]
        .sort((a, b) => {
            const expA = parseInt(a.experience);
            const expB = parseInt(b.experience);
            if (expA !== expB) return expB - expA;
            return b.rating - a.rating;
        })
        .slice(0, 2); // Only get top 2 doctors

    // Get dietitians based on condition
    let specializedDietitians = mockDietitians.filter(dietitian => {
        if (condition.severeUnderweight) {
            return ["Weight Gain", "Healthy Weight Gain"].includes(dietitian.specialty);
        }
        if (condition.severeObesity) {
            return ["Weight Loss", "Cardiovascular Health"].includes(dietitian.specialty);
        }
        return dietitian.specialty.toLowerCase() === goal.toLowerCase();
    })
    .sort((a, b) => {
        const expA = parseInt(a.experience);
        const expB = parseInt(b.experience);
        if (expA !== expB) return expB - expA;
        return b.rating - a.rating;
    })
    .slice(0, 2); // Only get top 2 specialized dietitians

    return {
        doctors: relevantDoctors,
        dietitians: specializedDietitians,
        message: getHealthMessage(condition, bmi)
    };
}

// Function to get appropriate health message
function getHealthMessage(condition, bmi) {
    if (condition.severeUnderweight) {
        return `Your BMI of ${bmi.toFixed(1)} indicates severe underweight. We strongly recommend consulting both a medical doctor and a specialized dietitian for a comprehensive health plan.`;
    }
    if (condition.severeObesity) {
        return `Your BMI of ${bmi.toFixed(1)} indicates severe obesity. For your safety and optimal results, we recommend medical supervision along with dietary guidance.`;
    }
    if (condition.elderlyRisk) {
        return `Based on your age and BMI (${bmi.toFixed(1)}), we recommend medical oversight of your fitness journey along with specialized nutritional guidance.`;
    }
    return `Based on your health parameters, we recommend consulting these health professionals for optimal results.`;
}

// Update the form submission handler
document.getElementById('clientForm').addEventListener('submit', function(event) {
    event.preventDefault();

    try {
        // Get form values
        const height = parseFloat(document.getElementById('height').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const age = parseInt(document.getElementById('age').value);
        const goal = document.getElementById('goal').value;
        const name = document.getElementById('name').value.trim();
        const gender = document.getElementById('gender').value;

        // Calculate BMI
        const bmi = calculateBMI(weight, height);
        
        // Check if medical consultation is needed
        const needsDoctor = needsMedicalConsultation(bmi, age);
        
        // Get recommendations
        const recommendations = getRecommendations(bmi, goal);
        
        // Generate HTML content
        let resultsHTML = '';

        // Add medical warning if needed
        if (needsDoctor) {
            const healthProfessionals = getRelevantHealthProfessionals(bmi, age, goal);
            resultsHTML += `
                <div class="medical-alert">
                    <div class="alert-header">
                        <i class="fas fa-hospital-user"></i>
                        <h3>Important Health Consultation Required</h3>
                    </div>
                    <p class="alert-message">${healthProfessionals.message}</p>
                    
                    <div class="health-professionals-section">
                        <div class="medical-section">
                            <h4><i class="fas fa-user-md"></i> Recommended Medical Doctors</h4>
                            <div class="doctor-grid">
                                ${healthProfessionals.doctors.map(doctor => `
                                    <div class="doctor-card">
                                        <h3>${doctor.name}</h3>
                                        <div class="doctor-info">
                                            <p><i class="fas fa-graduation-cap"></i> ${doctor.qualification}</p>
                                            <p><i class="fas fa-clock"></i> Experience: ${doctor.experience}</p>
                                            <p><i class="fas fa-hospital"></i> ${doctor.hospital}</p>
                                            <p><i class="fas fa-star"></i> Rating: ${doctor.rating}</p>
                                            <p><i class="fas fa-calendar"></i> Available: ${doctor.availability}</p>
                                            <p><i class="fas fa-rupee-sign"></i> Fee: ${doctor.consultationFee}</p>
                                        </div>
                                        <p class="description">${doctor.description}</p>
                                        <button class="book-btn doctor-btn" onclick="bookDoctorAppointment(${doctor.id})">
                                            <i class="fas fa-calendar-check"></i> Book Medical Consultation
                                        </button>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="specialized-dietitians-section">
                            <h4><i class="fas fa-heartbeat"></i> Recommended Specialized Dietitians</h4>
                            <div class="dietitian-grid">
                                ${healthProfessionals.dietitians.map(dietitian => `
                                    <div class="dietitian-card">
                                        <h3>${dietitian.name}</h3>
                                        <div class="dietitian-info">
                                            <p><i class="fas fa-stethoscope"></i> Specialty: ${dietitian.specialty}</p>
                                            <p><i class="fas fa-clock"></i> Experience: ${dietitian.experience}</p>
                                            <p><i class="fas fa-star"></i> Rating: ${dietitian.rating}</p>
                                            <p><i class="fas fa-calendar"></i> Available: ${dietitian.availability}</p>
                                            <p><i class="fas fa-rupee-sign"></i> Fee: ${dietitian.consultationFee}</p>
                                        </div>
                                        <p class="description">${dietitian.description}</p>
                                        <button class="book-btn dietitian-btn" onclick="bookAppointment(${dietitian.id})">
                                            <i class="fas fa-calendar-check"></i> Book Dietitian Consultation
                                        </button>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        // Add dietitian recommendations
        resultsHTML += `
        <div class="dietitian-recommendations">
                <h2>Recommended Dietitians</h2>
                <div class="dietitian-grid">
                    ${recommendations.recommendedDietitians.map(dietitian => `
                        <div class="dietitian-card">
                            <h3>${dietitian.name}</h3>
                            <div class="dietitian-info">
                                <p><i class="fas fa-stethoscope"></i> Specialty: ${dietitian.specialty}</p>
                                <p><i class="fas fa-clock"></i> Experience: ${dietitian.experience}</p>
                                <p><i class="fas fa-star"></i> Rating: ${dietitian.rating}</p>
                                <p><i class="fas fa-calendar"></i> Available: ${dietitian.availability}</p>
                                <p><i class="fas fa-rupee-sign"></i> Fee: ${dietitian.consultationFee}</p>
                            </div>
                            <p class="match-score">Match Score: ${dietitian.matchScore}%</p>
                            <p class="description">${dietitian.description}</p>
                            <button class="book-btn" onclick="bookAppointment(${dietitian.id})">
                                <i class="fas fa-calendar-check"></i> Book Consultation
                            </button>
                        </div>
                    `).join('')}
                </div>
                
                <!-- Apollo Booking Link -->
                <div class="apollo-booking-link">
                    <div class="apollo-banner">
                        <i class="fas fa-external-link-alt"></i>
                        <h3>Looking for more options?</h3>
                        <p>For more dietitian choices and to complete your booking, visit Apollo 24|7's official website.</p>
                        <a href="https://www.apollo247.com/specialties/dietetics" target="_blank" class="apollo-btn">
                            Find & Book Dietitians at Apollo 24|7
                        </a>
                    </div>
                </div>
            </div>
        `;

        // Update the results section
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = resultsHTML;
        resultsDiv.style.display = 'block';
        resultsDiv.scrollIntoView({ behavior: 'smooth' });

    } catch (error) {
        console.error('Error:', error);
        alert(error.message || 'An error occurred. Please try again.');
    }
});

// Add these event listeners for live BMI calculation
document.getElementById('height').addEventListener('input', updateBMIPreview);
document.getElementById('weight').addEventListener('input', updateBMIPreview);

function updateBMIPreview() {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const bmiPreview = document.getElementById('bmi-preview');
    
    if (height && weight) {
        const bmi = calculateBMI(weight, height);
        const category = getBMICategory(bmi);
        let bmiClass = '';
        
        // Determine BMI category class for styling
        switch(category) {
            case "Underweight": bmiClass = 'bmi-underweight'; break;
            case "Normal weight": bmiClass = 'bmi-normal'; break;
            case "Overweight": bmiClass = 'bmi-overweight'; break;
            case "Obese": bmiClass = 'bmi-obese'; break;
        }

        bmiPreview.innerHTML = `
            <div class="bmi-preview ${bmiClass}">
                <i class="fas fa-calculator"></i>
                Current BMI: <strong>${bmi.toFixed(1)}</strong> (${category})
                <div class="weight-recommendation">
                    ${getBMIMessage(bmi, category)}
                </div>
            </div>
        `;
    } else {
        bmiPreview.innerHTML = '';
    }
}

function addDietitian(newDietitian) {
    mockDietitians.push(newDietitian);
    console.log(mockDietitians); // Log the updated array
}
