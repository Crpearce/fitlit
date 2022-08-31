class HydrationRepository {
    constructor(hydrationData) {
        this.hydrationData = hydrationData;
       
    };
  
    getUserHydrationById = (id) => this.hydrationData.filter(hydrationObj => hydrationObj.userID === id);
  
    getUserAverageOunces = (id) => {
        let userHydration = this.hydrationData.filter(hydrationObj => hydrationObj.userID === id)
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
        console.log(todayOunces.numOunces)
        return todayOunces.numOunces
     }
  
  
 }
  
 export default HydrationRepository;