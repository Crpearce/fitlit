import { expect } from 'chai';
import userData from '../src/data/users';
import User from '../src/User';


describe('User', () => {
  let user;

  beforeEach(() => {
    user = new User(userData[0])
  })

  it('Should be a function', () => {
    expect(User).to.be.a('function')
  })

  it('Should be an instance of User', () => {
    expect(user).to.be.an.instanceOf(User)
  })

  it('Should be able to greet the user', () => {
    expect(user.returnUserName()).to.equal('Welcome Luisa!')
  })
})