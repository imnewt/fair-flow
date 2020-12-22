import firestore from '@react-native-firebase/firestore';
import { DateTime } from 'luxon';
const DATE_FROMAT = 'dd/LL/yyyy';
const TIME_FROMAT = 'HH:mm';
class Commons {

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    });
  }

  nFormatter(num) {
    if (num >= 1000000000) {
       return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    }
    if (num >= 1000000) {
       return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
       return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num;
  }

  date2DateString(date) {
    return DateTime.fromJSDate(date).toFormat(DATE_FROMAT)
  }

  date2TimeString(date) {
    return DateTime.fromJSDate(date).toFormat(TIME_FROMAT)
  }

  fromNow(date) {
    return DateTime.fromJSDate(date).toRelative({ locale: 'vi' })
  }

  nonAccentVietnamese(str) {
    str = str.toLowerCase()
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i")
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
    str = str.replace(/đ/g, "d")
    return str
  }

  formatCurrency(number) {
    return `${number}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  toJSDate(date) {
    if (!date) return firestore.Timestamp.now() //firestore.FieldValue.serverTimestamp()
    if (!(date instanceof Date)) return date.toDate()
    return date
  }

}

export default new Commons()