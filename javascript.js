let touchStartX = 0;
let touchStartTime = 0;
let tapCount = 0;
const screens = ['home','emergencyOptions', 'getHelp','interventionEngage', 'interventionEngage1', 'interventionEngage2', 'aiTherapistChat', 'connectTherapist', 'informationGathered'];
let screenHistory = []; // Stack to keep track of navigation history

document.addEventListener('DOMContentLoaded', () => {
    setupTouchEvents();
    setupBurgerMenu();
    showScreen('home'); 
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

        if (duration < 300) { 
            handleTap();
        } else { 
            handleSwipe(touchEndX);
        }
    }, false);
}

function handleTap() {
    tapCount++;
    if (tapCount === 3) {
        setTimeout(() => { tapCount = 0; }, 500);
        showScreen('emergencyOptions');
    } else {
        setTimeout(() => { tapCount = 0; }, 500);
    }
}

function handleSwipe(touchEndX) {
    let direction = touchEndX > touchStartX ? 1 : -1;
    navigateToScreen(direction);
}

function navigateToScreen(direction) {
    // Swiping back - Go to the previous screen in history
    if (direction === 1 && screenHistory.length > 1) {
        goBack();
    } else if (direction === -1) { // Swiping forward - Go to the next screen in a predefined order
        let currentScreenId = screenHistory[screenHistory.length - 1];
        let currentIndex = screens.indexOf(currentScreenId);
        let nextIndex = (currentIndex + 1) % screens.length; // Cycle through the screens
        showScreen(screens[nextIndex]);
    }
}


function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });

    const screenToShow = document.getElementById(screenId);
    if (screenToShow) {
        screenToShow.classList.remove('hidden');
        updateNavigationHistory(screenId);
        updateDotsIndicator();
    }
}

function updateNavigationHistory(screenId) {
    if (screenHistory[screenHistory.length - 1] !== screenId) {
        screenHistory.push(screenId);
    }
}

function goBack() {
    if (screenHistory.length > 1) {
        screenHistory.pop(); // Remove current screen
        const previousScreenId = screenHistory[screenHistory.length - 1];
        showScreen(previousScreenId, false);
    }
}

function updateDotsIndicator() {
    const dotsContainer = document.querySelector('.dots-indicator');
    dotsContainer.innerHTML = ''; // Clear existing dots

    screens.forEach((screen, index) => {
        const dot = document.createElement('span');
        dot.className = 'dot' + (screen === screenHistory[screenHistory.length - 1] ? ' active' : '');
        dotsContainer.appendChild(dot);
    });
}

function setupBurgerMenu() {
    const burgerMenuToggle = document.getElementById('burgerMenuToggle');
    const burgerMenu = document.getElementById('burgerMenu');

    if (burgerMenuToggle && burgerMenu) {
        burgerMenuToggle.addEventListener('click', () => {
            // Toggle display of the burger menu
            if (burgerMenu.style.display === 'none' || !burgerMenu.style.display) {
                burgerMenu.style.display = 'block';
            } else {
                burgerMenu.style.display = 'none';
            }
        });
    }
}


// Feedback, sendMessage, and other functions remain unchanged


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