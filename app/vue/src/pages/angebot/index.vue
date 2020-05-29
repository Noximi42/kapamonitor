<template>
  <!-- <h1>{{ $route.params }}</h1>
    <p>{{ angebote }}</p> -->
  <div>
    <AngebotsTabelle :headers="headers" :items="angebote" ueberschrift="Angebote">
      <template slot="details" slot-scope="{item}">
        <AngebotsDetails :item="item" />
      </template>
    </AngebotsTabelle>
    <v-card style="border-top-left-radius: 0; border-top-right-radius: 0; box-shadow: 0px 5px 1px -2px rgba(0, 0, 0, 0.2), 0px 5px 2px 0px rgba(0, 0, 0, 0.14), 0px 5px 5px 0px rgba(0, 0, 0, 0.12);">
      <v-card-subtitle style="position: absolute; top: -3.6em" class="body-1 font-weight-bold">
        Weitere Aktionen:
      </v-card-subtitle>
      <v-card-actions class="actionsDetails" style="background: rgb(249, 249, 249); border-top-left-radius: 0; border-top-right-radius: 0">
        <v-btn
          color="accent"
          class="ml-2"
          rounded
          @click="download"
        >
          <v-icon left>
            mdi-download
          </v-icon>
          Download
        </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import XLSX from 'xlsx'
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
  },
  methods: {
    download () {
      const wb = XLSX.utils.book_new()
      const wsName = 'Angebote'
      const data = [['Ressource', 'Menge', 'Stückpreis', 'Postleitzahl', 'Ort', 'Vorname', 'Nachname', 'Email', 'Telefon'], ...this.angebote.map((value, index) => {
        if (value.location) {
          return [value.resource.name, value.menge, this.$filters.toEuro(value.price), value.location.address.zipCode, value.location.address.city, value.contactInfo.firstName, value.contactInfo.lastName, value.contactInfo.email, value.contactInfo.phone]
        } else {
          return [value.resource.name, value.menge, this.$filters.toEuro(value.price), '-', '-', value.contactInfo.firstName, value.contactInfo.lastName, value.contactInfo.email, value.contactInfo.phone]
        }
      })]
      const ws = XLSX.utils.aoa_to_sheet(data)

      XLSX.utils.book_append_sheet(wb, ws, wsName)
      XLSX.writeFile(wb, 'Angebote.xlsb')
    }
  }
}
</script>

<style>

</style>
