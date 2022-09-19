import './css/styles.css';
import { fetchAll } from './apiCalls';
import User from './User';
import UserRepository from './UserRepository';
import HydrationRepository from './HydrationRepository';
import SleepRepository from './SleepRepository';
import ActivitiesRepository from './ActivitiesRepository';
import Chart from 'chart.js/auto'

// QUERYSELECTORS
const dateInput = document.querySelector(".date-input");
let dataTypeSelection = document.querySelector(".data-entry-type-selection");
let hydrationPostSection = document.querySelector("#hydrationPostSection");
let sleepPostSection = document.querySelector("#sleepPostSection");
let activityPostSection = document.querySelector("#activityPostSection");
let postErrorMessage = document.querySelector('.post-error-message');
let username = document.querySelector('.username');
let password = document.querySelector('.password');
let mainSection = document.querySelector('.main-section');
let loginError = document.querySelector('#loginError');
let navBar = document.querySelector('.navigation');
let loginContainer = document.querySelector('.login-container');
// USER QUERYSELECTORS
let userName = document.querySelector('#name');
let userAddress = document.querySelector('#address');
let userEmail = document.querySelector('#email');
let userStride = document.querySelector('#stride');
let userStepGoal = document.querySelector('#stepGoal');
let userFriends = document.querySelector('#friends');
let userInfoCards = document.querySelector('.user-info-cards');
let allCharts = document.querySelector('.charts');
// ACTIVITY QUERYSELECTORS
let dailyMiles = document.querySelector("#dailyMilesWalked");
let dailyStepGoal = document.querySelector("#stepGoalAchievedToday");
let weeklyMinuteAvg = document.querySelector("#weeklyActiveMinutes");
let allTimeStepGoal = document.querySelector("#stepGoalAchievedHistory");
let allTimeStairRecord = document.querySelector("#stairClimbingRecord");
let numSteps = document.querySelector("#numberOfSteps");
let minutesActive = document.querySelector("#minutesOfDayActive");
let flightsOfStairs = document.querySelector("#dailyFlightsOfStairs");
let totalDailySteps = document.querySelector("#totalDailySteps");
let allDailyStepsAvg = document.querySelector("#allDailyStepAverages");
let totalActiveMinutes = document.querySelector('#totalActiveMinutes');
let allMinutesActiveAvg = document.querySelector("#allMinutesActiveAverages");
let totalStairsClimbed = document.querySelector("#totalStairsClimbed");
let allStairsClimbedAvg = document.querySelector("#allStairsClimbedAverages");
let steps = document.querySelector("#steps");
let minutes = document.querySelector("#minutes");
let stairs = document.querySelector("#stairs");
// SLEEP QUERYSELECTORS
let sleepCard = document.querySelector('.sleep-card');
let dailyHours = document.querySelector('#dailyHoursSlept');
let dailyQuality = document.querySelector('#dailyQualityOfSleep');
let avgHours = document.querySelector('#averageHoursSlept');
let avgQuality = document.querySelector("#averageSleepQuality");
let weeklyHours = document.querySelector('#weeklyHoursSlept');
let weeklyQuality = document.querySelector('#weeklySleepQuality');
let allAvgQuality = document.querySelector('#allAverageSleepQuality');
let hoursSlept = document.querySelector('#hoursSlept');
let sleepQuality = document.querySelector('#sleepQuality');
// HYDRATION QUERYSELECTORS
let hydroCard = document.querySelector('.hydration-card');
let avgOunces = document.querySelector('#averageOuncesDrank');
let dailyOunces = document.querySelector('#dailyOunces');
let weeklyOunces = document.querySelector('#weeklyOunces');
let numberOunces = document.querySelector('#numOunces');

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
let mySleepChart = null;
let myHydroChart = null;
let myActivityChart = null;
let myStepChart = null;
const getFetch = () => {
    return fetchAll()
    .then(data => {
        users = data[0].userData;
        sleep = data[1].sleepData;
        hydration = data[2].hydrationData;
        activity = data[3].activityData
        userRepo = new UserRepository(users);
        hydroRepo = new HydrationRepository(hydration);
        sleepRepo = new SleepRepository(sleep);
        activityRepo = new ActivitiesRepository(activity);
    })
};

