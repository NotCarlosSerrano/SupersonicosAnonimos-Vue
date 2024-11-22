/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */
import '@fortawesome/fontawesome-free/css/all.css'
// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

import { aliases, fa } from 'vuetify/iconsets/fa'

// Get browser preference for dark mode
const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
const defaultTheme = darkMode ? 'dark' : 'light'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: defaultTheme,
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      fa,
    }
  }
})
