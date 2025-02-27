# Fitlit

## Abstract
Ever wanted to track and maintain your own sleep and hydration data? Use this repo to help you do just that! This was a group project assigned by the [Turing School of Software and Design](https://turing.edu/). This was a fitness tracking application which utilized a variety of technologies, including javaScript, HTML, CSS, Mocha, and Chai. The three members of our group have completed just 25% of the Turing curriculum, primarily focusing on vanilla JS to this point. The project was completed in two individual one week pushes. The project goals were to: implement ES6 classes that communicate to each other as needed, use object and array prototype methods to perform data manipulation, create a dashboard that is easy to use and displays information in a clear way, write modular, reusable code that follows SRP, implement a robust testing suite using TDD, make network requests to retrieve data, and ensure that our app follows best practices for accessability. 
#### User login
![2022-09-19 14 50 56](https://user-images.githubusercontent.com/101376200/191114630-60e0c6a7-acce-447c-a66a-1058de24f9f7.gif)
#### Display view and data entry
![2022-09-19 14 54 49](https://user-images.githubusercontent.com/101376200/191114803-8e2340e5-a155-4bd2-8711-f7c47c8fb35c.gif)
#### Dynamic charts for user data 
![2022-09-19 14 57 43](https://user-images.githubusercontent.com/101376200/191115357-f894d88a-ceac-4bd7-8b27-a12e0d5892fe.gif)

## Setup

[Repo starter kit](https://github.com/turingschool-examples/fitlit-starter-kit)

1. Within your group, decide on one person to have the project repository (repo) on their GitHub account. Then, that person should fork this repo - on the top right corner of this page, click the **Fork** button.
1. All remaining members of the group should clone down the forked repo. Since you don't want to name your project "activity-tracker-starter", you can use an optional argument when you run git clone (you replace the [...] with the terminal command arguments): `git clone [remote-address] [what you want to name the repo]`
1. Once you have cloned the repo, change into the directory and install the project dependencies. Run `npm install` to install project dependencies.
1. Run `npm start` in the terminal to see the HTML page (you should see some boilerplate HTML displayed on the page).  `Control + C` is the command to stop running the local server.  Closing the terminal without stopping the server first could allow the server to continue to run in the background and cause problems. This command is not specific to Webpack; make note of it for future use.   
1. Make sure both members of your team are collaborators on the forked repo.  
1. Do not run `npm audit fix --force`.  This will update to the latest version of packages.  We need to be using `webpack-dev-server@3.11.2` which is not the latest version.  If you start to run into Webpack errors, first check that all group members are using the correct version.  

## Login
1. To login to the dashboard view for a user, please use the current username and password format.

`username: user50 (where 50 is the ID of the user, users 1 - 50 should be acccessable)`

`password: fitlit2022`

## Testing

There is no boilerplate for testing in this starter-kit repo. You will need to set this up yourself. However, if you ran `npm install`, then the tooling you need to start testing is already installed (`mocha` and `chai`).

## Project Specs
The project specs and rubric for Fitlit Part I can be found [here](https://frontend.turing.edu/projects/Fitlit-part-one.html)

The project specs and rubric for Fitlit Part II can be found [here](https://frontend.turing.edu/projects/Fitlit-part-two.html)

## Technologies Used
 <p>
   <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
   <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
   <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>
   <img src="https://img.shields.io/badge/Mocha-8D6748?style=for-the-badge&logo=Mocha&logoColor=white"/>
   <img src="https://img.shields.io/badge/Chai-A30701?style=for-the-badge&logo=chai&logoColor=white"/>
   <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"/>
 </p>
 
 ## Challenges
- TDD and Class Architecture
- Event Delegation
- Nested Data
- Post Calls

## Wins
- API calls
- Dynamic functions created to stick to SRP and get rid of unecessary code
- Accessibility
- Collaboration
- API calls

## Future Extensions
- Implement animation using CSS
- Refactor existing CSS of our App to Sass

## Contributors
- Beth Wilson [LinkedIn](https://www.linkedin.com/in/beth-wilson-92594284/) [GitHub](https://github.com/BethWProjects)
- Colby Pearce [LinkedIn](https://www.linkedin.com/in/colby-pearce1/) [GitHub](https://github.com/Crpearce)
- Danielle Sweeny [LinkedIn](https://www.linkedin.com/in/danielle-sweeny-75b50b84/) [GitHub](https://github.com/dsweeny1)

