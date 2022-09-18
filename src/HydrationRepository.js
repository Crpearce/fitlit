class HydrationRepository {
    constructor(hydrationData) {
        this.hydrationData = hydrationData;
    };
  
    getUserHydrationById = (id) => this.hydrationData.filter(hydrationObj => hydrationObj.userID === id);
  
    getUserAverageOunces = (id) => {
        let userHydration = this.getUserHydrationById(id)
        let hydrationAvg = userHydration.reduce((avgOunces, hydrationObj) => {
            avgOunces += hydrationObj.numOunces / userHydration.length;
            return avgOunces;
        }, 0);
            return Math.trunc(hydrationAvg)
     }
   
     ouncesConsumedByDate = (id, selectedDate) => {
      console.log(selectedDate)
        let userHydration = this.getUserHydrationById(id);
        if(!selectedDate) {
          let findDate = userHydration.map(hydrationObj => hydrationObj.date).pop()
          let todayOunces = userHydration.find(hydrationObj => hydrationObj.date === findDate)
          return todayOunces.numOunces
        } else if(selectedDate === 'undefined'){
          return 'NO DATA FOR SELECTED DATE'
        }else {
          let todayOunces = userHydration.find(hydrationObj => hydrationObj.date === selectedDate)
          return todayOunces.numOunces
        }
     }

     getWeeklyHydration = (id, date) => {
      let userHydration = this.getUserHydrationById(id)
      let findWeek = userHydration.map(hydrationObj => hydrationObj.date)
      const dateIndex = findWeek.indexOf(date)
      let dateRange = userHydration.slice(dateIndex - 6, dateIndex + 1)
      let weeklyRange = dateRange.reduce((averageArr, date) => {
        userHydration.forEach(userDate => {
          if(date.date === userDate.date) {
            averageArr.push(date.numOunces)
          }
        })
        return averageArr
      }, [])
      return weeklyRange
     }
 }
  
 export default HydrationRepository;