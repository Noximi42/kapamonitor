<template>
  <div>
    <h1>Angebote</h1>
    <v-btn @click="callApi">
      API getCertificates
    </v-btn>
  </div>
</template>

<script>
export default {
  components: {},
  methods: {
    async callApi () {
      await this.$api.getCertificates()
    }
  }
}
</script>
