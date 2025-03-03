// Mock data
const mockUsers = [
  { id: 'user1', phone: '+15551234567', role: 'worker', language: 'en' },
  { id: 'user2', phone: '+15559876543', role: 'supervisor', language: 'en' }
];

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const userInfoScreen = document.getElementById('user-info-screen');
const workerScreen = document.getElementById('worker-screen');
const taskScreen = document.getElementById('task-screen');
const taskCompletionScreen = document.getElementById('task-completion-screen');
const supervisorScreen = document.getElementById('supervisor-screen');

const phoneInput = document.getElementById('phone');
const sendCodeBtn = document.getElementById('send-code-btn');
const verificationForm = document.getElementById('verification-form');
const codeInput = document.getElementById('code');
const verifyBtn = document.getElementById('verify-btn');
const signupBtn = document.getElementById('signup-btn');
const completeSignupBtn = document.getElementById('complete-signup-btn');

const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');

const roleToggles = document.querySelectorAll('[data-role]');
const languageToggles = document.querySelectorAll('[data-language]');

const taskItems = document.querySelectorAll('.task-item');
const taskImage = document.getElementById('task-image');
const taskTitle = document.getElementById('task-title');
const startPauseBtn = document.getElementById('start-pause-btn');
const stopBtn = document.getElementById('stop-btn');
const timerDisplay = document.querySelector('.timer');

// Task completion elements
const completionTaskName = document.getElementById('completion-task-name');
const completionDuration = document.getElementById('completion-duration');
const takePhotoBtn = document.getElementById('take-photo-btn');
const photoPreview = document.getElementById('photo-preview');
const photoPreviewImg = document.getElementById('photo-preview-img');
const recordVoiceBtn = document.getElementById('record-voice-btn');
const voicePreview = document.getElementById('voice-preview');
const submitTaskBtn = document.getElementById('submit-task-btn');

const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// State
let isSigningUp = false;
let isVerifying = false;
let currentUser = null;
let currentTask = null;
let timerInterval = null;
let startTime = null;
let elapsedTime = 0;
let pausedTime = 0;
let isRunning = false;
let hasPhoto = false;
let hasVoiceNote = false;
let isRecording = false;
let selectedRole = 'worker';
let selectedLanguage = 'en';

// Functions
function showScreen(screen) {
  loginScreen.classList.remove('active');
  userInfoScreen.classList.remove('active');
  workerScreen.classList.remove('active');
  taskScreen.classList.remove('active');
  taskCompletionScreen.classList.remove('active');
  supervisorScreen.classList.remove('active');
  
  screen.classList.add('active');
}

function sendVerificationCode() {
  const phone = phoneInput.value.trim();
  
  if (!phone) {
    alert('Please enter a phone number');
    return;
  }
  
  // Check if user exists
  const formattedPhone = phone.startsWith('+') ? phone : '+1' + phone;
  const userExists = mockUsers.some(u => u.phone === formattedPhone);
  
  // Show signup button if user doesn't exist
  if (!userExists) {
    signupBtn.classList.remove('hidden');
  } else {
    signupBtn.classList.add('hidden');
  }
  
  // Mock verification code
  const verificationCode = '123456';
  alert(`Your verification code is: ${verificationCode}`);
  
  verificationForm.classList.remove('hidden');
  isVerifying = true;
}

function verifyCode() {
  const code = codeInput.value.trim();
  
  if (!code) {
    alert('Please enter the verification code');
    return;
  }
  
  // Mock verification (in a real app, this would validate against a server)
  if (code === '123456') {
    const phone = phoneInput.value.trim();
    const formattedPhone = phone.startsWith('+') ? phone : '+1' + phone;
    
    // Check if user exists
    const user = mockUsers.find(u => u.phone === formattedPhone);
    
    if (user) {
      // Login successful
      currentUser = user;
      
      if (user.role === 'worker') {
        showScreen(workerScreen);
      } else if (user.role === 'supervisor') {
        showScreen(supervisorScreen);
      }
    } else {
      // User doesn't exist, show signup button
      signupBtn.classList.remove('hidden');
      alert('No account found. Please sign up.');
    }
  } else {
    alert('Invalid verification code');
  }
}

function signup() {
  isSigningUp = true;
  
  // Show user info screen for signup
  showScreen(userInfoScreen);
}

function completeSignup() {
  // Validate first and last name
  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  
  if (!firstName || !lastName) {
    alert('Please enter your first and last name');
    return;
  }
  
  // Create new user with selected preferences
  const phone = phoneInput.value.trim();
  const formattedPhone = phone.startsWith('+') ? phone : '+1' + phone;
  
  const newUser = {
    id: 'user' + Date.now(),
    phone: formattedPhone,
    firstName: firstName,
    lastName: lastName,
    role: selectedRole,
    language: selectedLanguage
  };
  
  mockUsers.push(newUser);
  currentUser = newUser;
  
  // Navigate based on role
  if (selectedRole === 'supervisor') {
    showScreen(supervisorScreen);
  } else {
    showScreen(workerScreen);
  }
}

function selectRole(event) {
  const role = event.target.dataset.role;
  selectedRole = role;
  
  // Update UI
  roleToggles.forEach(toggle => {
    if (toggle.dataset.role === role) {
      toggle.classList.add('active');
    } else {
      toggle.classList.remove('active');
    }
  });
}

function selectLanguage(event) {
  const language = event.target.dataset.language;
  selectedLanguage = language;
  
  // Update UI
  languageToggles.forEach(toggle => {
    if (toggle.dataset.language === language) {
      toggle.classList.add('active');
    } else {
      toggle.classList.remove('active');
    }
  });
}

