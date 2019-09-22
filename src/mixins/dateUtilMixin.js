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

    timeToHour (toFormat) {
      const date = new Date(toFormat)
      const hours = (`0${date.getHours()}`).slice(-2)
      const minutes = (`0${date.getMinutes()}`).slice(-2)
      return hours + ':' + minutes
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
    }
  }
}
