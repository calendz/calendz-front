import { Validator } from 'vee-validate'

const dictionary = {
  fr: {
    // new rules
    messages: {
      email_epsi: 'L\'adresse mail doit être une adresse EPSI.',
      contains_one_letter: (field) => 'Le champ ' + field + ' doit contenir au moins une lettre.',
      contains_one_number: (field) => 'Le champ ' + field + ' doit contenir au moins un chiffre.',
      valid_grade: 'La classe indiquée n\'est pas valide.',
      valid_group: 'Le groupe indiqué n\'est pas valide.',
      valid_city: 'La ville indiquée n\'est pas valide.',
      valid_task_type: 'Le type de tâche indiqué n\'est pas valide.',
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