function selectTask(taskType) {
  currentTask = taskType;
  
  // Set task details
  const taskImages = {
    mowing: 'https://i.ibb.co/G3GhFqtf/Mower.png',
    trash: 'https://i.ibb.co/ZCSyQYC/wastemgmt.png',
    trimming: 'https://i.ibb.co/hFHK2bvG/Trimmer.png',
    blowing: 'https://i.ibb.co/cc9TLg4q/Blower-icon.png',
    safety: 'https://i.ibb.co/xSkXpDsh/Safety-Construction.png'
  };
  
  const taskTitles = {
    mowing: 'Mowing',
    trash: 'Trash Collection',
    trimming: 'Trimming',
    blowing: 'Leaf Blowing',
    safety: 'Safety Inspection'
  };
  
  taskImage.src = taskImages[taskType];
  taskTitle.textContent = taskTitles[taskType];
  
  // Reset timer
  resetTimer();
  
  // Show task screen
  showScreen(taskScreen);
}

function toggleTimer() {
  if (!isRunning) {
    startTimer();
    startPauseBtn.textContent = 'Pause';
    startPauseBtn.classList.remove('primary');
    startPauseBtn.classList.add('danger');
    stopBtn.classList.remove('hidden');
  } else {
    pauseTimer();
    startPauseBtn.textContent = 'Resume';
    startPauseBtn.classList.add('primary');
    startPauseBtn.classList.remove('danger');
  }
}

function startTimer() {
  if (!startTime) {
    startTime = new Date();
  }
  
  isRunning = true;
  
  timerInterval = setInterval(() => {
    const now = new Date();
    elapsedTime = now.getTime() - startTime.getTime() - pausedTime;
    updateTimerDisplay();
  }, 1000);
}

function pauseTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    pausedTime += new Date().getTime() - startTime.getTime();
  }
  
  isRunning = false;
}

function stopTimer() {
  pauseTimer();
  
  // Show task completion screen
  showTaskCompletionScreen();
}

function showTaskCompletionScreen() {
  // Set task completion details
  completionTaskName.textContent = taskTitle.textContent;
  completionDuration.textContent = `Duration: ${timerDisplay.textContent}`;
  
  // Reset photo and voice note
  hasPhoto = false;
  hasVoiceNote = false;
  photoPreview.classList.add('hidden');
  voicePreview.classList.add('hidden');
  
  // Show completion screen
  showScreen(taskCompletionScreen);
}

function takePhoto() {
  // In a real app, this would access the device camera
  // For demo, we'll use a placeholder image
  photoPreviewImg.src = 'https://picsum.photos/400/300';
  photoPreview.classList.remove('hidden');
  hasPhoto = true;
}

function recordVoice() {
  if (isRecording) {
    // Stop recording
    recordVoiceBtn.textContent = 'Record';
    voicePreview.classList.remove('hidden');
    isRecording = false;
    hasVoiceNote = true;
  } else {
    // Start recording
    recordVoiceBtn.textContent = 'Stop Recording';
    isRecording = true;
    
    // In a real app, this would start recording audio
    // For demo, we'll simulate a short recording
    setTimeout(() => {
      if (isRecording) {
        recordVoice(); // Stop recording after 3 seconds
      }
    }, 3000);
  }
}

function submitTask() {
  // In a real app, this would save the task data to the server
  
  // Create a message based on what was included
  let message = `Task submitted: ${completionTaskName.textContent}\nDuration: ${timerDisplay.textContent}`;
  
  if (hasPhoto) {
    message += '\nPhoto included';
  }
  
  if (hasVoiceNote) {
    message += '\nVoice note included';
  }
  
  alert(message);
  
  // Reset and return to worker screen
  resetTimer();
  showScreen(workerScreen);
}

function resetTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  
  startTime = null;
  elapsedTime = 0;
  pausedTime = 0;
  isRunning = false;
  
  updateTimerDisplay();
  
  startPauseBtn.textContent = 'Start Work';
  startPauseBtn.classList.add('primary');
  startPauseBtn.classList.remove('danger');
  stopBtn.classList.add('hidden');
}

function updateTimerDisplay() {
  const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
  
  timerDisplay.textContent = `${hours.toString().padStart(2, '0')}:${
    minutes.toString().padStart(2, '0')}:${
    seconds.toString().padStart(2, '0')}`;
}

function switchTab(tabName) {
  // Update tab buttons
  tabButtons.forEach(btn => {
    if (btn.dataset.tab === tabName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // Update tab content
  tabContents.forEach(content => {
    if (content.id === `${tabName}-tab`) {
      content.classList.add('active');
    } else {
      content.classList.remove('active');
    }
  });
}

// Event Listeners
sendCodeBtn.addEventListener('click', sendVerificationCode);
verifyBtn.addEventListener('click', verifyCode);
signupBtn.addEventListener('click', signup);
completeSignupBtn.addEventListener('click', completeSignup);

// Role and language selection
roleToggles.forEach(toggle => {
  toggle.addEventListener('click', selectRole);
});

languageToggles.forEach(toggle => {
  toggle.addEventListener('click', selectLanguage);
});

taskItems.forEach(item => {
  item.addEventListener('click', () => {
    selectTask(item.dataset.task);
  });
});

startPauseBtn.addEventListener('click', toggleTimer);
stopBtn.addEventListener('click', stopTimer);

takePhotoBtn.addEventListener('click', takePhoto);
recordVoiceBtn.addEventListener('click', recordVoice);
submitTaskBtn.addEventListener('click', submitTask);

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    switchTab(btn.dataset.tab);
  });
});

// Initialize
showScreen(loginScreen);
console.log('App initialized');