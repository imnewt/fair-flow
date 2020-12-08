import { makeObservable, observable, computed, action } from "mobx"

class UserStore {
    email = ""
    id = ""

    // @observable name = 'Khanh Duong' //#2
    // @observable age = 15 //#2

    constructor() {
        makeObservable(this, {
            email: observable,
            id: observable,
            // isAdult: computed,
            // increment: action
        })
        // makeObservable(this) //#2
    }

    // @computed //#2
    // get isAdult() {
    //     return this.age >= 18
    // }

    // @action //#2
    // increment() {
    //   this.age++
    //   console.log('this.age', this.age)
    // }
}

export default UserStore
