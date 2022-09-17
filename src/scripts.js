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
let dataTypeSelection = document.querySelector(".data-entry-type-selection")
let hydrationPostSection = document.querySelector("#hydrationPostSection")
let sleepPostSection = document.querySelector("#sleepPostSection")
let activityPostSection = document.querySelector("#activityPostSection")


// ACTIVITY QUERYSELECTORS
let dailyMiles = document.querySelector("#dailyMilesWalked")
let dailyStepGoal = document.querySelector("#stepGoalAchievedToday")
let weeklyMinuteAvg = document.querySelector("#weeklyActiveMinutes")
let allTimeStepGoal = document.querySelector("#stepGoalAchievedHistory")
let allTimeStairRecord = document.querySelector("#stairClimbingRecord")
let numSteps = document.querySelector("#numSteps")
let minutesActive = document.querySelector("#minutesActive")
let flightsOfStairs = document.querySelector("#flightsOfStairs")
let totalDailySteps = document.querySelector("#totalDailySteps")
let allDailyStepsAvg = document.querySelector("#allDailyStepAverages") 
let totalActiveMinutes = document.querySelector('#totalActiveMinutes')
let allMinutesActiveAvg = document.querySelector("#allMinutesActiveAverages")
let totalStairsClimbed = document.querySelector("#totalStairsClimbed")
let allStairsClimbedAvg = document.querySelector("#allStairsClimbedAverages")
// SLEEP QUERYSELECTORS
let sleepCard = document.querySelector('.sleep-card');
let dailyHours = document.querySelector('#dailyHoursSlept')
let dailyQuality = document.querySelector('#dailyQualityOfSleep')
let avgHours = document.querySelector('#averageHoursSlept')
let avgQuality = document.querySelector("#averageSleepQuality")
let weeklyHours = document.querySelector('#weeklyHoursSlept')
let weeklyQuality = document.querySelector('#weeklySleepQuality')
let allAvgQuality = document.querySelector('#allAverageSleepQuality')

// HYDRATION QUERYSELECTORS
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
pickDataType.addEventListener("click", handleButtons);


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
        break;
      case "select-data-btn":
        hideAllDataInput(event);
        updatePostOptions(event);
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
    avgOunces.innerText = ``
    dailyOunces.innerText = ``
    weeklyOunces.innerText = ``
    avgOunces.innerText = `${hydroRepo.getUserAverageOunces(singleUser.id)} oz.`
    dailyOunces.innerText = `${hydroRepo.ouncesConsumedByDate(singleUser.id, findHydrationDate())} oz.`
    weeklyOunces.innerText = `${hydroRepo.getWeeklyHydration(singleUser.id, findHydrationDate())} oz.`
}

