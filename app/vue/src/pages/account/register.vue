<template>
  <div class="d-flex justify-center align-center container">
    <v-card class="elevation-12" width="400px">
      <v-toolbar color="primary" dark flat>
        <v-icon class="mr-2">
          person
        </v-icon>
        <v-toolbar-title>Registrieren</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-card-text>
        <v-form ref="form" v-model="valid" :lazy-validation="true">
          <v-text-field
            v-model="email"
            label="E-Mail"
            name="login"
            prepend-icon="email"
            type="email"
            :rules="emailRules"
          />

          <v-text-field
            id="password"
            v-model="password"
            label="Passwort"
            name="password"
            prepend-icon="lock"
            :rules="passwordRules"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
            @click:append="showPassword = !showPassword"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          text
          small
          to="/account/login"
        >
          Zum Login
        </v-btn>
        <v-spacer />
        <v-btn
          color="primary"
          :disabled="!valid || loading"
          :loading="loading"
          @click="submit"
        >
          Registrieren
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  auth: false,
  data () {
    return {
      valid: false,
      email: '',
      password: '',
      loading: false,
      showPassword: false,
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

        const data = {
          username: this.email,
          password: this.password
        }

        this.$axios.post('http://localhost:4000/Auth/Register', data)
          .then((res) => {
            // TODO: Call login method
            this.$router.push('/account/login')
          })
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
