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
    userCard.innerText = `
    User Info
    Name: ${singleUser.name}
    Address: ${singleUser.address}
    Email: ${singleUser.email}
    Stride Length: ${singleUser.strideLength}
    Step Goal: ${singleUser.dailyStepGoal}
    ${singleUser.name.split(" ")[0]}'s Friends: ${userRepo.parseFriends(singleUser.id)}
    `;
}

const findDate = () => {
    let id = singleUser.id;
    let allSleepData = sleepRepo.sleepData.filter(user => user.userID === id);
    const getDates = allSleepData.map(user => user.date).pop();
    return getDates;
};

const displayHydrationInfo = () => {
    let hydroCard = document.querySelector('.hydration-card')
    // const hydroChart = document.getElementById('myHydroChart')
    hydroCard.innerText = `
    Hydration Info
    ${singleUser.name.split(" ")[0]}'s Average Ounces: ${hydroRepo.getUserAverageOunces(singleUser.id)} oz.
    Water Consumed Today: ${hydroRepo.ouncesConsumedByDate(singleUser.id, findDate())} oz.
    Ounces Consumed This Week: ${hydroRepo.getWeeklyHydration(singleUser.id, findDate())} oz.
    `;
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
    if (dateInput.value === "") { 
    hydroCard.innerHTML = `<div>
    Hydration Info
    <br>
    Please select a Valid Date
    </div>`
    } else {
    hydroCard.innerHTML = `<div>
    Hydration Info
    <br>
    <br>${singleUser.name.split(" ")[0]}'s Average Ounces: ${hydroRepo.getUserAverageOunces(singleUser.id)} oz.
    <br>Water Consumed Today: ${hydroRepo.ouncesConsumedByDate(singleUser.id, updateDate)} oz.
    <br>Ounces Consumed This Week: ${hydroRepo.getWeeklyHydration(singleUser.id, updateDate)}
    </div>`;
    
    // NEED TO GET CHART DATA TO UPDATE WITH CALENDAR EVENT
    // putting a new chart in the updateHydration function does not create a new chart, nor does it update the chart data with the selection of a new date on the calendar
    // maybe we make another chart that is hidden initially?, an updateHydroChart, and try and show that, hide the original, when the click event happens with the calendar?
}
    }


const displaySleepInfo = () => {
    dateInput.value = '';
    let sleepCard = document.querySelector('.sleep-card');
    // let dailyHours = document.getElementById('#dailyHoursSlept')
    // const sleepChart = document.getElementById('mySleepChart')
    sleepCard.innerText = `
    Sleep Info
    Daily Hours Slept: ${sleepRepo.sleepByDate(singleUser.id, 'hoursSlept')}
    Daily Quality of Sleep: ${sleepRepo.sleepByDate(singleUser.id, 'sleepQuality')}
    Average Hours Slept: ${sleepRepo.getSleepAverage(singleUser.id, 'hoursSlept')}
    Average Quality of Sleep: ${sleepRepo.getSleepAverage(singleUser.id, 'sleepQuality')}
    Weekly Average of Hours Slept: ${sleepRepo.getWeeklySleepAvg(singleUser.id, findDate(), 'hoursSlept')}
    Weekly Average of Sleep Quality: ${sleepRepo.getWeeklySleepAvg(singleUser.id, findDate(), 'sleepQuality')}
    All Users Average of Sleep Quality: ${sleepRepo.allUsersAverageSleepQuality()}
    `

    // const displaySleepChart = new Chart(sleepChart, {
    //     type: 'bar',
    //     data: {
    //         labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    //         datasets: [{
    //             label: 'Sleep Quality',
    //             data: sleepRepo.getWeeklySleep(singleUser.id, findDate(), 'sleepQuality'),
    //             backgroundColor: 'rgba(255, 99, 132, 1)',
    //             borderWidth: 1
    //         },
    //         {
    //             label: 'Hours Slept',
    //             data: sleepRepo.getWeeklySleep(singleUser.id, findDate(), 'hoursSlept'),
    //             backgroundColor: 'rgba(54, 162, 235, 1)',
    //             borderWidth: 1
    //         }]
    //     },
    //     options: {
    //         scales: {

    //         },
    //         maintainAspectRatio: false
    //     }

    // })
}


const updateSleepInfo = () => {
    let updateDate = dateInput.value.split('-').join('/');
    let sleepCard = document.querySelector('.sleep-card');
    if (dateInput.value === "") { sleepCard.innerHTML = `<div>
    Sleep Info
    <br>
    Please select a Valid Date
    </div>`
    } else {   
    sleepCard.innerHTML = `<div>
    Sleep Info
    <br>
    <br>Daily Hours Slept: ${sleepRepo.sleepByDate(singleUser.id, 'hoursSlept', updateDate)}
    <br>Daily Quality of Sleep: ${sleepRepo.sleepByDate(singleUser.id, 'sleepQuality', updateDate)}
    <br>Average Hours Slept: ${sleepRepo.getSleepAverage(singleUser.id, 'hoursSlept')}
    <br>Average Quality of Sleep: ${sleepRepo.getSleepAverage(singleUser.id, 'sleepQuality')}
    <br>Weekly Average of Hours Slept: ${sleepRepo.getWeeklySleepAvg(singleUser.id, updateDate, 'hoursSlept')}
    <br>Weekly Average of Sleep Quality: ${sleepRepo.getWeeklySleepAvg(singleUser.id, updateDate, 'sleepQuality')}
    <br>All Users Average of Sleep Quality: ${sleepRepo.allUsersAverageSleepQuality()}
    </div>`};
};

const getRandomUser = () => {
    return Math.floor(Math.random() * 49) + 1;
};
