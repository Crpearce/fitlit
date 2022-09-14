class ActivitiesRepository{
    constructor(activityData) {
        this.activityData = activityData
    }

    getActivityData = (id) => this.activityData.filter(activityObj => activityObj.userID === id);
    
    // findActivityDate = (id, selectedDate) => {
    //     let userActivity = this.getActivityData(id);
    //     if(!selectedDate) {
    //       let findDate = userActivity.map(activityObj => activityObj.date).pop()
    //       return findDate
    //     } else {
    //       let today = userActivity.find(activityObj => activityObj.date === selectedDate)
    //       return today
    //     }
    // }
    

    getMilesWalked = (id, strideLength, selectedDate) => {
        let userActivity = this.getActivityData(id);
        if (!selectedDate) {
            let findDate = userActivity.map(activityObj => activityObj.date).pop()
            let todaysData = userActivity.find(activityObj => activityObj.date === findDate)
            let findTotalMiles = (todaysData.numSteps * strideLength) / 5280 
            return findTotalMiles.toFixed(2)
          } else {
            let todaysData = userActivity.find(activityObj => activityObj.date === selectedDate)
            let findTotalMiles = (todaysData.numSteps * strideLength) / 5280 
            return findTotalMiles.toFixed(2)
          } 
    }

    activeMinutesEachDay = (id, selectedDate) => {
        let userActivity = this.getActivityData(id);
        if (!selectedDate) {
            let findDate = userActivity.map(activityObj => activityObj.date).pop()
            let todaysData = userActivity.find(activityObj => activityObj.date === findDate)
            let findMinutesPerDay = todaysData.minutesActive
            return findMinutesPerDay
          } else {
            let todaysData = userActivity.find(activityObj => activityObj.date === selectedDate)
            let findMinutesPerDay = todaysData.minutesActive
            return findMinutesPerDay
          } 
    }

    dailyStepGoalAchieved = (id, dailyStepGoal, selectedDate) => {
        let userActivity = this.getActivityData(id);
        if (!selectedDate) {
            let findDate = userActivity.map(activityObj => activityObj.date).pop()
            let todaysData = userActivity.find(activityObj => activityObj.date === findDate)
            console.log(todaysData.numSteps)
            console.log(dailyStepGoal)
            return todaysData.numSteps >= dailyStepGoal ? true : false
          } else {
            let todaysData = userActivity.find(activityObj => activityObj.date === selectedDate)
            return todaysData.numSteps >= dailyStepGoal ? true : false
          } 
    }
}

export default ActivitiesRepository;