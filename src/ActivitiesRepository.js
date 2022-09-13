class ActivitiesRepository{
    constructor(activityData) {
        this.activityData = activityData
    }

    getActivityData = (id) => this.activityData.filter(activityObj => activityObj.userID === id);
    
    findActivityDate = (id, selectedDate) => {
        let userActivity = this.getActivityData(id);
        if(!selectedDate) {
          let findDate = userActivity.map(activityObj => activityObj.date).pop()
          return findDate
        } else {
          let today = userActivity.find(activityObj => activityObj.date === selectedDate)
          return today
        }
    }
    

    getMilesWalked = (id, strideLength, selectedDate) => {
        let userActivity = this.getActivityData(id);
        let today = this.findActivityDate(id, selectedDate)
        let 
        //strideLength * numberSteps / 5280
        return today
    }
}

export default ActivitiesRepository;