import './css/styles.css';
import './images/turing-logo.png'
import UserRepository from './UserRepository';
import User from './User';
import { fetchAll } from './apiCalls';
import HydrationRepository from './HydrationRepository';
import SleepRepository from './SleepRepository';
import Chart from 'chart.js/auto'

// QUERYSELECTORS
const dateInput = document.querySelector(".date-input");

// GLOBAL VARIABLES
let users;
let userRepo;
let hydroRepo;
let sleepRepo;
let sleep;
let hydration;
let singleUser;
const getFetch = () => {
    fetchAll()
    .then(data => {
        users = data[0].userData;
        sleep = data[1].sleepData;
        hydration = data[2].hydrationData;
        userRepo = new UserRepository(users);
        singleUser = new User(users[getRandomUser()]);
        hydroRepo = new HydrationRepository(hydration);
        sleepRepo = new SleepRepository(sleep);
        welcomeUser();
        displayUserInfo();
        displayHydrationInfo();
        displaySleepInfo();
        createCharts()
    })
};

//  EventListeners
window.addEventListener('load', getFetch);
sleepCalendarSection.addEventListener("click", handleButtons);

function handleButtons(event) {
    switch (event.target.className) {
      case "show-sleep-btn":
        updateHydrationInfo(event);
        updateSleepInfo(event);
        break;
      case "reset-sleep-btn":
        displayHydrationInfo(event); 
        displaySleepInfo(event);
        // destroyChart(event)
        // break;
        // case "reset-sleep-btn":
        break;
      default:
        break;
    }
  };

const welcomeUser = () => {
    let greeting = document.querySelector('.welcome-customer');
    greeting.innerText = `${singleUser.returnUserName()}`;
    let steps = document.querySelector('.daily-steps');
    steps.innerText = `${singleUser.name.split(" ")[0]}'s Steps: ${singleUser.dailyStepGoal}
    Group Average: ${userRepo.allUsersAverageSteps()}`;
};

const displayUserInfo = () => {
    let userCard = document.querySelector('.user-card');
    let userName = document.querySelector('#name')
    let userAddress = document.querySelector('#address')
    let userEmail = document.querySelector('#email')
    let userStride = document.querySelector('#stride')
    let userStepGoal = document.querySelector('#stepGoal')
    let userFriends = document.querySelector('#friends')
    userName.innerText = `${singleUser.name}`
    userAddress.innerText = `${singleUser.address}`
    userEmail.innerText = `${singleUser.email}`
    userStride.innerText = `${singleUser.strideLength}`
    userStepGoal.innerText = `${singleUser.dailyStepGoal}`
    userFriends.innerText = `${userRepo.parseFriends(singleUser.id)}`
}

const findDate = () => {
    let id = singleUser.id;
    let allSleepData = sleepRepo.sleepData.filter(user => user.userID === id);
    const getDates = allSleepData.map(user => user.date).pop();
    return getDates;
};

const displayHydrationInfo = () => {
    let hydroCard = document.querySelector('.hydration-card')
    let avgOunces = document.querySelector('#averageOuncesDrank')
    let dailyOunces = document.querySelector('#dailyOunces')
    let weeklyOunces = document.querySelector('#weeklyOunces')
    avgOunces.innerText = `${hydroRepo.getUserAverageOunces(singleUser.id)} oz.`
    dailyOunces.innerText = `${hydroRepo.ouncesConsumedByDate(singleUser.id, findDate())} oz.`
    weeklyOunces.innerText = `${hydroRepo.getWeeklyHydration(singleUser.id, findDate())} oz.`
}

