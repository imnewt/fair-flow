import AsyncStorage from '@react-native-async-storage/async-storage';
import Logger from 'app/src/utils/Logger';

class AsyncStore {
  set = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
      Logger.log('AsyncStore set', key, value)
    } catch (e) {
      Logger.log('AsyncStore set failed', e)
    }
  }

  get = async (key) => {
    try {
      return await AsyncStorage.getItem(key)
    } catch(e) {
      Logger.log('AsyncStore get failed', e)
    }
  }

  remove = async (key) => {
    try {
      return await AsyncStorage.removeItem(key)
    } catch(e) {
      Logger.log('AsyncStore remove failed', e)
    }
  }
}

export default new AsyncStore()