import './css/styles.css';
import './images/turing-logo.png'
import UserRepository from './UserRepository';
import User from './User';
import { fetchAll } from './apiCalls';
import HydrationRepository from './HydrationRepository';
import SleepRepository from './SleepRepository';
import Chart from 'chart.js/auto'
import ActivitiesRepository from './ActivitiesRepository';

// QUERYSELECTORS
const dateInput = document.querySelector(".date-input");
let dailyHours = document.querySelector('#dailyHoursSlept')
let dailyQuality = document.querySelector('#dailyQualityOfSleep')
let avgHours = document.querySelector('#averageHoursSlept')
let avgQuality = document.querySelector("#averageSleepQuality")
let weeklyHours = document.querySelector('#weeklyHoursSlept')
let weeklyQuality = document.querySelector('#weeklySleepQuality')
let allAvgQuality = document.querySelector('#allAverageSleepQuality')
let sleepCard = document.querySelector('.sleep-card');
let userCard = document.querySelector('.user-card');
let userName = document.querySelector('#name')
let userAddress = document.querySelector('#address')
let userEmail = document.querySelector('#email')
let userStride = document.querySelector('#stride')
let userStepGoal = document.querySelector('#stepGoal')
let userFriends = document.querySelector('#friends')
let hydroCard = document.querySelector('.hydration-card')
let avgOunces = document.querySelector('#averageOuncesDrank')
let dailyOunces = document.querySelector('#dailyOunces')
let weeklyOunces = document.querySelector('#weeklyOunces')


// GLOBAL VARIABLES
let users;
let userRepo;
let hydroRepo;
let sleepRepo;
let sleep;
let hydration;
let singleUser;
let activity;
let activityRepo;
const getFetch = () => {
    fetchAll()
    .then(data => {
        users = data[0].userData;
        sleep = data[1].sleepData;
        hydration = data[2].hydrationData;
        activity = data[3].activityData
        userRepo = new UserRepository(users);
        singleUser = new User(users[getRandomUser()]);
        hydroRepo = new HydrationRepository(hydration);
        sleepRepo = new SleepRepository(sleep);
        activityRepo = new ActivitiesRepository(activity)
        console.log(userRepo)
        welcomeUser();
        displayUserInfo();
        displayHydrationInfo();
        displaySleepInfo();
        displayActivityInfo();
        createCharts();
    })
};

//  EventListeners
window.addEventListener('load', getFetch);
sleepCalendarSection.addEventListener("click", handleButtons);

