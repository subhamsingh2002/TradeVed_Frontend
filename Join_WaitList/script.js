const questions = [{
    label: '1.Name*',
    type: 'text',
    name: 'name',
    validate: value => value.trim() ? '' : 'Name is required'
}, {
    label: '2.Email*',
    type: 'email',
    name: 'email',
    validate: value => {
        if (!value) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return '';
    }
}, {
    label: '3.Phone Number*',
    type: 'tel',
    name: 'phone',
    validate: value => {
        if (!value) return 'Phone number is required';
        if (!/^\d{10}$/.test(value)) return 'Phone number must be exactly 10 digits';
        return '';
    }
}, {
    label: '4.Please select your experience in trading',
    type: 'Radio',
    name: 'experience',
    options: [
        'Beginner(0-1 year)',
        'Intermediate(1-3 years)',
        'Advanced(3+ years)',
        'Exploring trading/investing'
    ]
}];

let currentStep = 0;
const formData = {};

function renderQuestion() {
    const question = questions[currentStep];
    const card = document.getElementById('questionCard');
    const continueBtn = document.getElementById('continueBtn');
    const backBtn = document.getElementById('backBtn');
    const enterKey = document.querySelector('.enter-key');

    document.querySelector('.question-counter').textContent = `${currentStep + 1}/4 question`;

    if (question.type === 'Radio') {
        card.innerHTML = `
          <div class="question-label">${question.label}</div>
          <div class="radio-container">
            ${question.options.map((option, index) => `
              <div class="radio-item">
                <input type="radio" id="radio-${index}" name="${question.name}" value="${option}">
                <label for="radio-${index}">${option}</label>
              </div>
            `).join('')}
          </div>
          <div class="error-message"></div>
        `;

        continueBtn.textContent = 'Submit';
        continueBtn.classList.add('submit-btn');
        enterKey.style.display = 'none';
    } else {
        card.innerHTML = `
          <div class="question-label">${question.label}</div>
          <input type="${question.type}" class="input-field" name="${question.name}" value="${formData[question.name] || ''}">
          <div class="error-message"></div>
        `;

        continueBtn.textContent = 'Continue';
        continueBtn.classList.remove('submit-btn');
        enterKey.style.display = 'flex';
    }

    backBtn.style.display = currentStep > 0 ? 'flex' : 'none';
}

function validateCurrentStep() {
    const question = questions[currentStep];
    const errorElement = document.querySelector('.error-message');

    if (question.type === 'Radio') {
        const selected = document.querySelector(`input[name="${question.name}"]:checked`);
        if (!selected) {
            errorElement.textContent = 'Please select an option';
            errorElement.style.display = 'block';
            return false;
        }

        formData[question.name] = selected.value;
        errorElement.style.display = 'none';
        return true;
    }

    const input = document.querySelector('.input-field');
    const error = question.validate(input.value);
    if (error) {
        errorElement.textContent = error;
        errorElement.style.display = 'block';
        return false;
    }

    formData[question.name] = input.value;
    errorElement.style.display = 'none';
    return true;
}

document.getElementById('continueBtn').addEventListener('click', async () => {
    const continueBtn = document.getElementById('continueBtn');

    if (validateCurrentStep()) {
        if (currentStep === questions.length - 1) {
            // Disable button to prevent multiple clicks
            continueBtn.disabled = true;
            continueBtn.textContent = 'Submitting...';

            try {
                const response = await fetch('https://tradeved-backend-zhwx.onrender.com/api/waitlist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    const message = errorData.message || 'Failed to join the waitlist.';
                    throw new Error(message);
                }

                const data = await response.json();
                console.log('Success:', data);
                window.location.href = '../Finish_form/index.html';
            } catch (error) {
                console.error('Error:', error);
                alert(error.message);
                continueBtn.disabled = false;
                continueBtn.textContent = 'Submit';
            }

            return;
        }

        currentStep++;
        renderQuestion();
    }
});

document.getElementById('backBtn').addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        renderQuestion();
    }
});

document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && currentStep < questions.length - 1) {
        e.preventDefault();
        document.getElementById('continueBtn').click();
    }
});

// Initialize first question
renderQuestion();
