<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-card :color="getRandomPrimaryColor()" height="100%" outlined>
          <v-card-title class="justify-center align-center white--text">
            Angebote
          </v-card-title>
          <v-card-text class="text-center">
            <v-icon x-large class="white--text">
              description
            </v-icon>
          </v-card-text>
          <v-card-actions class="justify-center align-end flex-wrap">
            <v-btn outlined rounded to="/angebot" color="white" class="my-2">
              <v-icon left>
                description
              </v-icon>
              Übersicht
            </v-btn>
            <v-btn outlined rounded to="/neues-angebot" color="white" class="my-2">
              <v-icon left>
                note_add
              </v-icon>
              Neues Angebot
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card :color="getRandomPrimaryColor()" height="100%" outlined>
          <v-card-title class="justify-center align-center white--text">
            Bedarfe
          </v-card-title>
          <v-card-text class="text-center">
            <v-icon x-large class="white--text">
              description
            </v-icon>
          </v-card-text>
          <v-card-actions class="justify-center align-end flex-wrap">
            <v-btn outlined rounded to="/bedarf" color="white" class="my-2">
              <v-icon left>
                description
              </v-icon>
              Übersicht
            </v-btn>
            <v-btn outlined rounded to="/neuer-bedarf" color="white" class="my-2">
              <v-icon left>
                note_add
              </v-icon>
              Neuer Bedarf
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card :color="getRandomPrimaryColor()" height="100%" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-card :color="getRandomPrimaryColor()" height="100%" />
      </v-col>
      <v-col cols="12" md="6">
        <v-card :color="getRandomPrimaryColor()" height="100%" outlined>
          <v-card-title class="justify-center align-center white--text">
            Profil
          </v-card-title>
          <v-card-text class="text-center">
            <v-icon x-large class="white--text">
              person
            </v-icon>
          </v-card-text>
          <v-card-actions class="justify-center align-end flex-wrap">
            <v-btn outlined rounded to="/profile" color="white" class="my-2">
              <v-icon left>
                account_circle
              </v-icon>
              Übersicht
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {},
  methods: {
    getRandomPrimaryColor () {
      const min = 1
      const max = 5
      const random = Math.floor(Math.random() * (+max - +min)) + +min
      return 'primary lighten-' + random
    }
  }
}
</script>

<style>
.card-actions {
  position: absolute;
  bottom: 0;
}
</style>
