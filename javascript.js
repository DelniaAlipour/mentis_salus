let touchStartX = 0;
let touchStartTime = 0;
let tapCount = 0;
const screens = ['home', 'emergencyOptions', 'interventionEngage', 'aiTherapistChat', 'connectTherapist']; // Added 'home' to screens
let currentScreenIndex = 0; // Start with 'home'

document.addEventListener('DOMContentLoaded', () => {
    setupTouchEvents();
    updateDotsIndicator(currentScreenIndex); // Initialize dots indicator
    setupBurgerMenu();
});

function setupTouchEvents() {
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartTime = Date.now();
    }, false);

    document.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].screenX;
        const touchEndTime = Date.now();
        const duration = touchEndTime - touchStartTime;

        if (duration < 300) { // Short touch duration suggests a tap
            handleTap();
        } else { // Longer duration suggests a swipe
            handleSwipe(touchEndX);
        }
    }, false);
}

function handleTap() {
    tapCount++;
    setTimeout(() => { tapCount = 0; }, 500); // Reset tap count after 500ms

    if (tapCount === 3) { // Triple tap detected
        tapCount = 0; // Reset tap count
        showScreen('emergencyOptions'); // Go to emergency screen
        updateDotsIndicator(screens.indexOf('emergencyOptions')); // Update indicator
    }
}

function handleSwipe(touchEndX) {
    let direction = touchEndX > touchStartX ? -1 : 1; // Determine swipe direction
    navigateToScreen(direction);
}

function navigateToScreen(direction) {
    currentScreenIndex = (currentScreenIndex + direction + screens.length) % screens.length;
    showScreen(screens[currentScreenIndex]);
    updateDotsIndicator(currentScreenIndex);
}

function updateDotsIndicator(activeIndex) {
    const dotsContainer = document.querySelector('.dots-indicator');
    dotsContainer.innerHTML = ''; // Clear existing dots

    screens.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'dot' + (index === activeIndex ? ' active' : '');
        dotsContainer.appendChild(dot);
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

    burgerMenuToggle?.addEventListener('click', () => {
        burgerMenu.style.display = burgerMenu.style.display === 'none' ? 'block' : 'none';
    });
}

function submitFeedback() {
    alert("Feedback submitted. Thank you!");
    document.getElementById('feedbackText').value = '';
    showScreen('home');
    updateDotsIndicator(screens.indexOf('home'));
}

function sendMessage() {
    const input = document.getElementById('userInput');
    const chatContainer = document.getElementById('chatContainer');

    if (input.value.trim()) {
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

function confirmEmergency() { showScreen('emergencyOptions'); updateDotsIndicator(screens.indexOf('emergencyOptions')); }
function callYourDoctor() { alert("Calling your doctor..."); }
function shareSOS() { alert("Sharing SOS..."); }
function call999() { alert("Calling 999..."); }
