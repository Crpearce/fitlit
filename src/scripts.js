// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
console.log(userData,"<>>>>userData")
// An example of how you tell webpack to use a CSS file
import './css/styles.css';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
console.log('This is the JavaScript entry file - your code begins here.');
import userData from './data/users';
import UserRepository from './UserRepository';
import { fetchAll } from './apiCalls'


// GLOBAL VARIABLES

let users;
let sleep;
let hydration;
const getFetch = () => {
    fetchAll()
    .then(data => {
        console.log('data', data)
        users = data[0].users
        sleep = data[1].sleep
        hydration = data[2].hydration
    })
}

window.addEventListener('load', getFetch)