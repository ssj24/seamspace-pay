<template>
  <div>
    <!-- 결제 UI -->
    <div id="payment-method"></div>
    <!-- 이용약관 UI -->
    <div id="agreement"></div>
    <!-- 결제하기 버튼 -->
    <button class="button" id="payment-button" style="margin-top: 30px">결제하기</button>
  </div>
</template>

<script>
export default {
  mounted() {
    this.loadAndInitializeTossPayments();
  },
  methods: {
    async loadAndInitializeTossPayments() {
      try {
        const { loadTossPayments } = await import('@tosspayments/tosspayments-sdk');
        const clientKey = "test_gck_XZYkKL4MrjD0bqEB6OgL30zJwlEW";
        const tossPayments = await loadTossPayments(clientKey);
        const customerKey = "vwBU-UlRy_GrMk5Hetk8r";
        const widgets = tossPayments.widgets({
          customerKey,
        });

        // Initialize the payment widget
        await this.initializePaymentWidget(widgets);
      } catch (error) {
        console.error('Failed to load and initialize TossPayments SDK:', error);
      }
    },
    async initializePaymentWidget(widgets) {
      const button = document.getElementById("payment-button");

      // 비회원 결제
      // const widgets = tossPayments.widgets({ customerKey: TossPayments.ANONYMOUS });

      // ------ 주문의 결제 금액 설정 ------
      await widgets.setAmount({
        currency: "KRW",
        value: 50000,
      });

      await Promise.all([
        // ------  결제 UI 렌더링 ------
        widgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        }),
        // ------  이용약관 UI 렌더링 ------
        widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);

      // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
      button.addEventListener("click", async function () {
        await widgets.requestPayment({
          orderId: "9fs1AfaaFfWGU_NJo7hF8",
          orderName: "토스 티셔츠 외 2건",
          successUrl: window.location.origin + "/pay/success",
          failUrl: window.location.origin + "/pay/fail",
          customerEmail: "customer123@gmail.com",
          customerName: "김토스",
          customerMobilePhone: "01012341234",
        });
      });
    },
  },
};
</script>

<style>

</style>