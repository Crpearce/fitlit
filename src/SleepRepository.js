class SleepRepository {
  constructor(sleepData) {
    this.sleepData = sleepData;
  }

  getSleepById = (id) =>
    this.sleepData.filter((sleepObj) => sleepObj.userID === id);

  getSleepAverage = (id, hoursOrQuality) => {
    let userSleep = this.getSleepById(id);
        let sleepAvg = userSleep.reduce((avgHours, sleepObj) => {
          avgHours += sleepObj[hoursOrQuality] / userSleep.length;
          return avgHours;
        }, 0);
        return sleepAvg.toFixed(2);
  };

  sleepByDate = (id, hoursOrQuality, selectedDate) => {
    let userSleep = this.getSleepById(id);
    if (!selectedDate) {
      let findDate = userSleep.map((sleepObj) => sleepObj.date).pop();
      let todaySleep = userSleep.find((sleepObj) => sleepObj.date === findDate);
      return todaySleep[hoursOrQuality];
    } else {
      let todaySleep = userSleep.find((sleepObj) => sleepObj.date === selectedDate);
      return todaySleep[hoursOrQuality];
    }
  };

  getWeeklySleepAvg = (id, date, hoursOrQuality) => {
    const userSleep = this.getSleepById(id);
    const getDates = userSleep.map((object) => object.date);
    const dateIndex = getDates.indexOf(date);
    const weeklyRange = userSleep.slice(dateIndex - 6, dateIndex + 1);
    const sleptAvg = weeklyRange.reduce((average, hours) => {
      average += hours[hoursOrQuality] / 7;
      return average;
    }, 0);
    return sleptAvg.toFixed(2);
  };

  getWeeklySleep = (id, date, hoursOrQuality) => {
    const userSleep = this.getSleepById(id);
    const getDates = userSleep.map((object) => object.date);
    const dateIndex = getDates.indexOf(date);
    const weeklyRange = userSleep.slice(dateIndex - 6, dateIndex + 1);
    const sleepRange = weeklyRange.reduce((sleepArr, hours) => {
      userSleep.forEach(userDate => {
        if(hours.date === userDate.date) {
          sleepArr.push(hours[hoursOrQuality])
        }
      })
      return sleepArr;
    }, [])
    return sleepRange;
  }

  allUsersAverageSleepQuality = () => {
    const usersSleep = this.sleepData.reduce((avgSleepQuality, user) => {
      avgSleepQuality += user.sleepQuality / this.sleepData.length;
      return avgSleepQuality;
    }, 0);
    return usersSleep.toFixed(2);
  };
}
export default SleepRepository;