//  EventListeners
window.addEventListener('load', getFetch);
sleepCalendarSection.addEventListener("click", handleButtons);
pickDataType.addEventListener("click", handleButtons);
hydrationPostSection.addEventListener("click", handleButtons);
sleepPostSection.addEventListener("click", handleButtons);
activityPostSection.addEventListener("click", handleButtons);
loginSection.addEventListener("click", handleButtons)

function handleButtons(event) {
    switch (event.target.className) {
      case "show-data-btn":
        updateHydrationInfo(event);
        updateSleepInfo(event);
        updateActivityInfo(event);
        updateStepChart(event);
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
      case "submit-data-btn":
        postHydrationData(event);
        postSleepData(event);
        postActivityData(event);
        break;
        case "login-btn":
        verifyLogin(event);
            break;
      default:
        break;
    }
  };

  function verifyLogin(event) {
    event.preventDefault();
    if (username.value === "" || password.value === "") {
      loginError.innerText = `PLEASE SUBMIT BOTH USERNAME AND PASSWORD!`;
    } else if (password.value !== "fitlit2022") {
      loginError.innerText = `INCORRECT PASSWORD!`;
    } else if (!username.value.includes("user")) {
      loginError.innerText = `USERNAME DOES NOT EXIST! PLEASE TRY AGAIN.`;
    } else {
      loginError.innerText = '';
      showUserView();
      welcomeUser();
      hide(loginContainer);
    }
  }

  const welcomeUser = () => {
    let userID = parseInt(username.value.slice(4, username.value.length));
    singleUser = new User(users[userID - 1]);
    let greeting = document.querySelector('.welcome-customer');
    greeting.innerText = `${singleUser.returnUserName()}`;
    let steps = document.querySelector('.daily-steps');
    steps.innerText = `${singleUser.name.split(" ")[0]}'s Steps: ${singleUser.dailyStepGoal};
    Group Average: ${userRepo.allUsersAverageSteps()}`;
    displayUserInfo();
    displayHydrationInfo();
    displaySleepInfo();
    displayActivityInfo();
    displayStepChart();
  };

const showUserView = () => {
    show(mainSection);
    show(navBar);
}

const displayUserInfo = () => {
    userName.innerText = ``;
    userAddress.innerText = ``;
    userEmail.innerText = ``;
    userStride.innerText = ``;
    userStepGoal.innerText = ``;
    userFriends.innerText = ``;
    userName.innerText = `${singleUser.name}`;
    userAddress.innerText = `${singleUser.address}`;
    userEmail.innerText = `${singleUser.email}`;
    userStride.innerText = `${singleUser.strideLength}`;
    userStepGoal.innerText = `${singleUser.dailyStepGoal}`;
    userFriends.innerText = `${userRepo.parseFriends(singleUser.id)}`;
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

const postHydrationData = (event) => {
    if(dataTypeSelection.value === 'hydration data'){
        let date = '2022/01/23';
        hydroRepo = new HydrationRepository(hydration);
        fetch("http://localhost:3001/api/v1/hydration", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userID: singleUser.id,
              date: date,
              numOunces: numberOunces.value
            }),
        })
        .then((response) => {
            if (!response.ok) {
              throw new Error(
                "There was an error adding your Hydration Data, please retry later"
              );
            } else {
              return response.json();
            }
          })
          .then(() => {
            getFetch()
            .then(() => displayHydrationInfo()) 
          })
          .catch((err) => {
            postErrorMessage.innerText = 'Error updating data, please retry later'
          });
    }
}

const postSleepData = (event) => {
    if(dataTypeSelection.value === 'sleep data'){
        let date = '2022/01/23';
        sleepRepo = new SleepRepository(sleep);
        fetch("http://localhost:3001/api/v1/sleep", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userID: singleUser.id,
              date: date,
              hoursSlept: hoursSlept.value,
              sleepQuality: sleepQuality.value
            }),
        })
        .then((response) => {
            if (!response.ok) {
              throw new Error(
                "There was an error adding your Sleep Data, please retry later"
              );
            } else {
              return response.json();
            }
          })
          .then(() => {
            getFetch()
            .then(() => displaySleepInfo()) 
          })
          .catch((err) => {
            postErrorMessage.innerText = 'Error updating data, please retry later'
          });
    }
}

