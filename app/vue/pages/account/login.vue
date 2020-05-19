<template>
  <div class="d-flex justify-center align-center container">
    <v-card class="elevation-12" width="400px">
      <v-toolbar color="primary" dark flat>
        <v-icon class="mr-2">
          person
        </v-icon>
        <v-toolbar-title>Login</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-card-text>
        <v-form ref="form" v-model="valid" :lazy-validation="true">
          <v-text-field
            label="E-Mail"
            name="login"
            prepend-icon="email"
            type="email"
            :rules="emailRules"
          />

          <v-text-field
            id="password"
            label="Passwort"
            name="password"
            prepend-icon="lock"
            type="password"
            :rules="passwordRules"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          text
          small
          to="/account/register"
        >
          Registrieren
        </v-btn>
        <v-spacer />
        <v-btn
          color="primary"
          :disabled="!valid || loading"
          :loading="loading"
          @click="submit"
        >
          Login
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      valid: false,
      email: '',
      password: '',
      loading: false,
      emailRules: [
        (v) => {
          const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return (
            re.test(String(v).toLowerCase()) ||
            'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
          )
        }
      ],
      passwordRules: [v => !!v || 'Bitte geben Sie Ihr Passwort ein.']
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.loading = true
      }
    }
  }
}
</script>

<style lang="scss">
.container {
  height: 100%;
}
</style>
