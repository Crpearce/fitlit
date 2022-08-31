class HydrationRepository {
    constructor(hydrationData) {
        // console.log(this.hydrationData)
        this.hydrationData = hydrationData; 
    };

    getUserHydrationById = (id) => this.hydrationData.filter(hydrationObj => hydrationObj.userID === id);

    // getUserAverageOunces = (id) => this.hydrationData.filter(hydrationObj => console.log(hydrationObj.userID === id))
    // reduce through the filtered array- add up the total num ounces consumed and return that number
    // divided by the length of the array to find an average.


}

export default HydrationRepository;