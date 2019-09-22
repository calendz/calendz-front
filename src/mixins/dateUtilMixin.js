export default {
  methods: {
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

    timestampToDate (timestamp) {
      const date = new Date(timestamp * 1000 / 1000)
      const day = (`0${date.getDate()}`).slice(-2)
      const month = (`0${date.getMonth() + 1}`).slice(-2)
      const year = date.getFullYear()
      return `${day}-${month}-${year}`
    },

    // eg: 'lundi 30 septembre'
    dateToString (date) {
      date = new Date(date)
      const day = this.dayNumberToString(date.getDay())
      const dayNumber = ('0' + date.getDate()).slice(-2)
      const month = this.monthNumberToString(date.getMonth())
      return `${day} ${dayNumber} ${month}`
    },

    // translates date.getDay() into french day's name
    dayNumberToString (day) {
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

    // translates date.getMonth() into french month's name
    monthNumberToString (month) {
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

    // get time as string from date (eg: '07:12:42)
    dateToTimeString (date) {
      return `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`
    }
  }
}
