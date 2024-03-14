let touchStartX = 0;
let touchStartTime = 0;
let tapCount = 0;
const screens = ['home','emergencyOptions', 'getHelp','aiTherapistChat', 'connectTherapist', 'informationGathered'];
let screenHistory = []; 

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
   
    if (direction === 1 && screenHistory.length > 1) {
        goBack();
    } else if (direction === -1) { 
        let currentScreenId = screenHistory[screenHistory.length - 1];
        let currentIndex = screens.indexOf(currentScreenId);
        let nextIndex = (currentIndex + 1) % screens.length; 
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
        screenHistory.pop(); 
        const previousScreenId = screenHistory[screenHistory.length - 1];
        showScreen(previousScreenId, false);
    }
}

function updateDotsIndicator() {
    const dotsContainer = document.querySelector('.dots-indicator');
    dotsContainer.innerHTML = ''; 
    screens.forEach((screen, index) => {
        const dot = document.createElement('span');
        dot.className = 'dot' + (screen === screenHistory[screenHistory.length - 1] ? ' active' : '');
        dotsContainer.appendChild(dot);
    });
}

function setupBurgerMenu() {
    const burgerMenuToggle = document.getElementById('burgerMenuToggle');
    const burgerMenu = document.getElementById('burgerMenu');

    // Initially hide the burger menu
    burgerMenu.style.display = 'none';

    if (burgerMenuToggle && burgerMenu) {
        burgerMenuToggle.addEventListener('click', (event) => {
            // Prevents the document click listener from immediately closing the menu
            event.stopPropagation();

            burgerMenu.style.display = burgerMenu.style.display === 'block' ? 'none' : 'block';
        });

        // Close the menu when a menu item is clicked
        Array.from(burgerMenu.children).forEach(item => {
            item.addEventListener('click', () => {
                burgerMenu.style.display = 'none';
            });
        });
    }

    // Close the burger menu when clicking anywhere outside the menu
    document.addEventListener('click', (event) => {
        if (burgerMenu.style.display === 'block' && !burgerMenu.contains(event.target)) {
            burgerMenu.style.display = 'none';
        }
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
function enableSensorSelection() {
    document.getElementById("heartRateCheckbox").disabled = false;
    document.getElementById("bodyTemperatureCheckbox").disabled = false;
    document.getElementById("vocalPatternCheckbox").disabled = false;
    document.getElementById("humidityCheckbox").disabled = false;
}
function saveDataCollectionPreferences() {
    var form = document.getElementById('dataCollectionForm');
    var formData = new FormData(form);
    var preferences = {};
    formData.forEach(function(value, key) {
        preferences[key] = value;
    });


    localStorage.setItem('dataCollectionPreferences', JSON.stringify(preferences));

  
    updateCheckboxVisualState();

    alert("Preferences saved.");
    showScreen('informationGathered');
}

function updateCheckboxVisualState() {
    document.querySelectorAll('#dataCollectionForm .checkbox-option').forEach(function(option) {
        var checkbox = option.querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
            option.style.color = 'inherit'; // Active color
        } else {
            option.style.color = '#cccccc'; // Faded color
        }
    });
}

function applyDataCollectionPreferences() {
    var preferences = JSON.parse(localStorage.getItem('dataCollectionPreferences') || '{}');
    document.querySelectorAll('#dataCollectionForm input[type="checkbox"]').forEach(function(checkbox) {
        checkbox.checked = preferences.hasOwnProperty(checkbox.id);
    });

  
    updateCheckboxVisualState();
}


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('informationGathered').addEventListener('show', applyDataCollectionPreferences);
});
