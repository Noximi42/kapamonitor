<template>
  <v-app>
    <Navbar />

    <v-content class="mx-4 mb-4">
      <router-view />
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import '~/assets/imports'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

export default {
  components: {
    Navbar,
    Footer
  },
  data () {
    return {

    }
  }
}
</script>
