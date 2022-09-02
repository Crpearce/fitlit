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
    },
    {
      userID: 1,
      date: "2019/06/23",
      hoursSlept: 7.1,
      sleepQuality: 2.4
    },
    {
      userID: 1,
      date: "2019/06/24",
      hoursSlept: 7.1,
      sleepQuality: 2.4
    },
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
 it('should get the sleep data by id', () => {
    const sleepUser1 = sleepData1.filter(object => object.userID === 1);
    const sleepUser2 = sleepData1.filter(object => object.userID === 2);
    expect(sleepRepository1.getSleepById(1)).to.deep.equal(sleepUser1);
    expect(sleepRepository1.getSleepById(1).length).to.equal(10);
    expect(sleepRepository1.getSleepById(2)).to.deep.equal(sleepUser2);
    expect(sleepRepository1.getSleepById(2).length).to.equal(2);
 })
 it('should have an average hours slept for user', () => {
    expect(sleepRepository1.getSleepAverage(1, 'hoursSlept')).to.equal('7.40')
 })
 it('should have an average quality sleep for user', () => {
    expect(sleepRepository1.getSleepAverage(1, 'sleepQuality')).to.equal('4.02')
 })
 it('should have hours slept by date', () => {
    expect(sleepRepository1.sleepByDate(1, 'hoursSlept')).to.equal(7.1)
 })
 it('Should have sleep quality by date', () => {
  expect(sleepRepository1.sleepByDate(1, 'sleepQuality')).to.equal(2.4)
 })

 it('Should have the hours slept per week', () => {
  expect(sleepRepository1.getWeeklySleep(1, '2019/06/23', 'hoursSlept')).to.equal('7.24')
 })
 it('Should have the quality of sleep per week', () => {
  expect(sleepRepository1.getWeeklySleep(1, '2019/06/23', 'sleepQuality')).to.equal('4.66')
 })
 it('Should be able to get the average sleep quality for all users', () => {
  expect(sleepRepository1.allUsersAverageSleepQuality()).to.equal('3.70')
 })
});
