<template>
  <nav>
    <v-app-bar flat class="primary">
      <v-toolbar-title class="text-uppercase white--text">
        <span>KapaMonitor</span>
      </v-toolbar-title>
      <v-spacer />

      <v-menu v-if="this.$auth.loggedIn" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn color="white" dark text v-on="on" @click="menuOpen = !menuOpen">
            <v-icon v-if="menuOpen" left>
              expand_less
            </v-icon>
            <v-icon v-else left>
              expand_more
            </v-icon>
            <span>Menu</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <div v-if="$auth.loggedIn">
        <v-btn text color="white" @click="logout">
          <span>Ausloggen</span>
          <v-icon right>
            exit_to_app
          </v-icon>
        </v-btn>
      </div>
      <div v-else>
        <v-btn text color="white" :to="'/account/login'">
          <span>Login</span>
          <v-icon right>
            exit_to_app
          </v-icon>
        </v-btn>
      </div>
    </v-app-bar>
  </nav>
</template>

<script>

export default {
  data () {
    return {
      drawer: false,
      menuOpen: false,
      links: [
        { text: 'Angebote', route: '/' },
        { text: 'Gesuche', route: '/requirements' }
      ],
      snackbar: false
    }
  },
  methods: {
    async logout () {
      await this.$auth.logout()
      this.$router.push('/account/login')
    }
  }
}
</script>

<style>
</style>
