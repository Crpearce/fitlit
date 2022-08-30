import { expect } from "chai";
import userData from "../src/data/users";
import User from "../src/User";
import UserRepository from "../src/UserRepository";

describe("User", () => {
  let user;
  let userRepo;

  beforeEach(() => {
    user = new User(userData[0]);
    userRepo = new UserRepository(userData);
  });

  it("Should be a function", () => {
    expect(User).to.be.a("function");
  });

  it("Should be an instance of User", () => {
    expect(user).to.be.an.instanceOf(User);
  });

  it("Should have an id", () => {
    expect(user.id).to.equal(1);
  });

  it("Should have a user name", () => {
    expect(user.name).to.equal("Luisa Hane");
  });

  it("Should have a user email", () => {
    expect(user.email).to.equal("Diana.Hayes1@hotmail.com");
  });

  it("Should have a user stride length", () => {
    expect(user.strideLength).to.equal(4.3);
  });

  it("Should have a user daily step goal", () => {
    expect(user.dailyStepGoal).to.equal(10000);
  });

  it("Should have user friends", () => {
    expect(user.friends).to.deep.equal([16, 4, 8]);
    expect(user.friends.length).to.equal(3);
  });

  it("Should be able to greet the user", () => {
    expect(user.returnUserName()).to.equal("Welcome Luisa!");
  });

//   it('Should be able to return friend names', () => {
//     console.log(user.friends)
//     expect(user.friendNames.length).to.equal(3)
//     expect(user.friendNames).to.deep.equal(["Garnett Cruickshank", "Mae Connelly", "Laney Abshire"])
//   })
  
});
