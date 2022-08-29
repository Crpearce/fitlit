import userData from "../src/data/users"

class User {
    constructor(userData) {
        this.id = userData.id,
        this.name = userData.name,
        this.address = userData.address,
        this.email = userData.email,
        this.strideLength = userData.strideLength,
        this.dailyStepGoal = userData.dailyStepGoal,
        this.friends = []
    }

    returnUserName() {
       const greeting = `Welcome ${this.name.split(" ")[0]}!`
       return greeting
    }
}

export default User;