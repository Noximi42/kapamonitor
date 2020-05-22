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
    async submit () {
      if (this.$refs.form.validate()) {
        this.loading = true

        const form = new FormData()

        form.append('grant_type', 'password')
        form.append('username', this.email)
        form.append('password', this.password)
        form.append('client_id', process.env.AUTH_CLIENT_ID)
        form.append('scope', 'openid offline_access KapaMonitor_Api')

        try {
          await this.$auth.loginWith('local', {
            data: form
          })
          this.$router.back()
        } catch (err) {
          // TODO: Show login failure message
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}
</style>
