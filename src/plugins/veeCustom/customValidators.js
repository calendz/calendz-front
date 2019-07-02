import { Validator } from 'vee-validate'

Validator.extend('epsimail', {
  validate: value => value.includes('@epsi.fr') || value.includes('@wis.fr')
})
