<template>
  <!-- <div> -->
  <!-- <h1>{{ $route.params }}</h1>
    <p>{{ angebote }}</p> -->
  <AngebotsTabelle :headers="headers" :items="angebote" ueberschrift="Angebote" />
  <!-- </div> -->
</template>

<script>
import AngebotsTabelle from '../../components/angebot/angebotsTabelle'
export default {
  components: {
    AngebotsTabelle
  },
  asyncData ({ app }) {
    return app.$api.getOffers().then((res) => {
      console.log(res)
      return { angebote: res.data }
    })
  },
  data () {
    return {
      angebote: [],
      headers: [
        { text: 'Ressource', value: 'resource.name' },
        { text: 'Menge', value: 'number' },
        { text: 'Preis', value: '' },
        { text: 'Postleitzahl', value: 'location.address.zipCode' },
        { text: 'Ort', value: 'location.address.city' },
        { text: '', value: 'data-table-expand' }
      ]
    }
  }
}
</script>

<style>

</style>