const postActivityData = (event) => {
    if(dataTypeSelection.value === 'activity data'){
        let date = '2022/01/23'
        activityRepo = new ActivitiesRepository(activity);
        fetch("http://localhost:3001/api/v1/activity", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userID: singleUser.id,
              date: date,
              numSteps: steps.value,
              minutesActive: minutes.value,
              flightsOfStairs: stairs.value
            }),
        })
        .then((response) => {
            if (!response.ok) {
              throw new Error(
                "There was an error adding your Activity Data, please retry later"
              );
            } else {
              return response.json();
            }
          })
          .then(() => {
            getFetch()
            .then(() => displayActivityInfo()) 
          })
          .catch((err) => {
            postErrorMessage.innerText = 'Error updating data, please retry later'
          });
    }
}

const displayHydrationInfo = () => {
    avgOunces.innerText = ``;
    dailyOunces.innerText = ``;
    weeklyOunces.innerText = ``;
    avgOunces.innerText = `${hydroRepo.getUserAverageOunces(singleUser.id)} oz.`;
    dailyOunces.innerText = `${hydroRepo.ouncesConsumedByDate(singleUser.id, findHydrationDate())} oz.`;
    weeklyOunces.innerText = `${hydroRepo.getWeeklyHydration(singleUser.id, findHydrationDate())} oz.`;
    const hydroChart = document.getElementById('myHydroChart');
    const labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7']
    const data = {
        labels: labels,
        datasets: [{
            label: 'Ounces Drank Weekly',
            data: hydroRepo.getWeeklyHydration(singleUser.id, findHydrationDate()),
            backgroundColor: [
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
    }
    const config = {
        type: 'bar',
        data: data,
        options: {
            radius: 5,
            hitRadius: 30,
            hoverRadius: 12,
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Ounces of Water Consumed in Past 7 Days",
              }
            }
        }
    }
    if(myHydroChart != null) {
        myHydroChart.destroy();
    }
    myHydroChart = new Chart(hydroChart, config);
}

const displayActivityInfo = () => {
    dailyMiles.innerText = ``;
    dailyStepGoal.innerText = ``;
    weeklyMinuteAvg.innerText = ``;
    allTimeStepGoal.innerText = ``;
    allTimeStairRecord.innerText = ``;
    numSteps.innerText = ``;
    minutesActive.innerText = ``;
    flightsOfStairs.innerText = ``;
    totalDailySteps.innerText = ``;
    allDailyStepsAvg.innerText = ``;
    totalActiveMinutes.innerText = ``;
    allMinutesActiveAvg.innerText = ``;
    totalStairsClimbed.innerText = ``;
    allStairsClimbedAvg.innerText = ``;
    dailyMiles.innerText = `${activityRepo.getMilesWalked(singleUser.id, singleUser.strideLength)}`;
    dailyStepGoal.innerText = `${activityRepo.dailyStepGoalAchieved(singleUser.id, singleUser.dailyStepGoal)}`;
    weeklyMinuteAvg.innerText = `${activityRepo.getWeeklyMinutesAvg(singleUser.id, findActivityDate())}`;
    allTimeStepGoal.innerText = `${activityRepo.allTimeStepGoalAchievements(singleUser.id, singleUser.dailyStepGoal)}`;
    allTimeStairRecord.innerText = `${activityRepo.allTimeStairClimbingRecord(singleUser.id)}`;
    numSteps.innerText = `${activityRepo.getAllThreeWeeklyActivity(singleUser.id, findActivityDate(), 'numSteps')}`;
    minutesActive.innerText = `${activityRepo.getAllThreeWeeklyActivity(singleUser.id, findActivityDate(), 'minutesActive')}`;
    flightsOfStairs.innerText = `${activityRepo.getAllThreeWeeklyActivity(singleUser.id, findActivityDate(), 'flightsOfStairs')}`;
    totalDailySteps.innerText = `${activityRepo.activityEachDay(singleUser.id, findActivityDate(), 'numSteps')}`;
    allDailyStepsAvg.innerText = `${activityRepo.allUsersAverageActivity('numSteps', findActivityDate())}`;
    totalActiveMinutes.innerText = `${activityRepo.activityEachDay(singleUser.id, findActivityDate(), 'minutesActive')}`;
    allMinutesActiveAvg.innerText = `${activityRepo.allUsersAverageActivity('minutesActive', findActivityDate())}`;
    totalStairsClimbed.innerText = `${activityRepo.activityEachDay(singleUser.id, findActivityDate(), 'flightsOfStairs')}`;
    allStairsClimbedAvg.innerText = `${activityRepo.allUsersAverageActivity('flightsOfStairs', findActivityDate())}`;
    const activityChart = document.getElementById('myActivityChart');
    const labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7']
    const data = {
        labels: labels,
        datasets: [
        {
            label: 'Weekly Number of Minutes Active',
            data: activityRepo.getAllThreeWeeklyActivity(singleUser.id, findActivityDate(), 'minutesActive'),
            backgroundColor: [
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
        },
        {
            label: 'Weekly Number for Flights of Stairs Climbed',
            data: activityRepo.getAllThreeWeeklyActivity(singleUser.id, findActivityDate(), 'flightsOfStairs'),
            backgroundColor: [
                'rgba(54, 453, 620, 1)',
            ],
            borderWidth: 1
        },
    ]
    }
    const config = {
        type: 'bar',
        data: data,
        options: {
            radius: 5,
            hitRadius: 30,
            hoverRadius: 12,
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Activity Over the Last 7 Days",
              }
            }
        },
        maintainAspectRatio: true
    }
    if(myActivityChart != null) {
        myActivityChart.destroy();
    }
    myActivityChart = new Chart(activityChart, config);
 }

 const hideAllDataInput = () => {
    hide(hydrationPostSection);
    hide(sleepPostSection);
    hide(activityPostSection);
 }
 
 const updatePostOptions = () => {
    if(dataTypeSelection.value === 'hydration data') {
        show(hydrationPostSection);
    } else if(dataTypeSelection.value === 'sleep data') {
        show(sleepPostSection);
    } else if(dataTypeSelection.value === 'activity data') {
        show(activityPostSection);
    }
}

