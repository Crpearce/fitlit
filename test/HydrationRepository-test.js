import { expect } from "chai";
import Hydration from "../src/Hydration";
import HydrationRepository from "../src/HydrationRepository";
 
describe("Hydration Repository", () => {
 let hydrationData1;
 let hydrationRepository1;
 
 beforeEach(() => {
   hydrationData1 = [
     {
       userID: 1,
       date: "2019/06/15",
       numOunces: 37,
     },
     {
       userID: 2,
       date: "2019/06/15",
       numOunces: 75,
     },
     {
       userID: 3,
       date: "2019/06/15",
       numOunces: 47,
     },
     {
       userID: 1,
       date: "2019/06/16",
       numOunces: 85,
     },
     {
       userID: 2,
       date: "2019/06/16",
       numOunces: 42,
     },
     {
       userID: 3,
       date: "2019/06/16",
       numOunces: 87,
     },
     {
      userID: 1,
      date: "2019/06/17",
      numOunces: 87,
    },
    {
      userID: 1,
      date: "2019/06/18",
      numOunces: 87,
    },
    {
      userID: 1,
      date: "2019/06/19",
      numOunces: 87,
    },
    {
      userID: 1,
      date: "2019/06/20",
      numOunces: 87,
    },
    {
      userID: 1,
      date: "2019/06/21",
      numOunces: 87,
    }
   ];
 
   hydrationRepository1 = new HydrationRepository(hydrationData1);
 });
 
 it("should be a function", function () {
   expect(HydrationRepository).to.be.a("function");
 });
 
 it("should be an instance of Hydration Repository", () => {
   expect(hydrationRepository1).to.be.an.instanceOf(HydrationRepository);
 });
 
 it("should have a property to hold all hydration data", () => {
   expect(hydrationRepository1.hydrationData).to.deep.equal(hydrationData1);
 });
 
 it("should return a user's hydration data when provided a user id", () => {
   const hydrationUser1 = hydrationData1.filter(object => object.userID === 1);
   const hydrationUser2 = hydrationData1.filter(object => object.userID === 2);
   expect(hydrationRepository1.getUserHydrationById(1)).to.deep.equal(hydrationUser1);
   expect(hydrationRepository1.getUserHydrationById(1).length).to.equal(2);
   expect(hydrationRepository1.getUserHydrationById(2)).to.deep.equal(hydrationUser2);
   expect(hydrationRepository1.getUserHydrationById(2).length).to.equal(2);
 });
 it('should have an average ounces consumed for a user', () => {
   expect(hydrationRepository1.getUserAverageOunces(1)).to.equal(60)
 })
 it('should have a user ounces consumed by date', () => {
   expect(hydrationRepository1.ouncesConsumedByDate(1)).to.equal(85)
 })
});