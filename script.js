document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Element Selections ---
  const stopwatchScreen = document.getElementById("stopwatch-screen");
  const timerScreen = document.getElementById("timer-screen");
  const navTimer = document.getElementById("nav-timer");
  const navStopwatch = document.getElementById("nav-stopwatch");

  // --- Stopwatch Elements ---
  const stopwatchDisplay = document.getElementById("stopwatch-display");
  const startStopBtn = document.getElementById("stopwatch-start-stop-btn");
  const lapResetBtn = document.getElementById("stopwatch-lap-reset-btn");
  const lapsContainer = document.getElementById("laps-container");

  // --- Timer Elements ---
  const timerPickerArea = document.getElementById("timer-picker-area");
  const timerDisplayArea = document.getElementById("timer-display-area");
  const timerCountdownDisplay = document.getElementById("timer-countdown-display");
  const timerProgressCircle = document.getElementById("timer-progress-circle");
  const timerProgressBar = document.getElementById("timer-progress-bar");
  const timerRemainingText = document.getElementById("timer-remaining-text");
  const timerStartPauseBtn = document.getElementById("timer-start-pause-btn");
  const timerResetBtn = document.getElementById("timer-reset-btn");
  const timerInput = document.getElementById("timer-input");
  const timerPreviewText = document.getElementById("timer-preview-text");
  const timerPresets = document.querySelectorAll(".timer-preset");

  // --- Stopwatch State ---
  let stopwatchInterval = null;
  let startTime = 0;
  let elapsedTime = 0;
  let laps = [];
  let lapCounter = 1;

  // --- Timer State ---
  let timerInterval = null;
  let timeRemaining = 0;
  let isTimerRunning = false;
  let timerDuration = 0;
  let initialDuration = 0;

  // --- Utility Functions ---
  const formatStopwatchTime = (ms) => {
    const date = new Date(ms);
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const centiseconds = String(Math.floor(date.getMilliseconds() / 10)).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}.${centiseconds}`;
  };
  
  const formatTimerCountdown = (totalSeconds) => {
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // --- Stopwatch Logic ---
  const updateStopwatch = () => {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    stopwatchDisplay.textContent = formatStopwatchTime(elapsedTime);
  };

  const startStopwatch = () => {
    if (stopwatchInterval) { // Stop
      clearInterval(stopwatchInterval);
      stopwatchInterval = null;
      startStopBtn.querySelector("span").textContent = "Start";
      lapResetBtn.querySelector("span").textContent = "Reset";
    } else { // Start
      startTime = Date.now() - elapsedTime;
      stopwatchInterval = setInterval(updateStopwatch, 10);
      startStopBtn.querySelector("span").textContent = "Stop";
      lapResetBtn.querySelector("span").textContent = "Lap";
    }
  };

  const resetStopwatch = () => {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    elapsedTime = 0;
    laps = [];
    lapCounter = 1;
    stopwatchDisplay.textContent = "00:00:00.00";
    lapsContainer.innerHTML = "";
    startStopBtn.querySelector("span").textContent = "Start";
    lapResetBtn.querySelector("span").textContent = "Lap";
  };

  const recordLap = () => {
    if (!stopwatchInterval) return;
    const lapTime = elapsedTime;
    const lastLapTime = laps.length > 0 ? laps[laps.length - 1].totalTime : 0;
    const currentLapDuration = lapTime - lastLapTime;
    laps.push({ lap: lapCounter, time: formatStopwatchTime(currentLapDuration), totalTime: lapTime });

    const lapElement = document.createElement("div");
    lapElement.className = "flex items-center gap-4 bg-[#121417] px-4 min-h-14 justify-between";
    lapElement.innerHTML = `
      <p class="text-white text-base font-normal leading-normal flex-1 truncate">Lap ${lapCounter}</p>
      <div class="shrink-0"><p class="text-white text-base font-normal leading-normal">${formatStopwatchTime(currentLapDuration)}</p></div>
    `;
    lapsContainer.prepend(lapElement);
    lapCounter++;
  };

  // --- Timer Logic ---
  const parseTimeInput = (input) => {
      if (!input.trim()) return 0;
      
      // Remove extra spaces and make lowercase
      input = input.toLowerCase().replace(/\s+/g, ' ').trim();
      
      let totalSeconds = 0;
      
      // Match patterns like "1h", "30m", "45s", "1h 30m", "2h 15m 30s", etc.
      const patterns = [
          { regex: /(\d+(?:\.\d+)?)\s*h(?:ours?)?/g, multiplier: 3600 },
          { regex: /(\d+(?:\.\d+)?)\s*m(?:in(?:utes?)?)?/g, multiplier: 60 },
          { regex: /(\d+(?:\.\d+)?)\s*s(?:ec(?:onds?)?)?/g, multiplier: 1 }
      ];
      
      patterns.forEach(({ regex, multiplier }) => {
          let match;
          while ((match = regex.exec(input)) !== null) {
              totalSeconds += parseFloat(match[1]) * multiplier;
          }
      });
      
      // If no units found, treat as seconds
      if (totalSeconds === 0 && /^\d+(?:\.\d+)?$/.test(input)) {
          totalSeconds = parseFloat(input);
      }
      
      return Math.floor(totalSeconds);
  };
  
  const updateTimerPreview = () => {
      const seconds = parseTimeInput(timerInput.value);
      timerDuration = seconds;
      timerPreviewText.textContent = formatTimerCountdown(seconds);
  };
  
  const setTimerPreset = (seconds) => {
      timerDuration = seconds;
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      
      let timeStr = '';
      if (hours > 0) timeStr += `${hours}h `;
      if (minutes > 0) timeStr += `${minutes}m `;
      if (secs > 0 || (hours === 0 && minutes === 0)) timeStr += `${secs}s`;
      
      timerInput.value = timeStr.trim();
      updateTimerPreview();
  };

  const updateTimerVisuals = () => {
      // Update countdown display
      timerCountdownDisplay.textContent = formatTimerCountdown(timeRemaining);
      
      // Calculate progress percentage
      const progress = initialDuration > 0 ? (timeRemaining / initialDuration) : 0;
      
      // Update circular progress (circumference = 2 * π * radius = 2 * π * 85 ≈ 534.07)
      const circumference = 534.07;
      const offset = circumference - (progress * circumference);
      timerProgressCircle.style.strokeDashoffset = offset;
      
      // Update progress bar
      timerProgressBar.style.width = `${progress * 100}%`;
      
      // Update remaining text with more descriptive info
      if (timeRemaining > 0) {
          const hours = Math.floor(timeRemaining / 3600);
          const minutes = Math.floor((timeRemaining % 3600) / 60);
          const seconds = timeRemaining % 60;
          
          let remainingText = '';
          if (hours > 0) {
              remainingText = `${hours} hour${hours > 1 ? 's' : ''} remaining`;
          } else if (minutes > 0) {
              remainingText = `${minutes} minute${minutes > 1 ? 's' : ''} remaining`;
          } else {
              remainingText = `${seconds} second${seconds > 1 ? 's' : ''} remaining`;
          }
          timerRemainingText.textContent = remainingText;
      } else {
          timerRemainingText.textContent = 'Timer finished';
      }
  };

  const tick = () => {
    timeRemaining--;
    updateTimerVisuals();
    
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      isTimerRunning = false;
      // Use a more modern notification if available, otherwise alert
      if ('Notification' in window && Notification.permission === 'granted') {
          new Notification("Time's up!");
      } else {
          alert("Time's up!");
      }
      resetTimer();
    }
  };

  const startPauseTimer = () => {
      if (!isTimerRunning) { // Start or Resume
          if (timeRemaining === 0) { // If starting from scratch
              timeRemaining = timerDuration;
              initialDuration = timerDuration;
          }
          if (timeRemaining <= 0) return; // Don't start if time is zero

          isTimerRunning = true;
          timerInterval = setInterval(tick, 1000);
          timerStartPauseBtn.querySelector('span').textContent = 'Pause';
          timerPickerArea.classList.add('hidden');
          timerDisplayArea.classList.remove('hidden');
          timerDisplayArea.classList.add('flex');
          updateTimerVisuals();

      } else { // Pause
          isTimerRunning = false;
          clearInterval(timerInterval);
          timerInterval = null;
          timerStartPauseBtn.querySelector('span').textContent = 'Resume';
      }
  };
  
  const resetTimer = () => {
      clearInterval(timerInterval);
      timerInterval = null;
      isTimerRunning = false;
      timeRemaining = 0;
      initialDuration = 0;
      timerStartPauseBtn.querySelector('span').textContent = 'Start';
      timerPickerArea.classList.remove('hidden');
      timerDisplayArea.classList.add('hidden');
      timerDisplayArea.classList.remove('flex');
      
      // Reset visual elements
      timerProgressCircle.style.strokeDashoffset = '534.07';
      timerProgressBar.style.width = '100%';
  };

  // --- Navigation Logic ---
  const setActiveNav = (activeElement, inactiveElement) => {
      const activeIconContainer = activeElement.querySelector('[data-icon]');
      const inactiveIconContainer = inactiveElement.querySelector('[data-icon]');

      activeElement.classList.remove('text-[#a1aab5]');
      activeElement.classList.add('text-white');
      inactiveElement.classList.remove('text-white');
      inactiveElement.classList.add('text-[#a1aab5]');

      activeIconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256"><path d="M128,40a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,40Zm45.66,61.66-40,40a8,8,0,0,1-11.32-11.32l40-40a8,8,0,0,1,11.32,11.32ZM96,16a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H104A8,8,0,0,1,96,16Z"></path></svg>`;
      inactiveIconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256"><path d="M128,40a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,40Zm0,176a80,80,0,1,1,80-80A80.09,80.09,0,0,1,128,216ZM173.66,90.34a8,8,0,0,1,0,11.32l-40,40a8,8,0,0,1-11.32-11.32l40-40A8,8,0,0,1,173.66,90.34ZM96,16a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H104A8,8,0,0,1,96,16Z"></path></svg>`;
  }

  // --- Event Listeners ---
  startStopBtn.addEventListener("click", startStopwatch);
  lapResetBtn.addEventListener("click", () => {
    if (stopwatchInterval) {
      recordLap();
    } else {
      resetStopwatch();
    }
  });

  timerStartPauseBtn.addEventListener('click', startPauseTimer);
  timerResetBtn.addEventListener('click', resetTimer);
  
  // Timer input and preset event listeners
  timerInput.addEventListener('input', updateTimerPreview);
  timerPresets.forEach(preset => {
      preset.addEventListener('click', () => {
          setTimerPreset(parseInt(preset.dataset.seconds));
      });
  });

  navTimer.addEventListener("click", (e) => {
    e.preventDefault();
    timerScreen.classList.remove("hidden");
    stopwatchScreen.classList.add("hidden");
    setActiveNav(navTimer, navStopwatch);
  });

  navStopwatch.addEventListener("click", (e) => {
    e.preventDefault();
    stopwatchScreen.classList.remove("hidden");
    timerScreen.classList.add("hidden");
    setActiveNav(navStopwatch, navTimer);
  });

  // --- Initial Setup ---
  updateTimerPreview();
  // Request notification permission on load
  if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission();
  }
});
