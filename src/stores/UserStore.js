import {makeObservable, observable, computed, action} from 'mobx';

class UserStore {
  userData = {};
  // FOR TESTING PURPOSE
  // userData = {
  //   email: 'truc@gmail.com',
  //   displayName: 'Tan Truc',
  //   id: 'hB5scY9aQldEof0MxAnx',
  // };

  constructor() {
    makeObservable(this, {
      userData: observable,
      // isAdult: computed,
      saveUserData: action,
      updateUserData: action,
    });
  }

  // @computed //#2
  // get isAdult() {
  //     return this.age >= 18
  // }

  // @action //#2
  saveUserData(user) {
    this.userData = user;
  }

  updateUserData(name, phone, address) {
    this.userData.displayName = name;
    this.userData.phoneNumber = phone;
    this.userData.address = address;
  }
}

export default UserStore;
