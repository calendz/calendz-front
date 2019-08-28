import { Validator } from 'vee-validate'

Validator.extend('email_epsi_wis', {
  validate: value => value.includes('@epsi.fr') || value.includes('@wis.fr')
})

Validator.extend('contains_one_number', {
  validate: value => /\d/.test(value)
})

Validator.extend('contains_one_letter', {
  validate: value => /[a-zA-Z]/.test(value)
})

Validator.extend('valid_grade', {
  validate: value => ['B1 G1', 'B1 G2', 'B2 G1', 'B2 G2', 'B3 G1', 'B3 G2', 'B3 G3', 'I4 G1', 'I4 G2', 'I5 G1', 'I5 G2'].indexOf(value) !== -1
})
