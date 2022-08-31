class HydrationRepository {
    constructor(hydrationData) {
        this.hydrationData = hydrationData;
       
    };
  
    getUserHydrationById = (id) => this.hydrationData.filter(hydrationObj => hydrationObj.userID === id);
  
    getUserAverageOunces = (id) => {
        let userHydration = this.getUserHydrationById(id)
        let hydrationAvg = userHydration.reduce((avgOunces, hydrationObj) => {
            avgOunces += hydrationObj.numOunces / userHydration.length;
            return Math.trunc(avgOunces);
        }, 0);
            return hydrationAvg
     }
   
     ouncesConsumedByDate = (id) => {
        let userHydration = this.getUserHydrationById(id)
        let findDate = userHydration.map(hydrationObj => hydrationObj.date).pop()
        let todayOunces = userHydration.find(hydrationObj => hydrationObj.date === findDate)
        return todayOunces.numOunces
     }
    
     getWeeklyHydration = (id) => {
      let userHydration = this.getUserHydrationById(id)
      let findWeek = userHydration.map(hydrationObj => hydrationObj.date)
      let dateRange = findWeek.splice(-7)
      let weeklyRange = userHydration.reduce((averageArr, user) => {
        dateRange.forEach(day => {
          if(user.date === day){
            averageArr.push(` ${user.numOunces} oz.`)
          }
        })
        return averageArr
      }, [])
      return weeklyRange
     }
 }
  
 export default HydrationRepository;