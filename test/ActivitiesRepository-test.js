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
        flightsOfStairs: 16,
      },
      {
        userID: 1,
        date: "2019/06/16",
        numSteps: 6577,
        minutesActive: 140,
        flightsOfStairs: 16,
      },
      {
        userID: 1,
        date: "2019/06/17",
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

  it('should be able to return a date', () => {
    console.log()
    expect(activityRepository1.findActivityDate(1)).to.equal("2019/06/17")
  })

  it("should be able to access Activity Data by ID", () => {
    expect(activityRepository1.getActivityData(1)).to.deep.equal([
        {
          userID: 1,
          date: '2019/06/15',
          numSteps: 3577,
          minutesActive: 140,
          flightsOfStairs: 16
        },
        {
          userID: 1,
          date: '2019/06/16',
          numSteps: 6577,
          minutesActive: 140,
          flightsOfStairs: 16
        },
        {
          userID: 1,
          date: '2019/06/17',
          numSteps: 5977,
          minutesActive: 140,
          flightsOfStairs: 16
        }
      ]);
  });

  it('should be able to determine to total number of miles walked', () => {
    expect(activityRepository1.getMilesWalked(1)).to.equal("2019/06/17")
  })
});
