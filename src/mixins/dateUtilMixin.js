export default {
  methods: {

    // ============================
    // == Getters
    // ============================

    getFuzzyTime (timestamp) {
      const seconds = Math.floor(new Date().getTime() / 1000 - timestamp / 1000)
      if (seconds > 2 * 12 * 30 * 24 * 3600) return Math.floor(seconds / 12 / 30 / 3600 / 24) + ' ans'
      if (seconds > 12 * 30 * 24 * 3600) return Math.floor(seconds / 12 / 30 / 3600 / 24) + ' an'
      if (seconds > 30 * 24 * 3600) return Math.floor(seconds / 30 / 3600 / 24) + ' mois'
      if (seconds > 7 * 24 * 3600) return Math.floor(seconds / 7 / 3600 / 24) + ' sem'
      if (seconds > 2 * 24 * 3600) return Math.floor(seconds / 3600 / 24) + 'j'
      if (seconds > 24 * 3600) return 'hier'
      if (seconds > 3600) return Math.floor(seconds / 3600) + 'h'
      if (seconds > 60) return Math.floor(seconds / 60) + 'm'
      if (seconds > 1) return seconds + 's'
      return '?? secondes'
    },

    getMonthFromDate (date) {
      date = new Date(date)
      switch (date.getMonth()) {
        case 0: return 'Janvier'
        case 1: return 'Février'
        case 2: return 'Mars'
        case 3: return 'Avril'
        case 4: return 'Mai'
        case 5: return 'Juin'
        case 6: return 'Juillet'
        case 7: return 'Août'
        case 8: return 'Septembre'
        case 9: return 'Octobre'
        case 10: return 'Novembre'
        case 11: return 'Décembre'
        default: return 'erreur'
      }
    },

    getMonday (date) {
      date = new Date(date)
      const day = date.getDay()
      const diff = date.getDate() - day + (day === 0 ? -6 : 1) // adjust when day is sunday
      return new Date(date.setDate(diff))
    },

    getFirstFridayOfMonth (date) {
      date = new Date(date)
      let targetDay = ''
      const seekDay = 5
      let i = 1
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

      while (i < 31) {
        targetDay = new Date(`${i++} ${monthNames[date.getMonth()]} ${date.getFullYear()}`)
        if (targetDay.getDay() === seekDay) return targetDay
      }
      return false
    },

    // ============================
    // == Conversions
    // ============================

    dateToDayMonthYear (date) {
      date = new Date(date)
      const day = (`0${date.getDate()}`).slice(-2)
      const month = (`0${date.getMonth() + 1}`).slice(-2)
      const year = date.getFullYear().toString().substr(-2)
      return `${day}-${month}-${year}`
    },

    dateToMonthDayYear (date) {
      date = new Date(date)
      const day = (`0${date.getDate()}`).slice(-2)
      const month = (`0${date.getMonth() + 1}`).slice(-2)
      const year = date.getFullYear().toString().substr(-2)
      return `${month}-${day}-${year}`
    },

    // eg: 'lundi 30 septembre'
    dateToFullString (date) {
      date = new Date(date)
      const day = this.dayNbToString(date.getDay())
      const dayNumber = ('0' + date.getDate()).slice(-2)
      const month = this.monthNbToString(date.getMonth())
      return `${day} ${dayNumber} ${month}`
    },

    // eg: '07:12:42'
    dateToTimeString (date, separator = ':') {
      date = new Date(date)
      const hours = (`0${date.getHours()}`).slice(-2)
      const minutes = (`0${date.getMinutes()}`).slice(-2)
      const seconds = (`0${date.getSeconds()}`).slice(-2)
      return `${hours}${separator}${minutes}:${seconds}`
    },

    dayNbToString (day) {
      switch (day) {
        case 0: return 'dimanche'
        case 1: return 'lundi'
        case 2: return 'mardi'
        case 3: return 'mercredi'
        case 4: return 'jeudi'
        case 5: return 'vendredi'
        case 6: return 'samedi'
      }
    },

    monthNbToString (month) {
      switch (month) {
        case 0: return 'janvier'
        case 1: return 'février'
        case 2: return 'mars'
        case 3: return 'avril'
        case 4: return 'mai'
        case 5: return 'juin'
        case 6: return 'juillet'
        case 7: return 'août'
        case 8: return 'setpembre'
        case 9: return 'octobre'
        case 10: return 'novembre'
        case 11: return 'décembre'
      }
    },

    timeToHour (toFormat, separator = ':') {
      const date = new Date(toFormat)
      const hours = (`0${date.getHours()}`).slice(-2)
      const minutes = (`0${date.getMinutes()}`).slice(-2)
      return hours + separator + minutes
    },

    timestampToDate (timestamp) {
      const date = new Date(timestamp * 1000 / 1000)
      return date
    },

    // ============================
    // == Others
    // ============================

    hasPassed (date) {
      date = new Date(date).getTime()
      const now = new Date().getTime()
      return now > date
    },

    isBetween (start, end) {
      start = new Date(start).getTime()
      end = new Date(end).getTime()
      const now = new Date().getTime()
      return now > start && now < end
    },

    getProgress (start, end) {
      start = new Date(start).getTime()
      end = new Date(end).getTime()
      const now = new Date().getTime()
      return Math.round(((now - start) / (end - start)) * 100)
    }
  }
}
