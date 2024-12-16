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
  runtimeConfig: {
    public: {
      NUXT_PUBLIC_KAKAO_JS_KEY: process.env.NUXT_PUBLIC_KAKAO_JS_KEY
    }
  },
  app: {
    head: {
      script: [
        {
          src: 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js',
          integrity: 'sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka',
          crossorigin: 'anonymous',
        },
      ],
    },
  },
  plugins: [
    { src: '~/plugins/kakao.client.ts', mode: 'client' }
  ],
})

