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

     sleepQualityByDate = (id) => {
        let userSleep = this.getSleepById(id)
        let findDate = userSleep.map(sleepObj => sleepObj.date).pop()
        let todaySleep = userSleep.find(sleepObj => sleepObj.date === findDate)
        return todaySleep.sleepQuality
     }

     getWeeklyHoursSlept = (id, date) => {
        const userSleep = this.getSleepById(id)
        const getDates = userSleep.map(object => object.date)
        const dateIndex = getDates.indexOf(date)
        const weeklyRange = userSleep.slice(dateIndex -6, dateIndex +1)
        const sleptAvg = weeklyRange.reduce((average, hours) => {
            average += hours.hoursSlept / 7
            return average
        }, 0)
        return sleptAvg.toFixed(2)
       }

       getWeeklyQualitySleep = (id, date) => {
        const userSleep = this.getSleepById(id)
        const getDates = userSleep.map(object => object.date)
        const dateIndex = getDates.indexOf(date)
        const weeklyRange = userSleep.slice(dateIndex -6, dateIndex +1)
        const sleptAvg = weeklyRange.reduce((average, hours) => {
            average += hours.sleepQuality / 7
            return average
        }, 0)
        return sleptAvg.toFixed(2)
       }

       allUsersAverageSleepQuality = () => {
        const usersSleep = this.sleepData.reduce((avgSleepQuality, user) => {
            avgSleepQuality += user.sleepQuality / this.sleepData.length;
            return avgSleepQuality;
            }, 0);
            return usersSleep.toFixed(2)
       }
}
export default SleepRepository;