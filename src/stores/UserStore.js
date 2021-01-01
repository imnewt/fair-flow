import {makeObservable, observable, computed, action} from 'mobx';

class UserStore {
  userData = null;
  // userData = {
  //   email: 'truc@gmail.com',
  //   displayName: 'truc',
  //   id: 'hB5scY9aQldEof0MxAnx',
  // };

  constructor() {
    makeObservable(this, {
      userData: observable,
      // isAdult: computed,
      saveUserData: action,
      updateUserData: action,
      wipeData: action,
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

  wipeData() {
    this.userData = null;
  }
}

export default UserStore;