const updateHydrationInfo = () => {
    let updateDate = dateInput.value.split('-').join('/');
    avgOunces.innerText = ``;
    dailyOunces.innerText = ``;
    weeklyOunces.innerText = ``;
    if (dateInput.value === "") { 
    hydroCard.innerHTML = `<div>
    Hydration Info
    <br>
    Please select a Valid Date
    </div>`;
    } else {
    avgOunces.innerText = `${hydroRepo.getUserAverageOunces(singleUser.id)} oz.`;
    dailyOunces.innerText = `${hydroRepo.ouncesConsumedByDate(singleUser.id, updateDate)} oz.`;
    weeklyOunces.innerText = `${hydroRepo.getWeeklyHydration(singleUser.id, updateDate)} oz.`;
    const hydroChart = document.getElementById('myHydroChart');
    const labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
    const data = {
        labels: labels,
        datasets: [{
            label: 'Ounces Drank Weekly',
            data: hydroRepo.getWeeklyHydration(singleUser.id, updateDate),
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }]
    }
    const config = {
        type: 'bar',
        data: data,
        options: {
            radius: 5,
            hitRadius: 30,
            hoverRadius: 12,
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Ounces of Water Consumed in Past 7 Days",
              }
            }
        },
        maintainAspectRatio: true
    }
    if(myHydroChart != null) {
        myHydroChart.destroy();
    }
    myHydroChart = new Chart(hydroChart, config);
    }
}

