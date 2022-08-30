import './css/styles.css';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import userData from './data/users';
import UserRepository from './UserRepository';
import User from './User';
import { fetchAll } from './apiCalls';


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
        // singleUser.returnUserName()
        welcomeUser()
        // userRepo.findUserData(singleUser.id)
    })
}

const getRandomUser = () => {
    return Math.floor(Math.random() * 49) + 1;
};

// const allUsers = (id) => {
//     return users.find(user => user.id === id)
// }

const welcomeUser = () => {
    console.log(singleUser.returnUserName())
    let greeting = document.querySelector('.welcome-customer')
    greeting.innerText = `${singleUser.returnUserName()}`
    let steps = document.querySelector('.daily-steps')
    steps.innerText = `${singleUser.name} Steps: ${singleUser.dailyStepGoal}
    Group Average: ${userRepo.allUsersAverageSteps()}`

}

// const setUserData = (someData) => {
//     return new User(someData);
// }

window.addEventListener('load', getFetch)