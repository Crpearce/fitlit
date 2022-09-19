class ActivitiesRepository{
    constructor(activityData) {
        this.activityData = activityData;
    }

    getActivityData = (id) => this.activityData.filter(activityObj => activityObj.userID === id);
    

    getMilesWalked = (id, strideLength, selectedDate) => {
        let userActivity = this.getActivityData(id);
        if (!selectedDate) {
            let findDate = userActivity.map(activityObj => activityObj.date).pop();
            let todaysData = userActivity.find(activityObj => activityObj.date === findDate);
            let findTotalMiles = (todaysData.numSteps * strideLength) / 5280;
            return findTotalMiles.toFixed(2);
          } else {
            let todaysData = userActivity.find(activityObj => activityObj.date === selectedDate);
            let findTotalMiles = (todaysData.numSteps * strideLength) / 5280;
            return findTotalMiles.toFixed(2);
          } 
    }

    activityEachDay = (id, selectedDate, activity) => {
        let userActivity = this.getActivityData(id);
        if (!selectedDate) {
            let findDate = userActivity.map(activityObj => activityObj.date).pop();
            let todaysData = userActivity.find(activityObj => activityObj.date === findDate);
            let findMinutesPerDay = todaysData[activity];
            return findMinutesPerDay;
          } else {
            let todaysData = userActivity.find(activityObj => activityObj.date === selectedDate);
            let findMinutesPerDay = todaysData[activity];
            return findMinutesPerDay;
          } 
    }

    getWeeklyMinutesAvg = (id, date) => {
        let userActivity = this.getActivityData(id);
        let findWeek = userActivity.map(activityObj => activityObj.date);
        const dateIndex = findWeek.indexOf(date);
        let dateRange = userActivity.slice(dateIndex - 6, dateIndex + 1);
        let weeklyRange = dateRange.reduce((average, day) => {
            average += day.minutesActive / 7
          return average;
        }, 0)
        return weeklyRange.toFixed(0);
       }

    dailyStepGoalAchieved = (id, dailyStepGoal, selectedDate) => {
        let userActivity = this.getActivityData(id);
        if (!selectedDate) {
            let findDate = userActivity.map(activityObj => activityObj.date).pop();
            let todaysData = userActivity.find(activityObj => activityObj.date === findDate);
            return todaysData.numSteps >= dailyStepGoal ? true : false;
          } else {
            let todaysData = userActivity.find(activityObj => activityObj.date === selectedDate);
            return todaysData.numSteps >= dailyStepGoal ? true : false;
          } 
    }

    allTimeStepGoalAchievements = (id, dailyStepGoal) => {
        let userActivity = this.getActivityData(id);
        let goalAchieved = userActivity.filter(day => day.numSteps > dailyStepGoal);
        return goalAchieved.length;
    }

    allTimeStairClimbingRecord = (id) => {
        let userActivity = this.getActivityData(id);
        let goalAchieved = userActivity.reduce((acc, day) => {
            return (acc.flightsOfStairs > day.flightsOfStairs) ? acc : day
        })
        return goalAchieved.flightsOfStairs;
    }

    getAllThreeWeeklyActivity = (id, date, activity) => {
      let userActivity = this.getActivityData(id);
      let findWeek = userActivity.map(activityObj => activityObj.date);
      const dateIndex = findWeek.indexOf(date);
      let dateRange = userActivity.slice(dateIndex - 6, dateIndex + 1);
      let weeklyRange = dateRange.reduce((activityObj, day) => {
        activityObj.push(day[activity])
        return activityObj;
      }, [])
      return weeklyRange;
     }

     allUsersAverageActivity = (activity, selectedDate) => {
      if (!selectedDate) {
        let findDate = this.activityData.map(activityObj => activityObj.date).pop();
        let dateHistory = this.activityData.filter(activityObj => activityObj.date === findDate);
        const usersActivity = dateHistory.reduce((avgActivity, user) => {
        avgActivity += user[activity] / dateHistory.length;
        return avgActivity;
      }, 0);
      return usersActivity.toFixed(0);
    } else {
      let todaysData = this.activityData.find(activityObj => activityObj.date === selectedDate).date;
      let dateHistory = this.activityData.filter(activityObj => activityObj.date === todaysData);
      const usersActivity = dateHistory.reduce((avgActivity, user) => {
        avgActivity += user[activity] / dateHistory.length;
        return avgActivity;
      }, 0);
      return usersActivity.toFixed(0);
    }
  }
}

export default ActivitiesRepository;