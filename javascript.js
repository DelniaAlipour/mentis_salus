let touchStartX = 0;
let touchEndX = 0;
let navigationStack = ['home']; // Initialize with the home screen

// Function to handle swiping gestures
function handleGesture() {
    if (touchEndX < touchStartX) navigateForward();
    if (touchEndX > touchStartX) navigateBackward();
}

// Function to display a specific screen
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });

    const screenToShow = document.getElementById(screenId);
    if (screenToShow) {
        screenToShow.classList.remove('hidden');
        // Push only if it's a new screen
        if (navigationStack[navigationStack.length - 1] !== screenId) {
            navigationStack.push(screenId);
        }
    }
}

// Function to navigate back in the navigation stack
function goBack() {
    if (navigationStack.length > 1) {
        navigationStack.pop(); // Remove the current screen
        const previousScreenId = navigationStack[navigationStack.length - 1];
        showScreen(previousScreenId);
    }
}

// Function to navigate forward (placeholder for your navigation logic)
function navigateForward() {
    // Implement your logic to determine the next screen
    console.log("Navigate forward");
    // Example: showScreen('nextScreenId');
}

// Function to navigate backward
function navigateBackward() {
    goBack();
}

document.addEventListener('DOMContentLoaded', () => {
    // Swipe gesture event listeners
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleGesture();
    }, false);

    // Burger menu toggle
    document.getElementById('burgerMenuToggle').addEventListener('click', () => {
        const menu = document.getElementById('burgerMenu');
        menu.style.display = menu.style.display === 'none' || menu.style.display === '' ? 'block' : 'none';
    });
});

// Function to submit feedback
function submitFeedback() {
    alert("Feedback submitted. Thank you!");
    document.getElementById('feedbackText').value = '';
    showScreen('home');
}

// Function to send a message in the chat
function sendMessage() {
    const input = document.getElementById('userInput');
    const chatContainer = document.getElementById('chatContainer');

    const userMessage = document.createElement('p');
    userMessage.textContent = "You: " + input.value;
    chatContainer.appendChild(userMessage);

    const aiResponse = document.createElement('p');
    aiResponse.textContent = "AI Therapist: I understand. How does that make you feel?";
    chatContainer.appendChild(aiResponse);

    chatContainer.scrollTop = chatContainer.scrollHeight;
    input.value = '';
}

// Emergency and doctor functions
function confirmEmergency() { showScreen('emergencyOptions'); }
function callYourDoctor() { alert("Calling your doctor..."); }
function shareSOS() { alert("Sharing SOS..."); }
function call999() { alert("Calling 999..."); }
