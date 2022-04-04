import User from './User'

class UserRepository {
  constructor(userData) {
    this.userData = userData;
    this.userObjects = this.createUsers();
  }

  createUsers() {
    const mapUser = this.userData.map(user => {
      const createClass = new User(user);
      return createClass;
    });
    return mapUser;
  }
};

export default UserRepository;
