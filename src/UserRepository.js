class UserRepository {
  constructor(data) {
    this.data = data;
  }

  findUserData = (id) => this.data.find((user) => user.id === id);

  allUsersAverageSteps = () => this.data.reduce((avgSteps, user) => {
      avgSteps += user.dailyStepGoal / this.data.length;
      return Math.trunc(avgSteps);
    }, 0);
}

export default UserRepository;