function handleButtons(event) {
    switch (event.target.className) {
      case "show-data-btn":
        updateHydrationInfo(event);
        updateSleepInfo(event);
        updateActivityInfo(event);
        break;
      case "reset-data-btn":
        displayHydrationInfo(event); 
        displaySleepInfo(event);
        displayActivityInfo(event);
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
    userName.innerText = `${singleUser.name}`
    userAddress.innerText = `${singleUser.address}`
    userEmail.innerText = `${singleUser.email}`
    userStride.innerText = `${singleUser.strideLength}`
    userStepGoal.innerText = `${singleUser.dailyStepGoal}`
    userFriends.innerText = `${userRepo.parseFriends(singleUser.id)}`
}

const findSleepDate = () => {
    let id = singleUser.id;
    let allSleepData = sleepRepo.sleepData.filter(user => user.userID === id);
    const getDates = allSleepData.map(user => user.date).pop();
    return getDates;
};

const findHydrationDate = () => {
    let id = singleUser.id;
    let allHydroData = hydroRepo.hydrationData.filter(user => user.userID === id);
    const getDates = allHydroData.map(user => user.date).pop();
    return getDates;
};

const findActivityDate = () => {
    let id = singleUser.id;
    let allActivityData = activityRepo.activityData.filter(user => user.userID === id);
    const getDates = allActivityData.map(user => user.date).pop();
    return getDates;
}

const displayHydrationInfo = () => {
    avgOunces.innerText = `${hydroRepo.getUserAverageOunces(singleUser.id)} oz.`
    dailyOunces.innerText = `${hydroRepo.ouncesConsumedByDate(singleUser.id, findHydrationDate())} oz.`
    weeklyOunces.innerText = `${hydroRepo.getWeeklyHydration(singleUser.id, findHydrationDate())} oz.`
}

const displayActivityInfo = () => {
    let dailyMiles = document.querySelector("#dailyMilesWalked")
    let totalActiveMinutes = document.querySelector('#totalActiveMinutes')
    let dailyStepGoal = document.querySelector("#stepGoalAchievedToday")
    let weeklyMinuteAvg = document.querySelector("#weeklyActiveMinutes")
    let allTimeStepGoal = document.querySelector("#stepGoalAchievedHistory")
    let allTimeStairRecord = document.querySelector("#stairClimbingRecord")
    dailyMiles.innerText = `${activityRepo.getMilesWalked(singleUser.id, singleUser.strideLength)}`
    totalActiveMinutes.innerText = `${activityRepo.activeMinutesEachDay(singleUser.id)}`
    dailyStepGoal.innerText = `${activityRepo.dailyStepGoalAchieved(singleUser.id, singleUser.dailyStepGoal)}`
    weeklyMinuteAvg.innerText = `${activityRepo.getWeeklyMinutesAvg(singleUser.id, findActivityDate())}`
    allTimeStepGoal.innerText = `${activityRepo.allTimeStepGoalAchievements(singleUser.id, singleUser.dailyStepGoal)}`
    allTimeStairRecord.innerText = `${activityRepo.allTimeStairClimbingRecord(singleUser.id)}`


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
                data: hydroRepo.getWeeklyHydration(singleUser.id, findHydrationDate()),
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
                data: sleepRepo.getWeeklySleep(singleUser.id, findSleepDate(), 'sleepQuality'),
                backgroundColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'Hours Slept',
                data: sleepRepo.getWeeklySleep(singleUser.id, findSleepDate(), 'hoursSlept'),
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
    dailyHours.innerText = `${sleepRepo.sleepByDate(singleUser.id, 'hoursSlept')}`
    dailyQuality.innerText = `${sleepRepo.sleepByDate(singleUser.id, 'sleepQuality')}`
    avgHours.innerText = `${sleepRepo.getSleepAverage(singleUser.id, 'hoursSlept')}`
    avgQuality.innerText = `${sleepRepo.getSleepAverage(singleUser.id, 'sleepQuality')}`
    weeklyHours.innerText = `${sleepRepo.getWeeklySleepAvg(singleUser.id, findSleepDate(), 'hoursSlept')}`
    weeklyQuality.innerText = `${sleepRepo.getWeeklySleepAvg(singleUser.id, findSleepDate(), 'sleepQuality')}`
    allAvgQuality.innerText = `${sleepRepo.allUsersAverageSleepQuality()}`
}


const updateSleepInfo = () => {
    let updateDate = dateInput.value.split('-').join('/');
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

const updateActivityInfo = () => {
    let updateDate = dateInput.value.split('-').join('/');
    let dailyMiles = document.querySelector("#dailyMilesWalked")
    let totalActiveMinutes = document.querySelector('#totalActiveMinutes')
    let dailyStepGoal = document.querySelector("#stepGoalAchievedToday")
    let weeklyMinuteAvg = document.querySelector("#weeklyActiveMinutes")
    let allTimeStepGoal = document.querySelector("#stepGoalAchievedHistory")
    let allTimeStairRecord = document.querySelector("#stairClimbingRecord")
    dailyMiles.innerText = `${activityRepo.getMilesWalked(singleUser.id, singleUser.strideLength, updateDate)}`
    totalActiveMinutes.innerText = `${activityRepo.activeMinutesEachDay(singleUser.id, updateDate)}`
    dailyStepGoal.innerText = `${activityRepo.dailyStepGoalAchieved(singleUser.id, singleUser.dailyStepGoal, updateDate)}`
    weeklyMinuteAvg.innerText = `${activityRepo.getWeeklyMinutesAvg(singleUser.id, updateDate)}`
    allTimeStepGoal.innerText = `${activityRepo.allTimeStepGoalAchievements(singleUser.id, singleUser.dailyStepGoal)}`
    allTimeStairRecord.innerText = `${activityRepo.allTimeStairClimbingRecord(singleUser.id)}`
 }
 

const getRandomUser = () => {
    return Math.floor(Math.random() * 49) + 1;
}
