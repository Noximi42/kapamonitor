<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
      >
        <v-card>
          <v-card-title>Neues Angebot erstellen</v-card-title>
          <v-card-text>
            <AngebotAnlegenStepper :resources="resources" :resources-dropdown="resourcesDropdown" :certificates="certificates" />
            <!-- {{ resources }} -->
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AngebotAnlegenStepper from '../components/angebot/angebotAnlegenStepper'
export default {
  components: {
    AngebotAnlegenStepper
  },
  async asyncData ({ app }) {
    const data = await app.$api.getResources().then((res) => {
      const items = res.data.map((item) => {
        return {
          text: item.name,
          value: item.id
        }
      })
      return { resourcesDropdown: items, resources: res.data }
    })
    // const contactInfo = await app.$api.getContactInfo().then((res) => {
    //   //console.log(res.data)
    //   // const items = res.data.map((item) => {
    //   //   return {
    //   //     text: item.name,
    //   //     value: item.id
    //   //   }
    //   // })
    //   // return { contactInfoDropdown: items, contactInfo: res.data }
    // })
    const certificates = await app.$api.getCertificates().then((res) => {
      console.log(res.data)
      // return res.data
      const items = res.data.map((item) => {
        return {
          text: item.name,
          value: item.id,
          resourceId: item.resourceId
        }
      })
      return { certificates: items }
      // return { contactInfoDropdown: items, contactInfo: res.data }
    })
    return { ...data, ...certificates }
  },
  data () {
    return {
      resourcesDropdown: [],
      resources: [],
      certificates: []
    }
  }
}
</script>

<style>

</style>
