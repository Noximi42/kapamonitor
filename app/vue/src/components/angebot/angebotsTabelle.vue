<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    :search="search"
    item-key="id"
    show-expand
    class="elevation-1 mt-5"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{ ueberschrift }}</v-toolbar-title>
        <v-btn
          color="accent"
          class="ml-2"
          rounded
          :to="'/neues-angebot'"
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          Erstellen
        </v-btn>
        <v-spacer />
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        />
      </v-toolbar>
    </template>
    <template v-slot:expanded-item="{ item }">
      <td :colspan="headers.length">
        <slot name="details" :item="item" />
      </td>
    </template>
    <slot />
  </v-data-table>
</template>

<script>
export default {
  name: 'AngebotsTabelle',
  props: {
    headers: {
      type: Array,
      default: null
    },
    ueberschrift: {
      type: String,
      default: 'Übersicht'
    },
    items: {
      type: Array,
      default: () => []
    },
    singleExpand: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      expanded: [],
      search: ''
    }
  }
}
</script>

<style>

</style>
