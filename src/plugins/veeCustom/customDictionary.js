import { Validator } from 'vee-validate'

const dictionary = {
  fr: {
    messages: {
      required: 'mdrr',
      epsimail: 'L\'adresse mail doit être une adresse EPSI / WIS.'
    }
  }
}

Validator.localize(dictionary)
