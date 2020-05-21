const apiFactory = axios => ({
  getCertificates () {
    return axios.get('/Certificate')
  },
  getOffers () {
    return axios.get('/Offer')
  }
})

export default ({ $axios }, inject) => {
  const api = apiFactory($axios)
  inject('api', api)
}
