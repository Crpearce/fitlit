class UserRepository {
  constructor(data) {
    this.data = data;
    this.friendNames = [];
  }

    findUserData = (id) => this.data.find((user) => user.id === id);

    allUsersAverageSteps = () => this.data.reduce((avgSteps, user) => {
        avgSteps += user.dailyStepGoal / this.data.length;
        return Math.trunc(avgSteps);
        }, 0);

    parseFriends(userId) {
        this.data[userId -1].friends.forEach(friend => {
            this.data.forEach(user => {
                if (friend === user.id) {
                    this.friendNames.push(' ' + user.name)
                }
            })
        })
        return this.friendNames
    }
}

export default UserRepository;
