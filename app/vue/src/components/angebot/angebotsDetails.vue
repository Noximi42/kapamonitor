<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        md="4"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
          <v-card-title>
            {{ item.resource.name }}
          </v-card-title>
          <v-card-subtitle>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-chip
                  color="scondary"
                  outlined
                  v-on="on"
                >
                  <v-icon left>
                    mdi-blur-radial
                  </v-icon>
                  {{ item.menge }}
                </v-chip>
              </template>
              <span>Menge</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-chip
                  class="ma-2"
                  color="scondary"
                  outlined
                  v-on="on"
                >
                  <v-icon left>
                    mdi-clock-outline
                  </v-icon>
                  {{ $moment(item.creationDate).format('LL') }}
                </v-chip>
              </template>
              <span>Erstellungsdatum</span>
            </v-tooltip>
          </v-card-subtitle>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="8"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
          {{ item }}
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AngebotsDetails',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style>

</style>
