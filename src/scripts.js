import './css/styles.css';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
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
        console.log('data', data);
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
    })
}

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
        break;
        case "reset-sleep-btn":
        displaySleepInfo(event);
        break;
      default:
        break;
    }
  }

const welcomeUser = () => {
    let greeting = document.querySelector('.welcome-customer');
    greeting.innerText = `${singleUser.returnUserName()}`;
    let steps = document.querySelector('.daily-steps');
    steps.innerText = `${singleUser.name.split(" ")[0]}'s Steps: ${singleUser.dailyStepGoal}
    Group Average: ${userRepo.allUsersAverageSteps()}`;
}

const displayUserInfo = () => {
    let userCard = document.querySelector('.user-card');
    userCard.innerHTML = `<div>
    User Info
    <br>
    <br>Name: ${singleUser.name}
    <br>Address: ${singleUser.address}
    <br>Email: ${singleUser.email}
    <br>Stride Length: ${singleUser.strideLength}
    <br>Step Goal: ${singleUser.dailyStepGoal}
    <br>${singleUser.name.split(" ")[0]}'s Friends: ${userRepo.parseFriends(singleUser.id)}
    </div>`;
}

const findDate = () => {
    let id = singleUser.id;
    let allSleepData = sleepRepo.sleepData.filter(user => user.userID === id);
    const getDates = allSleepData.map(user => user.date).pop();
    return getDates;
}

const displayHydrationInfo = () => {
    let updateDate = dateInput.value.split('-').join('/');
    let hydroCard = document.querySelector('.hydration-card')
    const hydroChart = document.getElementById('myHydroChart')
    hydroCard.innerHTML = `<div>
    Hydration Info
    <br>
    <br>${singleUser.name.split(" ")[0]}'s Average Ounces: ${hydroRepo.getUserAverageOunces(singleUser.id)} oz.
    <br>Water Consumed Today: ${hydroRepo.ouncesConsumedByDate(singleUser.id, findDate())} oz.
    <br>Ounces Consumed This Week: ${hydroRepo.getWeeklyHydration(singleUser.id, findDate())} oz.
    </div>`;
// ON LINE 99 can i throw in a forEach onto ${hydroRepo.getWeeklyHydration(singleUser.id, findDate())} so that each number is followed by a space and oz., maybe a split and join?
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
}
// function updateConfigByMutating(chart) {
//     chart.options.plugins.title.text = 'new title';
//     chart.update();
// }

const updateHydrationInfo = () => {
    let updateDate = dateInput.value.split('-').join('/');
    let hydroCard = document.querySelector('.hydration-card')
    hydroCard.innerHTML = `<div>
    Hydration Info
    <br>
    <br>${singleUser.name.split(" ")[0]}'s Average Ounces: ${hydroRepo.getUserAverageOunces(singleUser.id)} oz.
    <br>Water Consumed Today: ${hydroRepo.ouncesConsumedByDate(singleUser.id, updateDate)} oz.
    <br>Ounces Consumed This Week: ${hydroRepo.getWeeklyHydration(singleUser.id, updateDate)}
    </div>`;
    // const displayHydroChart = new Chart(hydroChart, {
    //     type: 'bar',
    //     data: {
    //         labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    //         datasets: [{
    //             label: 'Ounces Drank Weekly',
    //             data: hydroRepo.getWeeklyHydration(singleUser.id, updateDate),
    //             backgroundColor: [
    //                 'rgba(255, 99, 132, 1)',
    //                 'rgba(54, 162, 235, 1)'
    //             ],
    //             borderWidth: 1
    //         }]
    //     },
    //     options: {
    //         scales: {
                
    //         },
    //         maintainAspectRatio: false
    //     },
    // })
    
    // NEED TO GET CHART DATA TO UPDATE WITH CALENDAR EVENT
    // putting a new chart in the updateHydration function does not create a new chart, nor does it update the chart data with the selection of a new date on the calendar
    // maybe we make another chart that is hidden initially?, an updateHydroChart, and try and show that, hide the original, when the click event happens with the calendar?
}


const displaySleepInfo = () => {
    dateInput.value = '';
    let sleepCard = document.querySelector('.sleep-card');
    const sleepChart = document.getElementById('mySleepChart')
    sleepCard.innerHTML = `<div>
    Sleep Info
    <br>
    <br>Daily Hours Slept: ${sleepRepo.sleepByDate(singleUser.id, 'hoursSlept')}
    <br>Daily Quality of Sleep: ${sleepRepo.sleepByDate(singleUser.id, 'sleepQuality')}
    <br>Average Hours Slept: ${sleepRepo.getSleepAverage(singleUser.id, 'hoursSlept')}
    <br>Average Quality of Sleep: ${sleepRepo.getSleepAverage(singleUser.id, 'sleepQuality')}
    <br>Weekly Average of Hours Slept: ${sleepRepo.getWeeklySleepAvg(singleUser.id, findDate(), 'hoursSlept')}
    <br>Weekly Average of Sleep Quality: ${sleepRepo.getWeeklySleepAvg(singleUser.id, findDate(), 'sleepQuality')}
    <br>All Users Average of Sleep Quality: ${sleepRepo.allUsersAverageSleepQuality()}
    </div>`

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

const updateSleepInfo = () => {
    let updateDate = dateInput.value.split('-').join('/');
    let sleepCard = document.querySelector('.sleep-card');
    if (dateInput.value === "") { sleepCard.innerHTML = `<div>
    Sleep Info
    <br>
    <br>Daily Hours Slept: ${sleepRepo.sleepByDate(singleUser.id, 'hoursSlept')}
    <br>Daily Quality of Sleep: ${sleepRepo.sleepByDate(singleUser.id, 'sleepQuality')}
    <br>Average Hours Slept: ${sleepRepo.getSleepAverage(singleUser.id, 'hoursSlept')}
    <br>Average Quality of Sleep: ${sleepRepo.getSleepAverage(singleUser.id, 'sleepQuality')}
    <br>Weekly Average of Hours Slept: Please select a Valid Date
    <br>Weekly Average of Sleep Quality: Please select a Valid Date
    <br>All Users Average of Sleep Quality: ${sleepRepo.allUsersAverageSleepQuality()}
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
}

const getRandomUser = () => {
    return Math.floor(Math.random() * 49) + 1;
};

  
