import './css/styles.css';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
// import userData from './data/users';
import UserRepository from './UserRepository';
import User from './User';
import { fetchAll } from './apiCalls';
//import dayjs from 'dayjs'


// QUERYSELECTORS

// GLOBAL VARIABLES

let users;
let userRepo;
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
        welcomeUser()
        displayUserInfo()
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
    userCard.innerText = `
    User Info
    Name: ${singleUser.name}
    Address: ${singleUser.address}
    Email: ${singleUser.email}
    Stride Length: ${singleUser.strideLength}
    Step Goal: ${singleUser.dailyStepGoal}
    ${singleUser.name.split(" ")[0]}'s Friends: ${userRepo.parseFriends(singleUser.id)}
    ` 
}

window.addEventListener('load', getFetch)