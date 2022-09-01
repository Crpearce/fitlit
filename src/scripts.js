import './css/styles.css';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
// import userData from './data/users';
import UserRepository from './UserRepository';
import User from './User';
import { fetchAll } from './apiCalls';
import HydrationRepository from './HydrationRepository';
import SleepRepository from './SleepRepository';
//import dayjs from 'dayjs'


// QUERYSELECTORS

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
        console.log('data', data)
        users = data[0].userData
        sleep = data[1].sleepData
        hydration = data[2].hydrationData
        userRepo = new UserRepository(users)
        singleUser = new User(users[getRandomUser()])
        hydroRepo = new HydrationRepository(hydration)
        sleepRepo = new SleepRepository(sleep)
        welcomeUser()
        displayUserInfo()
        displayHydrationInfo()
        displaySleepInfo()
        findDate()
        // userRepo.findUserData(singleUser.id)
    })
}

const getRandomUser = () => {
    return Math.floor(Math.random() * 49) + 1;
};

const welcomeUser = () => {
    console.log(singleUser.returnUserName())
    let greeting = document.querySelector('.welcome-customer')
    greeting.innerText = `${singleUser.returnUserName()}`
    let steps = document.querySelector('.daily-steps')
    steps.innerText = `${singleUser.name.split(" ")[0]}'s Steps: ${singleUser.dailyStepGoal}
    Group Average: ${userRepo.allUsersAverageSteps()}`
}

const displayUserInfo = () => {
    let userCard = document.querySelector('.user-card')
    console.log(userRepo.friendNames)
    userCard.innerHTML = `<div>
    User Info
    <br>
    <br>Name: ${singleUser.name}
    <br>Address: ${singleUser.address}
    <br>Email: ${singleUser.email}
    <br>Stride Length: ${singleUser.strideLength}
    <br>Step Goal: ${singleUser.dailyStepGoal}
    <br>${singleUser.name.split(" ")[0]}'s Friends: ${userRepo.parseFriends(singleUser.id)}
    </div>` 
}

const displayHydrationInfo = () => {
    let hydroCard = document.querySelector('.hydration-card')
    hydroCard.innerHTML = `<div>
    Hydration Info
    <br>
    <br>${singleUser.name.split(" ")[0]}'s Average Ounces: ${hydroRepo.getUserAverageOunces(singleUser.id)}
    <br>Water Consumed Today: ${hydroRepo.ouncesConsumedByDate(singleUser.id)} oz.
    <br>Ounces Consumed This Week: ${hydroRepo.getWeeklyHydration(singleUser.id)}
    </div>`
}

const findDate = () => {
    let id = singleUser.id
    let allSleepData = sleepRepo.sleepData.filter(user => user.userID === id)
    const getDates = allSleepData.map(user => user.date).pop()
    return getDates
}

const displaySleepInfo = () => {
    let sleepCard = document.querySelector('.sleep-card')
    sleepCard.innerHTML = `<div>
    Sleep Info
    <br>
    <br>Average Hours Slept: ${sleepRepo.getAverageHoursSlept(singleUser.id)}
    <br>Average Quality of Sleep: ${sleepRepo.getQualityOfSleep(singleUser.id)}
    <br>Daily Average Hours Slept: ${sleepRepo.sleepHoursByDate(singleUser.id)}
    <br>Daily Average Quality of Sleep: ${sleepRepo.sleepQualityByDate(singleUser.id)}
    <br>Weekly Average of Hours Slept: ${sleepRepo.getWeeklyHoursSlept(singleUser.id, findDate())}
    <br>Weekly Average of Sleep Quality: ${sleepRepo.getWeeklyQualitySleep(singleUser.id, findDate())}
    <br>Group Average of Sleep Quality: ${sleepRepo.allUsersAverageSleepQuality()}
    </div>
    `
}

window.addEventListener('load', getFetch)