const displayActivityInfo = () => {
    dailyMiles.innerText = ``
    dailyStepGoal.innerText = ``
    weeklyMinuteAvg.innerText = ``
    allTimeStepGoal.innerText = ``
    allTimeStairRecord.innerText = ``
    numSteps.innerText = ``
    minutesActive.innerText = ``
    flightsOfStairs.innerText = ``
    totalDailySteps.innerText = ``
    allDailyStepsAvg.innerText = ``
    totalActiveMinutes.innerText = ``
    allMinutesActiveAvg.innerText = ``
    totalStairsClimbed.innerText = ``
    allStairsClimbedAvg.innerText = ``
    dailyMiles.innerText = `${activityRepo.getMilesWalked(singleUser.id, singleUser.strideLength)}`
    dailyStepGoal.innerText = `${activityRepo.dailyStepGoalAchieved(singleUser.id, singleUser.dailyStepGoal)}`
    weeklyMinuteAvg.innerText = `${activityRepo.getWeeklyMinutesAvg(singleUser.id, findActivityDate())}`
    allTimeStepGoal.innerText = `${activityRepo.allTimeStepGoalAchievements(singleUser.id, singleUser.dailyStepGoal)}`
    allTimeStairRecord.innerText = `${activityRepo.allTimeStairClimbingRecord(singleUser.id)}`
    numSteps.innerText = `${activityRepo.getAllThreeWeeklyActivity(singleUser.id, findActivityDate(), 'numSteps')}`
    minutesActive.innerText = `${activityRepo.getAllThreeWeeklyActivity(singleUser.id, findActivityDate(), 'minutesActive')}`
    flightsOfStairs.innerText = `${activityRepo.getAllThreeWeeklyActivity(singleUser.id, findActivityDate(), 'flightsOfStairs')}`
    totalDailySteps.innerText = `${activityRepo.activityEachDay(singleUser.id, findActivityDate(), 'numSteps')}`
    allDailyStepsAvg.innerText = `${activityRepo.allUsersAverageActivity('numSteps', findActivityDate())}`
    totalActiveMinutes.innerText = `${activityRepo.activityEachDay(singleUser.id, findActivityDate(), 'minutesActive')}`
    allMinutesActiveAvg.innerText = `${activityRepo.allUsersAverageActivity('minutesActive', findActivityDate())}`
    totalStairsClimbed.innerText = `${activityRepo.activityEachDay(singleUser.id, findActivityDate(), 'flightsOfStairs')}`
    allStairsClimbedAvg.innerText = `${activityRepo.allUsersAverageActivity('flightsOfStairs', findActivityDate())}`
 }

 const hideAllDataInput = () => {
    hide(hydrationPostSection)
    hide(sleepPostSection)
    hide(activityPostSection)
 }
 
 const updatePostOptions = () => {
    if(dataTypeSelection.value === 'hydration data') {
        show(hydrationPostSection)
    } else if(dataTypeSelection.value === 'sleep data') {
        show(sleepPostSection)
    } else if(dataTypeSelection.value === 'activity data') {
        show(activityPostSection)
    }
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
    avgOunces.innerText = ``
    dailyOunces.innerText = ``
    weeklyOunces.innerText = ``
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
    dailyHours.innerText = ``
    dailyQuality.innerText = ``
    avgHours.innerText = ``
    avgQuality.innerText = ``
    weeklyHours.innerText = ``
    weeklyQuality.innerText = ``
    allAvgQuality.innerText = ``
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
    dailyHours.innerText = ``
    dailyQuality.innerText = ``
    avgHours.innerText = ``
    avgQuality.innerText = ``
    weeklyHours.innerText = ``
    weeklyQuality.innerText = ``
    allAvgQuality.innerText = ``
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
    dailyMiles.innerText = ``
    dailyStepGoal.innerText = ``
    weeklyMinuteAvg.innerText = ``
    allTimeStepGoal.innerText = ``
    allTimeStairRecord.innerText = ``
    numSteps.innerText = ``
    minutesActive.innerText = ``
    flightsOfStairs.innerText = ``
    totalDailySteps.innerText = ``
    allDailyStepsAvg.innerText = ``
    totalActiveMinutes.innerText = ``
    allMinutesActiveAvg.innerText = ``
    totalStairsClimbed.innerText = ``
    allStairsClimbedAvg.innerText = ``
    dailyMiles.innerText = `${activityRepo.getMilesWalked(singleUser.id, singleUser.strideLength, updateDate)}`
    dailyStepGoal.innerText = `${activityRepo.dailyStepGoalAchieved(singleUser.id, singleUser.dailyStepGoal, updateDate)}`
    weeklyMinuteAvg.innerText = `${activityRepo.getWeeklyMinutesAvg(singleUser.id, updateDate)}`
    allTimeStepGoal.innerText = `${activityRepo.allTimeStepGoalAchievements(singleUser.id, singleUser.dailyStepGoal)}`
    allTimeStairRecord.innerText = `${activityRepo.allTimeStairClimbingRecord(singleUser.id)}`
    numSteps.innerText = `${activityRepo.getAllThreeWeeklyActivity(singleUser.id, updateDate, 'numSteps')}`
    minutesActive.innerText = `${activityRepo.getAllThreeWeeklyActivity(singleUser.id, updateDate, 'minutesActive')}`
    flightsOfStairs.innerText = `${activityRepo.getAllThreeWeeklyActivity(singleUser.id, updateDate, 'flightsOfStairs')}`
    totalDailySteps.innerText = `${activityRepo.activityEachDay(singleUser.id, updateDate, 'numSteps')}`
    allDailyStepsAvg.innerText = `${activityRepo.allUsersAverageActivity('numSteps', updateDate)}`
    totalActiveMinutes.innerText = `${activityRepo.activityEachDay(singleUser.id, updateDate, 'minutesActive')}`
    allMinutesActiveAvg.innerText = `${activityRepo.allUsersAverageActivity('minutesActive', updateDate)}`
    totalStairsClimbed.innerText = `${activityRepo.activityEachDay(singleUser.id, updateDate, 'flightsOfStairs')}`
    allStairsClimbedAvg.innerText = `${activityRepo.allUsersAverageActivity('flightsOfStairs', updateDate)}`
 }

const getRandomUser = () => {
    return Math.floor(Math.random() * 49) + 1;
}

function show(event) {
    event.classList.remove("hidden");
  }
  
  function hide(event) {
    event.classList.add("hidden");
  }
