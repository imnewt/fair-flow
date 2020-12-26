import {makeObservable, observable, computed, action} from 'mobx';

class UserStore {
  // userData = null
  userData = {
    // id: "Xuo2nGKAnMRbNLEL6IYp" // admin
    id: 'hB5scY9aQldEof0MxAnx', // truc
  };

  // @observable name = 'Khanh Duong' //#2
  // @observable age = 15 //#2

  constructor() {
    makeObservable(this, {
      userData: observable,
      // isAdult: computed,
      saveUserData: action,
      wipeData: action,
    });
    // makeObservable(this) //#2
  }

  // @computed //#2
  // get isAdult() {
  //     return this.age >= 18
  // }

  // @action //#2
  saveUserData(user) {
    this.userData = user;
  }

  wipeData() {
    this.userData = null;
  }
}

export default UserStore;
