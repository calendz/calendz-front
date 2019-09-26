import { Validator } from 'vee-validate'

const dictionary = {
  fr: {
    // new rules
    messages: {
      email_epsi_wis: 'L\'adresse mail doit être une adresse EPSI / WIS.',
      contains_one_letter: (field) => 'Le champ ' + field + ' doit contenir au moins une lettre.',
      contains_one_number: (field) => 'Le champ ' + field + ' doit contenir au moins un chiffre.',
      valid_grade: 'La classe indiquée n\'est pas valide.',
      valid_city: 'La ville indiquée n\'est pas valide.',
      boolean: (field) => 'Le champ ' + field + ' doit être un booléen.'
    }
    // overwrite existing rules
    // custom: {
    //   email: {
    //      required: 'test'
    //   }
    // }
  }
}

Validator.localize(dictionary)
