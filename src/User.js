import userData from "./data/users";
import UserRepository from "./UserRepository";

class User {
    constructor(userData) {
        this.id = userData.id;
        this.name = userData.name;
        this.address = userData.address;
        this.email = userData.email;
        this.strideLength = userData.strideLength;
        this.dailyStepGoal = userData.dailyStepGoal;
        this.friends = userData.friends;
        this.friendNames = []
    }

    returnUserName = () => `Welcome ${this.name.split(" ")[0]}!`

    // parseFriends() {
    //     const friendName = this.friends.find(friend => {
    //         userRepo.data.forEach(userID => {
    //             const 
    //             if (friend === userID.id) {
    //                 this.friendNames.push(userID.name)
    //             }
    //         })
    //     })
    //     console.log(this.friendNames)
    //     return friendName
    //     // console.log(friendName)
    //     // this.friendNames.push(friendName.name)
    // }
}

export default User;