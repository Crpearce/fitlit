import { expect } from "chai";
import SleepRepository from "../src/SleepRepository";
 
describe("Sleep Repository", () => {
 let sleepData1;
 let sleepRepository1;
 
 beforeEach(() => {
   sleepData1 = [
     {
       userID: 1,
       date: "2019/06/15",
       hoursSlept: 7.1,
       sleepQuality: 2.4
     },
     {
       userID: 2,
       date: "2019/06/15",
       hoursSlept: 6.1,
       sleepQuality: 4.2
     },
     {
       userID: 3,
       date: "2019/06/15",
       hoursSlept: 8.1,
       sleepQuality: 2.9
     },
     {
       userID: 1,
       date: "2019/06/16",
       hoursSlept: 9.1,
       sleepQuality: 2.8
     },
     {
       userID: 2,
       date: "2019/06/16",
       hoursSlept: 6.1,
       sleepQuality: 2.3
     },
     {
       userID: 3,
       date: "2019/06/16",
       hoursSlept: 3.1,
       sleepQuality: 2.2
     },
     {
      userID: 1,
      date: "2019/06/17",
      hoursSlept: 6.1,
      sleepQuality: 2.2
    },
    {
      userID: 1,
      date: "2019/06/18",
      hoursSlept: 10.1,
      sleepQuality: 5.2
    },
    {
      userID: 1,
      date: "2019/06/19",
      hoursSlept: 4.1,
      sleepQuality: 6.2
    },
    {
      userID: 1,
      date: "2019/06/20",
      hoursSlept: 8.1,
      sleepQuality: 6.2
    },
    {
      userID: 1,
      date: "2019/06/21",
      hoursSlept: 8.1,
      sleepQuality: 7.2
    },
    {
      userID: 1,
      date: "2019/06/22",
      hoursSlept: 7.1,
      sleepQuality: 3.2
    }
   ];
 
   sleepRepository1 = new SleepRepository(sleepData1);
 });
 it('it should be a function', () => {
    expect(SleepRepository).to.be.a('function')
 })
 it('should be an instance of SleepRepository', () => {
    expect(sleepRepository1).to.be.an.instanceOf(SleepRepository)
 })
 it('should have a property to hold all the sleep data', () => {
    expect(sleepRepository1.sleepData).to.deep.equal(sleepData1)
 })
});
