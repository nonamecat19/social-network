import defaultTheme from 'tailwindcss/defaultTheme'

// @ts-ignore
export default defineAppConfig({
  colorMode: {
    preference: 'dark'
  },
  theme: {
   primaryColor: '#054eea'
  },
  ui: {
    primary: 'green',
    danger: 'red'
  }
})