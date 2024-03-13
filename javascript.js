

    
let navigationStack = [];

function showScreen(screenId) {
document.querySelectorAll('.screen').forEach(function(screen) {
screen.classList.add('hidden');
});


const screen = document.getElementById(screenId);
if (screen) {
screen.classList.remove('hidden');
navigationStack.push(screenId);
}
}

function goBack() {
navigationStack.pop();

const previousScreenId = navigationStack[navigationStack.length - 1];


if (previousScreenId) {
showScreen(previousScreenId);
}
}

function confirmEmergency() {
    showScreen('emergencyOptions');
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



document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('burgerMenuToggle').addEventListener('click', function() {
        var menu = document.getElementById('burgerMenu');
        if (menu.style.display === 'none' || menu.style.display === '') {
            menu.style.display = 'block';
        } else {
            menu.style.display = 'none';
        }
    });
});

function submitFeedback() {

alert("Feedback submitted. Thank you!");

document.getElementById('feedbackText').value = '';

showScreen('home');
}
function sendMessage() {
var input = document.getElementById('userInput');
var chatContainer = document.getElementById('chatContainer');


var userMessage = document.createElement('p');
userMessage.textContent = "You: " + input.value;
chatContainer.appendChild(userMessage);

var aiResponse = document.createElement('p');
aiResponse.textContent = "AI Therapist: I understand. How does that make you feel?";
chatContainer.appendChild(aiResponse);

chatContainer.scrollTop = chatContainer.scrollHeight;
input.value = '';
}
