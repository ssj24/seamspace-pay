export default defineNuxtPlugin(() => {
  const kakaoInit = () => {
    const kakao = window.Kakao;
    const kakaoJsKey = useRuntimeConfig().public.NUXT_PUBLIC_KAKAO_JS_KEY;
    if (!kakao.isInitialized()) {
      kakao.init(kakaoJsKey);
    }
    console.log(kakao.isInitialized());
  };

  // Only run on client-side
  if (process.client) {
    kakaoInit();
  }
});