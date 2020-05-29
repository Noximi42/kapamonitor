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
          height="100%"
        >
          <v-card-title>
            {{ item.resource.name }}
          </v-card-title>
          <v-card-subtitle>Weitere Informationen</v-card-subtitle>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-chip
                color="scondary"
                outlined
                class="ma-2"
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
          <v-tooltip v-if="item.price" bottom>
            <template v-slot:activator="{ on }">
              <v-chip
                class="ma-2"
                color="scondary"
                outlined
                v-on="on"
              >
                {{ item.price |centToEuro }}
                <v-icon right>
                  mdi-currency-eur
                </v-icon>
              </v-chip>
            </template>
            <span>Preis pro Stück</span>
          </v-tooltip>
          <v-card-subtitle v-if="item.certificates.length > 0">
            Zertifikate
          </v-card-subtitle>
          <v-chip
            v-for="certificate in item.certificates"
            :key="certificate.name"
            class="ma-2"
            color="scondary"
            outlined
          >
            <v-icon left>
              mdi-file-document-outline
            </v-icon>
            {{ certificate.name }}
          </v-chip>
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
          <v-card-title>Beschreibung</v-card-title>
          <v-card-text>
            {{ item.description }}
          </v-card-text>
        </v-card>
        <v-card
          class="pa-2"
          outlined
          tile
        >
          <v-card-title>Ihr Ansprechpartner</v-card-title>
          <v-card-text>
            <v-list three-line>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon large>
                    mdi-account-circle
                  </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.contactInfo.firstName + ' ' + item.contactInfo.lastName }}</v-list-item-title>
                  <a :href="'mailto:'+item.contactInfo.email">
                    <v-list-item-subtitle>
                      {{ item.contactInfo.email }}
                    </v-list-item-subtitle>
                  </a>
                  <a :href="'tel:'+item.contactInfo.phone">
                    <v-list-item-subtitle>
                      {{ item.contactInfo.phone }}
                    </v-list-item-subtitle>
                  </a>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider />
            <v-list v-if="item.location" three-line>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon large>
                    mdi-map-marker
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ item.location.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item.location.address.zipCode + ' ' + item.location.address.city }}</v-list-item-subtitle>
                  <v-list-item-subtitle>{{ item.location.address.street + ' ' + item.location.address.houseNumber }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
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
