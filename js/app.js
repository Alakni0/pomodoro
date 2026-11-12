const timerDisplay = document.getElementById('timer-display')
const modeDisplay = document.getElementById('mode-display')
const toggleButton = document.getElementById('button-toggle')
const endButton = document.getElementById(`button-end`)

const SettingsButton = document.getElementById('button-settings');
const settingsPanel = document.getElementById('settings-panel');
const closeSettingsButton = document.getElementById('button-close-settings');
const saveSettingsButton = document.getElementById('button-save-settings');
const workInput = document.getElementById('work-input');
const breakInput = document.getElementById('break-input');
const longBreakInput = document.getElementById('long-break-input');

SettingsButton.addEventListener('click', () => {
    settingsPanel.classList.toggle('show');
});

closeSettingsButton.addEventListener('click', () => {
    settingsPanel.classList.remove('show');
});

saveSettingsButton.addEventListener('click', () => {
    const newWorkTime = parseInt(workInput.value);
    const newBreakTime = parseInt(breakInput.value);
    const newLongBreakTime = parseInt(longBreakInput.value);

    if (newWorkTime > 0 && newBreakTime > 0 && newLongBreakTime > 0) {

        timerConfig.settings.workTime = newWorkTime;
        timerConfig.settings.shortBreak = newBreakTime;
        timerConfig.settings.longBreak = newLongBreakTime;

        clearInterval(timerConfig.timeInterval);
        timerConfig.isRunning = false;
        timerConfig.isPaused = false;
        timerConfig.mode = 'work';
        timerConfig.timeLeft = timerConfig.settings.workTime * 60;

        updateTime();

        settingsPanel.classList.remove('show');
    } else {
        alert("Time must be larger than 0!");
    }
});

toggleButton.addEventListener(`click` , () => {
    if(timerConfig.isRunning) {
        pauseTimer()
    }
    else {
        startTimer()
    }
    updateTime()
})

function updateTime(){
    timerDisplay.innerText = formatTime(timerConfig.timeLeft);

    let modeText=""
    if(timerConfig.mode==='work')
        modeText="study time"
    else if (timerConfig.mode==='shortBreak')
        modeText="short break"
    else
        modeText="long break"

    modeDisplay.innerText=modeText

    if (timerConfig.isRunning) {
        toggleButton.innerText = "Pause"
    }
    else if (timerConfig.isPaused) {
        toggleButton.innerText = "Resume"
    }
    else {
        toggleButton.innerText = "Start"
    }
}

endButton.addEventListener(`click`,() => {
    const isSure = confirm("Are you sure you want to end this session?")

    if(isSure) {
        stopTimer()
    }
})