class UserRepository {
    constructor(data) {
        this.data = data
    }
    findUserData(id){
        const findUser = this.data.find(user => user.id === id)
        return findUser
    }

    allUsersAverageSteps() {
            const findAverage = this.data.reduce((avgSteps, user) => {
                avgSteps += user.dailyStepGoal / this.data.length
                return avgSteps
            }, 0)
            return findAverage
        }
}

export default UserRepository;