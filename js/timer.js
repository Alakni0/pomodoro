const workEndSound = new Audio('assets/work-end.wav')
const breakEndSound = new Audio('assets/break-end.wav')
const timerConfig = {
    settings: {
        workTime: 45,
        shortBreakTime: 5,
        longBreakTime: 10,
        longBreakInterval: 4
    },
    timeLeft: 0,
    isRunning: false,
    isPaused: false,
    timeInterval: 0,
    expectedEndTime: null,
    mode: 'work', //'work', 'shortBreak', 'longBreak'
    sessionCount: 0, //do długich przerw
}

function formatTime(time) {
    let minute = Math.floor(time / 60)
    let secund = time % 60
    secund = String(secund).padStart(2,"0")
    return `${minute}:${secund}`
}

function getModeTime() {
    switch (timerConfig.mode) {
        case 'work':
            return timerConfig.settings.workTime;

        case 'shortBreak':
            return timerConfig.settings.shortBreakTime;

        case 'longBreak':
            return timerConfig.settings.longBreakTime;

        default:
            return timerConfig.settings.workTime;
    }
}


function startTimer() {
    if (timerConfig.isRunning) return;

    timerConfig.isPaused = false;

    if (timerConfig.timeLeft <= 0) {
        timerConfig.timeLeft = getModeTime() * 60;
    }

    timerConfig.isRunning = true;
    timerConfig.expectedEndTime = Date.now() + (timerConfig.timeLeft * 1000);

    timerConfig.timeInterval = setInterval(() => {
        timerConfig.timeLeft = Math.max(
            0,
            Math.ceil((timerConfig.expectedEndTime - Date.now()) / 1000)
        );

        updateTime();

        if (timerConfig.timeLeft <= 0) {

            if (timerConfig.mode === 'work') {
                workEndSound.play();

                timerConfig.sessionCount++;

                if (timerConfig.sessionCount % timerConfig.settings.longBreakInterval === 0) {
                    timerConfig.mode = 'longBreak';
                }
                else {
                    timerConfig.mode = 'shortBreak';
                }

                timerConfig.timeLeft = getModeTime() * 60;
                timerConfig.expectedEndTime = Date.now() + (timerConfig.timeLeft * 1000);

                updateTime();
            }
            else {
                breakEndSound.play();

                clearInterval(timerConfig.timeInterval);
                timerConfig.timeInterval = null;

                timerConfig.mode = 'work';
                timerConfig.timeLeft = getModeTime() * 60;
                timerConfig.expectedEndTime = null;

                timerConfig.isRunning = false;
                timerConfig.isPaused = false;

                updateTime();
            }
        }
    }, 1000);
}


function pauseTimer(){
    if (!timerConfig.isRunning) return
    timerConfig.timeLeft = Math.max(0, Math.ceil((timerConfig.expectedEndTime - Date.now()) / 1000))
    clearInterval(timerConfig.timeInterval)
    timerConfig.timeInterval = null
    timerConfig.isRunning=false;
    timerConfig.isPaused = true;
    updateTime();
}

function stopTimer() {
    clearInterval(timerConfig.timeInterval);

    timerConfig.timeInterval = null
    timerConfig.expectedEndTime = null
    timerConfig.isRunning = false;
    timerConfig.isPaused = false;
    timerConfig.mode = 'work'
    timerConfig.timeLeft = timerConfig.settings.workTime * 60;

    updateTime();
}