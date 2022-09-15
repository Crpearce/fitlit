import { expect } from "chai";
import ActivitiesRepository from "../src/ActivitiesRepository";

describe("Activity Repository", () => {
  let activityData1;
  let activityRepository1;

  beforeEach(() => {
    activityData1 = [
      {
        userID: 1,
        date: "2019/06/15",
        numSteps: 3577,
        minutesActive: 140,
        flightsOfStairs: 14,
      },
      {
        userID: 1,
        date: "2019/06/16",
        numSteps: 6577,
        minutesActive: 140,
        flightsOfStairs: 19,
      },
      {
        userID: 1,
        date: "2019/06/17",
        numSteps: 5977,
        minutesActive: 140,
        flightsOfStairs: 16,
      },
      {
        userID: 1,
        date: "2019/06/18",
        numSteps: 5977,
        minutesActive: 140,
        flightsOfStairs: 16,
      },
      {
        userID: 1,
        date: "2019/06/19",
        numSteps: 5977,
        minutesActive: 140,
        flightsOfStairs: 50,
      },
      {
        userID: 1,
        date: "2019/06/20",
        numSteps: 5977,
        minutesActive: 140,
        flightsOfStairs: 16,
      },
      {
        userID: 1,
        date: "2019/06/21",
        numSteps: 5977,
        minutesActive: 140,
        flightsOfStairs: 16,
      },
      {
        userID: 1,
        date: "2019/06/22",
        numSteps: 5977,
        minutesActive: 140,
        flightsOfStairs: 16,
      },
      {
        userID: 2,
        date: "2019/06/15",
        numSteps: 4294,
        minutesActive: 138,
        flightsOfStairs: 10,
      },
      {
        userID: 3,
        date: "2019/06/15",
        numSteps: 7402,
        minutesActive: 116,
        flightsOfStairs: 33,
      },
    ];
    activityRepository1 = new ActivitiesRepository(activityData1);
  });

  it("should be a function", function () {
    expect(ActivitiesRepository).to.be.a("function");
  });

  it("should be an instance of ActivitiesRepository", () => {
    expect(activityRepository1).to.be.an.instanceOf(ActivitiesRepository);
  });

  it("should have a property to hold all the activity data", () => {
    expect(activityRepository1.activityData).to.deep.equal(activityData1);
  });

  it("should be able to return a user miles walked by date", () => {
    //console.log(activityRepository1.getMilesWalked(1, 4.3))
    expect(activityRepository1.getMilesWalked(1, 4.3)).to.equal("4.87");
  });

  it("should be able to access Activity Data by ID", () => {
    expect(activityRepository1.getActivityData(3)).to.deep.equal([
        {
            userID: 3,
            date: "2019/06/15",
            numSteps: 7402,
            minutesActive: 116,
            flightsOfStairs: 33,
          },
    ]);
  });

  it("should be able to return a users active minutes each day", () => {
    expect(activityRepository1.activeMinutesEachDay(1)).to.equal(140);
  });

  it("should be able to return if a user met their step goal", () => {
    expect(activityRepository1.dailyStepGoalAchieved(1, 1000)).to.equal(true);
  });

  it("should be able to return a weekly average for minutes", () => {
    expect(activityRepository1.getWeeklyMinutesAvg(1, "2019/06/22")).to.deep.equal('140');
  });

  it("should be able to return all days step goal was achieved", () => {
    expect(activityRepository1.allTimeStepGoalAchievements(1, 4000)).to.equal(7);
  })

  it('should be able to return the highest stair goal achieved', () => {
        expect(activityRepository1.allTimeStairClimbingRecord(1)).to.equal(50)
  })
});
