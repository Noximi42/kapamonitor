<template>
  <!-- <div> -->
  <!-- <h1>{{ $route.params }}</h1>
    <p>{{ angebote }}</p> -->
  <AngebotsTabelle :headers="headers" :items="angebote" ueberschrift="Angebote">
    <template slot="details" slot-scope="{item}">
      <AngebotsDetails :item="item" />
    </template>
  </AngebotsTabelle>
  <!-- </div> -->
</template>

<script>
import AngebotsTabelle from '../../components/angebot/angebotsTabelle'
import AngebotsDetails from '../../components/angebot/angebotsDetails'
export default {
  components: {
    AngebotsTabelle,
    AngebotsDetails
  },
  asyncData ({ app }) {
    return app.$api.getOffers().then((res) => {
      console.log(res)
      const items = res.data.map((item) => {
        return {
          menge: item.number + ' ' + item.resource.unitOfMeasure,
          ...item
        }
      })
      return { angebote: items }
    })
  },
  data () {
    return {
      angebote: [],
      headers: [
        { text: 'Ressource', value: 'resource.name' },
        { text: 'Menge', value: 'menge' },
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
