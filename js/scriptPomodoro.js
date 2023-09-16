const clock = document.getElementById('clock')
const timer = document.getElementById('timer')
const button = document.querySelectorAll('button')[0]
const pWork = document.getElementById('pWork')
const pPause = document.getElementById('pPause')

let workInput
let pauseInput
let workTime
let pauseTime
let time
let active = true
let running = false


function run() {
    let interval = setInterval(updateTime, 1000)
}

function updateClock() { //used to update the state of the pie chart used as a clock display
    let pie
    if(active) {
        pie = 360 * time / workTime
    }
    else {
        pie = 360 * time / pauseTime
    }

    clock.style.backgroundImage = ''.concat('conic-gradient(crimson ', pie, 'deg, black 0)')
}

button.addEventListener('click', () => {
    if(!running) {
        setUp()
    }
    else {
        reset()
    }
})

function setUp() {
    workInput = document.getElementById('workTime').value
    pauseInput = document.getElementById('pauseTime').value
    workTime = workInput * 60
    pauseTime = pauseInput * 60
    time = workTime
    time++
    updateTime()
    updateModeDisplay()
    run()
    running = true
}

function reset() {
    location.reload()
}

function updateTime() { //used to update the timer, decrement the time variable and transform it from seconds to minutes/seconds
    time--
    if(time < 0) { //time ran out
        if(active) { //switching to pause
           active = false
           time = pauseTime
        }
        else { //switching to work
           active = true
           time = workTime
        }
        updateModeDisplay()
   }
    const minutes = Math.floor(time / 60) //transforming seconds only to minutes/seconds
    const seconds = time - minutes * 60
    let str = ''
    if(minutes.toString().length < 2) { //handling the format of minutes
        str += '0' + minutes.toString()
    }
    else {
        str += minutes.toString()
    }
    str += ':'
    if(seconds.toString().length < 2) { //handling the format of seconds
        str += '0' + seconds.toString()
    }
    else {
        str += seconds.toString()
    }
    timer.innerText = str
    updateClock()
}

function updateModeDisplay() { //used to update the color of the mode the application is in
    if(active) {
        pWork.style.color = 'crimson'
        pPause.style.color = 'white'
    }
    else {
        pWork.style.color = 'white'
        pPause.style.color = 'crimson'
    }
}