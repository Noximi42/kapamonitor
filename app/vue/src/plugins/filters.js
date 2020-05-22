import Vue from 'vue'

export function toEuro (value) {
  return centToEuro(value).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
}

export function centToEuro (value) {
  return value / 100
}

const filters = { centToEuro, toEuro }

export default ({ context }, inject) => {
  Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key])
  })
  inject('filters', filters)
}