const displaySleepInfo = () => {
    dateInput.value = '';
    dailyHours.innerText = ``;
    dailyQuality.innerText = ``;
    avgHours.innerText = ``;
    avgQuality.innerText = ``;
    weeklyHours.innerText = ``;
    weeklyQuality.innerText = ``;
    allAvgQuality.innerText = ``;
    dailyHours.innerText = `${sleepRepo.sleepByDate(singleUser.id, 'hoursSlept')}`;
    dailyQuality.innerText = `${sleepRepo.sleepByDate(singleUser.id, 'sleepQuality')}`;
    avgHours.innerText = `${sleepRepo.getSleepAverage(singleUser.id, 'hoursSlept')}`;
    avgQuality.innerText = `${sleepRepo.getSleepAverage(singleUser.id, 'sleepQuality')}`
    weeklyHours.innerText = `${sleepRepo.getWeeklySleepAvg(singleUser.id, findSleepDate(), 'hoursSlept')}`;
    weeklyQuality.innerText = `${sleepRepo.getWeeklySleepAvg(singleUser.id, findSleepDate(), 'sleepQuality')}`;
    allAvgQuality.innerText = `${sleepRepo.allUsersAverageSleepQuality()}`;
    const sleepChart = document.getElementById('mySleepChart');
    const labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
    const data = {
        labels: labels,
        datasets: [{
            label: 'Weekly Sleep Quality',
            data: sleepRepo.getWeeklySleepAvg(singleUser.id, findSleepDate(), 'sleepQuality'),
            backgroundColor: [
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        },
        {
            label: 'Hours Slept',
            data: sleepRepo.getWeeklySleep(singleUser.id, findSleepDate(), 'hoursSlept'),
            backgroundColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    }
    const config = {
        type: 'bar',
        data: data,
        options: {
            radius: 5,
            hitRadius: 30,
            hoverRadius: 12,
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Weekly Sleep Data",
              }
            }
        }
    }
    if(mySleepChart != null) {
        mySleepChart.destroy();
    }
    mySleepChart = new Chart(sleepChart, config);
}

const updateSleepInfo = () => {
    let updateDate = dateInput.value.split('-').join('/');
    dailyHours.innerText = ``;
    dailyQuality.innerText = ``;
    avgHours.innerText = ``;
    avgQuality.innerText = ``;
    weeklyHours.innerText = ``;
    weeklyQuality.innerText = ``;
    allAvgQuality.innerText = ``;
    if (dateInput.value === "") { sleepCard.innerHTML = `<div>
    Sleep Info
    <br>
    Please select a Valid Date
    </div>`;
    } else {   
        dailyHours.innerText = `${sleepRepo.sleepByDate(singleUser.id, 'hoursSlept')}`;
        dailyQuality.innerText = `${sleepRepo.sleepByDate(singleUser.id, 'sleepQuality')}`;
        avgHours.innerText = `${sleepRepo.getSleepAverage(singleUser.id, 'hoursSlept')}`;
        avgQuality.innerText = `${sleepRepo.getSleepAverage(singleUser.id, 'sleepQuality')}`;
        weeklyHours.innerText = `${sleepRepo.getWeeklySleepAvg(singleUser.id, updateDate, 'hoursSlept')}`;
        weeklyQuality.innerText = `${sleepRepo.getWeeklySleepAvg(singleUser.id, updateDate, 'sleepQuality')}`;
        allAvgQuality.innerText = `${sleepRepo.allUsersAverageSleepQuality()}`;
    }
    const sleepChart = document.getElementById('mySleepChart')
    const labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7']
    const data = {
        labels: labels,
        datasets: [{
            label: 'Weekly Sleep Quality',
            data: sleepRepo.getWeeklySleepAvg(singleUser.id, updateDate, 'sleepQuality'),
            backgroundColor: [
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        },
        {
            label: 'Hours Slept',
            data: sleepRepo.getWeeklySleep(singleUser.id, updateDate, 'hoursSlept'),
            backgroundColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    }
    const config = {
        type: 'bar',
        data: data,
        options: {
            radius: 5,
            hitRadius: 30,
            hoverRadius: 12,
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Weekly Sleep Data",
              }
            }
        }
    }
    if(mySleepChart != null) {
        mySleepChart.destroy();
    }
    mySleepChart = new Chart(sleepChart, config);
};

const updateActivityInfo = () => {
    let updateDate = dateInput.value.split('-').join('/');
    dailyMiles.innerText = ``;
    dailyStepGoal.innerText = ``;
    weeklyMinuteAvg.innerText = ``;
    allTimeStepGoal.innerText = ``;
    allTimeStairRecord.innerText = ``;
    numSteps.innerText = ``;
    minutesActive.innerText = ``;
    flightsOfStairs.innerText = ``;
    totalDailySteps.innerText = ``;
    allDailyStepsAvg.innerText = ``;
    totalActiveMinutes.innerText = ``;
    allMinutesActiveAvg.innerText = ``;
    totalStairsClimbed.innerText = ``;
    allStairsClimbedAvg.innerText = ``;
    dailyMiles.innerText = `${activityRepo.getMilesWalked(singleUser.id, singleUser.strideLength, updateDate)}`;
    dailyStepGoal.innerText = `${activityRepo.dailyStepGoalAchieved(singleUser.id, singleUser.dailyStepGoal, updateDate)}`;
    weeklyMinuteAvg.innerText = `${activityRepo.getWeeklyMinutesAvg(singleUser.id, updateDate)}`;
    allTimeStepGoal.innerText = `${activityRepo.allTimeStepGoalAchievements(singleUser.id, singleUser.dailyStepGoal)}`;
    allTimeStairRecord.innerText = `${activityRepo.allTimeStairClimbingRecord(singleUser.id)}`;
    numSteps.innerText = `${activityRepo.getAllThreeWeeklyActivity(singleUser.id, updateDate, 'numSteps')}`;
    minutesActive.innerText = `${activityRepo.getAllThreeWeeklyActivity(singleUser.id, updateDate, 'minutesActive')}`;
    flightsOfStairs.innerText = `${activityRepo.getAllThreeWeeklyActivity(singleUser.id, updateDate, 'flightsOfStairs')}`;
    totalDailySteps.innerText = `${activityRepo.activityEachDay(singleUser.id, updateDate, 'numSteps')}`;
    allDailyStepsAvg.innerText = `${activityRepo.allUsersAverageActivity('numSteps', updateDate)}`;
    totalActiveMinutes.innerText = `${activityRepo.activityEachDay(singleUser.id, updateDate, 'minutesActive')}`;
    allMinutesActiveAvg.innerText = `${activityRepo.allUsersAverageActivity('minutesActive', updateDate)}`;
    totalStairsClimbed.innerText = `${activityRepo.activityEachDay(singleUser.id, updateDate, 'flightsOfStairs')}`;
    allStairsClimbedAvg.innerText = `${activityRepo.allUsersAverageActivity('flightsOfStairs', updateDate)}`;
    const activityChart = document.getElementById('myActivityChart');
    const labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
    const data = {
        labels: labels,
        datasets: [
        {
            label: 'Weekly Number of Minutes Active',
            data: activityRepo.getAllThreeWeeklyActivity(singleUser.id, updateDate, 'minutesActive'),
            backgroundColor: [
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
        },
        {
            label: 'Weekly Number for Flights of Stairs Climbed',
            data: activityRepo.getAllThreeWeeklyActivity(singleUser.id, updateDate, 'flightsOfStairs'),
            backgroundColor: [
                'rgba(54, 453, 620, 1)',
            ],
            borderWidth: 1
        },
    ]
    }
    const config = {
        type: 'bar',
        data: data,
        options: {
            radius: 5,
            hitRadius: 30,
            hoverRadius: 12,
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Activity Over the Last 7 Days",
              }
            }
        },
        maintainAspectRatio: true
    }
    if(myActivityChart != null) {
        myActivityChart.destroy();
    }
    myActivityChart = new Chart(activityChart, config);
}

 const displayStepChart = () => {
    const stepChart = document.getElementById('myStepChart');
    const labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
    const data = {
        labels: labels,
        datasets: [{
            label: 'Weekly Number of Steps',
            data: activityRepo.getAllThreeWeeklyActivity(singleUser.id, findActivityDate(), 'numSteps'),
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
        }]
    }
    const config = {
        type: 'bar',
        data: data,
        options: {
            radius: 5,
            hitRadius: 30,
            hoverRadius: 12,
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Activity Over the Last 7 Days",
              }
            }
        },
        maintainAspectRatio: true
    }
    if(myStepChart != null) {
        myStepChart.destroy();
    }
    myStepChart = new Chart(stepChart, config);
 }
 const updateStepChart = () => {
    let updateDate = dateInput.value.split('-').join('/');
    const stepChart = document.getElementById('myStepChart');
    const labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
    const data = {
        labels: labels,
        datasets: [{
            label: 'Weekly Number of Steps',
            data: activityRepo.getAllThreeWeeklyActivity(singleUser.id, updateDate, 'numSteps'),
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
        }
    ]
    }
    const config = {
        type: 'bar',
        data: data,
        options: {
            radius: 5,
            hitRadius: 30,
            hoverRadius: 12,
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Steps Over the Last 7 Days",
              }
            }
        },
        maintainAspectRatio: true
    }
    if(myStepChart != null) {
        myStepChart.destroy();
    }
    myStepChart = new Chart(stepChart, config);
 }

const show = (event) => event.classList.remove("hidden");
    
const hide = (event) => event.classList.add("hidden");
  
