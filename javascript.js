let touchStartX = 0;
let touchStartTime = 0;
let tapCount = 0;
const screens = ['emergencyOptions', 'interventionEngage', 'aiTherapistChat', 'connectTherapist']; // Define screen IDs
let currentScreenIndex = 0; // Start with the first screen

document.addEventListener('DOMContentLoaded', () => {
    // Setup swipe and tap listeners
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartTime = Date.now();
    }, false);

    document.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].screenX;
        const touchEndTime = Date.now();
        const duration = touchEndTime - touchStartTime;

        if (duration < 300) { // Consider as tap if duration is less than 300ms
            tapCount++;
            setTimeout(() => { tapCount = 0; }, 400); // Reset tap count after 400ms
            if (tapCount === 3) { // Trigger on triple tap
                tapCount = 0;
                showScreen('emergencyOptions');
                updateDotsIndicator(screens.indexOf('emergencyOptions'));
            }
        } else { // Consider as swipe
            handleGesture(touchEndX);
        }
    }, false);

    // Initialize dots indicator for the home screen
    updateDotsIndicator(currentScreenIndex);

    // Other event listeners like burger menu toggle...
    setupBurgerMenu();
});

function handleGesture(touchEndX) {
    if (touchEndX < touchStartX - 50) navigateToScreen(1); // Swipe left to go forward
    if (touchEndX > touchStartX + 50) navigateToScreen(-1); // Swipe right to go back
}

function navigateToScreen(direction) {
    currentScreenIndex = (currentScreenIndex + direction + screens.length) % screens.length;
    showScreen(screens[currentScreenIndex]);
    updateDotsIndicator(currentScreenIndex);
}

function updateDotsIndicator(activeIndex) {
    const dots = document.querySelectorAll('.dots-indicator .dot');
    dots.forEach((dot, index) => {
        dot.className = index === activeIndex ? 'dot active' : 'dot';
    });
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });

    const screenToShow = document.getElementById(screenId);
    if (screenToShow) {
        screenToShow.classList.remove('hidden');
    }
}

function setupBurgerMenu() {
    const burgerMenuToggle = document.getElementById('burgerMenuToggle');
    const burgerMenu = document.getElementById('burgerMenu');

    if (burgerMenuToggle && burgerMenu) {
        burgerMenuToggle.addEventListener('click', () => {
            burgerMenu.style.display = burgerMenu.style.display === 'none' || burgerMenu.style.display === '' ? 'block' : 'none';
        });
    }
}

// Example function for submitting feedback
function submitFeedback() {
    alert("Feedback submitted. Thank you!");
    document.getElementById('feedbackText').value = '';
    showScreen('home');
    updateDotsIndicator(screens.indexOf('home'));
}

// Example function for sending a message
function sendMessage() {
    const input = document.getElementById('userInput');
    const chatContainer = document.getElementById('chatContainer');
    if (input && chatContainer) {
        const userMessage = document.createElement('p');
        userMessage.textContent = "You: " + input.value;
        chatContainer.appendChild(userMessage);

        const aiResponse = document.createElement('p');
        aiResponse.textContent = "AI Therapist: I understand. How does that make you feel?";
        chatContainer.appendChild(aiResponse);

        chatContainer.scrollTop = chatContainer.scrollHeight;
        input.value = '';
    }
}

// Emergency and doctor functions
function confirmEmergency() {
    showScreen('emergencyOptions');
    updateDotsIndicator(screens.indexOf('emergencyOptions'));
}

function callYourDoctor() {
    alert("Calling your doctor...");
}

function shareSOS() {
    alert("Sharing SOS...");
}

function call999() {
    alert("Calling 999...");
}
