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
  validate: value => ['B1', 'B2', 'B3', 'I1', 'I2'].indexOf(value) !== -1
})

Validator.extend('valid_city', {
  validate: value => ['Arras', 'Auxerre', 'Bordeaux', 'Brest', 'Grenoble', 'Lille', 'Lyon', 'Montpellier', 'Nantes', 'Paris', 'Dakar'].indexOf(value) !== -1
})

Validator.extend('boolean', {
  validate: value => ['true', 'false', true, false].includes(value)
})

Validator.extend('valid_role', {
  validate: value => ['ADMIN', 'MEMBER'].includes(value)
})
