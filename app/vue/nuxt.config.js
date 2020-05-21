import colors from 'vuetify/es5/util/colors'

const isDev = process.env.NODE_ENV !== 'production'
const dotEnvFile = isDev ? '.env.dev' : '.env.prod'

require('dotenv').config({
  path: dotEnvFile
})

export default {
  mode: 'universal',

  dev: isDev,
  buildDir: '.build/nuxt',
  srcDir: 'src',

  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Customize the progress-bar color
  loading: { color: '#fff' },

  css: [
  ],

  plugins: [
  ],

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    ['@nuxtjs/dotenv', { filename: dotEnvFile, path: __dirname }]
  ],

  auth: {
    redirect: {
      login: '/account/login'
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: process.env.AUTH_URL + '/connect/token', method: 'post', propertyName: 'access_token', headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: process.env.AUTH_URL + '/connect/userinfo', method: 'get', propertyName: 'user' }
        }
        // tokenRequired: true,
        // tokenType: 'bearer',
        // globalToken: true,
        // autoFetchUser: true
      }
    }
  },

  router: {
    middleware: ['auth']
  },

  axios: {
    baseURL: process.env.API_URL
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#1868ae',
          accent: '#d9a5b3',
          secondary: '#c6d7eb',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    },
    icons: {
      iconfont: 'md'
    }
  },

  build: {
    extend (config, ctx) {
    }
  }
}
