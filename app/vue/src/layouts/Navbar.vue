<template>
  <nav>
    <v-app-bar flat>
      <v-toolbar-title class="text-uppercase grey--text">
        <span>KapaMonitor</span>
      </v-toolbar-title>
      <v-spacer />

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn color="grey" dark text v-on="on">
            <v-icon left>
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
        <v-btn text color="grey">
          <span>Ausloggen</span>
          <v-icon right>
            exit_to_app
          </v-icon>
        </v-btn>
      </div>
      <div v-else>
        <v-btn text color="grey" :to="'/account/login'">
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
      links: [
        { text: 'Angebote', route: '/' },
        { text: 'Gesuche', route: '/requirements' }
      ],
      snackbar: false
    }
  }
}
</script>

<style>
</style>
