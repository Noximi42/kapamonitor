const apiFactory = axios => ({
  getCertificates () {
    return axios.get('/Certificate')
  }
})

export default ({ $axios }, inject) => {
  const api = apiFactory($axios)
  inject('api', api)
}
