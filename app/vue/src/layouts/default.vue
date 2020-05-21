<template>
  <v-app>
    <Navbar />

    <v-content class="mx-4 mb-4">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import '~/assets/imports'
import Navbar from './Navbar'

export default {
  components: {
    Navbar
  },
  data () {
    return {

    }
  }
}
</script>
