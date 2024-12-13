// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
  ],
  nitro: {
    moduleSideEffects: ['pdfkit'],
    publicAssets: [
      {
        dir: 'public',
        maxAge: 60 * 60 * 24 * 365 // 1년
      }
    ]
  },
  app: {
    head: {
      script: [
        // {
        //   src: 'https://js.tosspayments.com/v2/standard',
        //   type: 'text/javascript',
        //   defer: true,
        // },
      ],
    },
  },
})

