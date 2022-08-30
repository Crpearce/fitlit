import { expect } from "chai";
import userData from "../src/data/users";
import UserRepository from "../src/UserRepository";
import User from "../src/User";

describe("User Repository", () => {
  let userRepo;
  let user;

  beforeEach(() => {
    userRepo = new UserRepository(userData);
    user = new User(userData[0])
  });

  it("should be a function", function () {
    expect(UserRepository).to.be.a("function");
  });

  it("should be an instance of user repository", () => {
    expect(userRepo).to.be.an.instanceOf(UserRepository);
  });

  it("should be able to find a user by id", () => {
    expect(userRepo.findUserData(1)).to.equal(userData[0]);
  });

  it("should be able to find the average step goal", () => {
    expect(userRepo.allUsersAverageSteps()).to.equal(6700);
  });

  it('Should be able to return friend names', () => {
    userRepo.parseFriends(1)
    expect(userRepo.friendNames.length).to.equal(3)
    expect(userRepo.friendNames).to.deep.equal(["Garnett Cruickshank", "Mae Connelly", "Laney Abshire"])
  });
});
