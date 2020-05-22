const apiFactory = axios => ({
  getCertificates () {
    return axios.get('/Certificate')
  },
  getOffers () {
    return axios.get('/Offer')
  },
  getResources () {
    return axios.get('/Resource')
  },
  getContactInfo () {
    return axios.get('/ContactInfo/1')
  },
  postOffer (payload) {
    return axios.post('/Offer', payload)
  }
})

export default ({ $axios }, inject) => {
  const api = apiFactory($axios)
  inject('api', api)
}
