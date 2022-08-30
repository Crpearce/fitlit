import { expect } from "chai";
import userData from "../src/data/users";
import UserRepository from "../src/UserRepository";

describe("User Repository", () => {
  let userRepo;

  beforeEach(() => {
    userRepo = new UserRepository(userData);
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
    expect(userRepo.allUsersAverageSteps()).to.equal(6665);
  });
});
