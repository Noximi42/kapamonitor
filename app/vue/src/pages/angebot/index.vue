<template>
  <!-- <h1>{{ $route.params }}</h1>
    <p>{{ angebote }}</p> -->
  <AngebotsTabelle :headers="headers" :items="angebote" ueberschrift="Angebote">
    <template slot="details" slot-scope="{item}">
      <AngebotsDetails :item="item" />
    </template>
  </AngebotsTabelle>
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
      const items = res.data.map((item) => {
        return {
          menge: item.number + ' ' + item.resource.unitOfMeasure,
          eurPreis: app.$filters.toEuro(item.price),
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
        { text: 'Preis pro Stück', value: 'eurPreis' },
        { text: 'Postleitzahl', value: 'location.address.zipCode' },
        { text: 'Ort', value: 'location.address.city' },
        { text: '', value: 'data-table-expand' }
      ]
    }
  }
}
</script>

<style>

/* This is for documentation purposes and will not be needed in your application */
  /* #create .v-speed-dial {
    position: absolute;
  }

  #create .v-btn--floating {
    position: relative;
  } */

</style>