const createCharts = () => {
    const hydroChart = document.getElementById('myHydroChart')
    const sleepChart = document.getElementById('mySleepChart')
    const displayHydroChart = new Chart(hydroChart, {
        type: 'bar',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
            datasets: [{
                label: 'Ounces Drank Weekly',
                data: hydroRepo.getWeeklyHydration(singleUser.id, findDate()),
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                
            },
            maintainAspectRatio: false
        },
    })
    const displaySleepChart = new Chart(sleepChart, {
        type: 'bar',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
            datasets: [{
                label: 'Sleep Quality',
                data: sleepRepo.getWeeklySleep(singleUser.id, findDate(), 'sleepQuality'),
                backgroundColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'Hours Slept',
                data: sleepRepo.getWeeklySleep(singleUser.id, findDate(), 'hoursSlept'),
                backgroundColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {

            },
            maintainAspectRatio: false
        }

    })
}

function updateConfigByMutating(chart) {
    chart.options.plugins.title.text = 'new title';
    chart.update();
}


const updateHydrationInfo = () => {
    let updateDate = dateInput.value.split('-').join('/');
    let hydroCard = document.querySelector('.hydration-card')
    let avgOunces = document.querySelector('#averageOuncesDrank')
    let dailyOunces = document.querySelector('#dailyOunces')
    let weeklyOunces = document.querySelector('#weeklyOunces')
    if (dateInput.value === "") { 
    hydroCard.innerHTML = `<div>
    Hydration Info
    <br>
    Please select a Valid Date
    </div>`
    } else {
    avgOunces.innerText = `${hydroRepo.getUserAverageOunces(singleUser.id)} oz.`
    dailyOunces.innerText = `${hydroRepo.ouncesConsumedByDate(singleUser.id, updateDate)} oz.`
    weeklyOunces.innerText = `${hydroRepo.getWeeklyHydration(singleUser.id, updateDate)} oz.`
    
    // NEED TO GET CHART DATA TO UPDATE WITH CALENDAR EVENT
    // putting a new chart in the updateHydration function does not create a new chart, nor does it update the chart data with the selection of a new date on the calendar
    // maybe we make another chart that is hidden initially?, an updateHydroChart, and try and show that, hide the original, when the click event happens with the calendar?
}
    }


const displaySleepInfo = () => {
    dateInput.value = '';
    let sleepCard = document.querySelector('.sleep-card');
    let dailyHours = document.querySelector('#dailyHoursSlept')
    let dailyQuality = document.querySelector('#dailyQualityOfSleep')
    let avgHours = document.querySelector('#averageHoursSlept')
    let avgQuality = document.querySelector("#averageSleepQuality")
    let weeklyHours = document.querySelector('#weeklyHoursSlept')
    let weeklyQuality = document.querySelector('#weeklySleepQuality')
    let allAvgQuality = document.querySelector('#allAverageSleepQuality')
    dailyHours.innerText = `${sleepRepo.sleepByDate(singleUser.id, 'hoursSlept')}`
    dailyQuality.innerText = `${sleepRepo.sleepByDate(singleUser.id, 'sleepQuality')}`
    avgHours.innerText = `${sleepRepo.getSleepAverage(singleUser.id, 'hoursSlept')}`
    avgQuality.innerText = `${sleepRepo.getSleepAverage(singleUser.id, 'sleepQuality')}`
    weeklyHours.innerText = `${sleepRepo.getWeeklySleepAvg(singleUser.id, findDate(), 'hoursSlept')}`
    weeklyQuality.innerText = `${sleepRepo.getWeeklySleepAvg(singleUser.id, findDate(), 'sleepQuality')}`
    allAvgQuality.innerText = `${sleepRepo.allUsersAverageSleepQuality()}`
}


const updateSleepInfo = () => {
    let updateDate = dateInput.value.split('-').join('/');
    let sleepCard = document.querySelector('.sleep-card');
    let dailyHours = document.querySelector('#dailyHoursSlept')
    let dailyQuality = document.querySelector('#dailyQualityOfSleep')
    let avgHours = document.querySelector('#averageHoursSlept')
    let avgQuality = document.querySelector("#averageSleepQuality")
    let weeklyHours = document.querySelector('#weeklyHoursSlept')
    let weeklyQuality = document.querySelector('#weeklySleepQuality')
    let allAvgQuality = document.querySelector('#allAverageSleepQuality')
    if (dateInput.value === "") { sleepCard.innerHTML = `<div>
    Sleep Info
    <br>
    Please select a Valid Date
    </div>`
    } else {   
        dailyHours.innerText = `${sleepRepo.sleepByDate(singleUser.id, 'hoursSlept')}`
        dailyQuality.innerText = `${sleepRepo.sleepByDate(singleUser.id, 'sleepQuality')}`
        avgHours.innerText = `${sleepRepo.getSleepAverage(singleUser.id, 'hoursSlept')}`
        avgQuality.innerText = `${sleepRepo.getSleepAverage(singleUser.id, 'sleepQuality')}`
        weeklyHours.innerText = `${sleepRepo.getWeeklySleepAvg(singleUser.id, updateDate, 'hoursSlept')}`
        weeklyQuality.innerText = `${sleepRepo.getWeeklySleepAvg(singleUser.id, updateDate, 'sleepQuality')}`
        allAvgQuality.innerText = `${sleepRepo.allUsersAverageSleepQuality()}`
    }
};

const getRandomUser = () => {
    return Math.floor(Math.random() * 49) + 1;
}
