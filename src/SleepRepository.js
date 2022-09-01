class SleepRepository{
    constructor(sleepData){
        this.sleepData = sleepData
    }

    getSleepById = (id) => this.sleepData.filter(sleepObj => sleepObj.userID === id);

    getAverageHoursSlept = (id) => {
        let userSleep = this.getSleepById(id)
        let sleepAvg = userSleep.reduce((avgHours, sleepObj) => {
            avgHours += sleepObj.hoursSlept / userSleep.length;
            return avgHours;
        }, 0);
            return sleepAvg.toFixed(2)
     }

     getQualityOfSleep = (id) => {
        let userSleep = this.getSleepById(id)
        console.log(userSleep)
        let sleepAvg = userSleep.reduce((avgHours, sleepObj) => {
            avgHours += sleepObj.sleepQuality / userSleep.length;
            return avgHours;
        }, 0);
            return sleepAvg.toFixed(2)
     }

     sleepHoursByDate = (id) => {
        let userSleep = this.getSleepById(id)
        let findDate = userSleep.map(sleepObj => sleepObj.date).pop()
        let todaySleep = userSleep.find(sleepObj => sleepObj.date === findDate)
        return todaySleep.hoursSlept
     }
}
export default SleepRepository;