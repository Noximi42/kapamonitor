<template>
  <v-footer
    padless
  >
    <v-card
      class="flex primary"
      flat
      tile
    >
      <v-card-title>
        <strong class="subheading white--text">Wir helfen! Schreiben Sie uns Ihre Fragen und Anmerkungen.</strong>

        <v-spacer />

        <v-btn
          v-for="icon in icons"
          :key="icon.class"
          class="mx-4"
          dark
          icon
          :href="icon.link"
        >
          <v-icon size="24px">
            {{ icon.class }}
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="white--text text-center">
        {{ new Date().getFullYear() }} — <strong>Kapamonitor</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  data: () => ({
    icons: [
      {
        class: 'mdi-twitter',
        link: 'https://twitter.com/kapamonitor'
      },
      {
        class: 'mdi-instagram',
        link: 'https://www.instagram.com/kapamonitor'
      }
    ]
  })
}
</script>

<style>

</style>
