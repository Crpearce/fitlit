import userData from "../src/data/users"

class User {
    constructor(userData) {
        this.id = userData.id,
        this.name = userData.name,
        this.address = userData.address,
        this.email = userData.email,
        this.strideLength = userData.strideLength,
        this.dailyStepGoal = userData.dailyStepGoal,
        this.friends = userData.friends
    }

    returnUserName() {
       const foundUserName = `Welcome ${this.name.split(" ")[0]}!`
       return foundUserName
    }
}

export default User;