<template>
  <div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
    <h2 style="font-size: 2em;">전체 플랜 보기</h2>
    <div v-if="true" style="display: flex; flex-wrap: wrap; gap: 30px; margin-top: 20px; justify-content: center; max-width: 1600px; position: relative;">
      <div v-for="(plan, index) in plans" :key="plan.value" style="position: relative;border-radius: 36px; width: 250px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-align: center; font-weight: 900">
        <h2 :style="{
          textAlign: 'center',
          backgroundColor: plan.color,
          margin: '0px',
          padding: '30px 10px',
          borderRadius: '36px 36px 0 0',
          color: 'white',
          fontWeight: 'bold'
        }">{{ plan.title }} 플랜</h2>
          <p :style="{
            fontSize: '13px',
            margin: '10px',
            padding: '10px',
            borderRadius: '8px',
            textAlign: 'center',
            backgroundColor: plan.color2,
            color: plan.color
          }">{{ plan.subTitle }}</p>
          <p style="padding: 0; margin-bottom: 0;">최대 등록 가능한 학생 수</p>
          <p style="padding: 0; margin-top: 4px; font-size: 17px;">{{ plan.maxStudent === Infinity ? '제한없음' : plan.maxStudent + '명' }}</p>
          <div style="text-align: left; margin: 20px 0px;">
            <template v-for="period in periods">
              <div v-if="period.value === 'month1'" :key="`${period.value}-if`" :style="{
                cursor: 'grab',
                backgroundColor: selectedPeriods[plan.value] === period.value ? plan.color2 : 'transparent',
                padding: '20px 10px'}">
                <input type="radio" :name="`period-${plan.value}`" :id="`${plan.value}-${period.value}`" :value="period.value" v-model="selectedPeriods[plan.value]" @change="updateSelectedPeriod(plan.value, period.value)" style="margin-right: 8px; cursor: grab;">
                <label :for="`${plan.value}-${period.value}`" :style="{
                  cursor: 'grab',
                  fontWeight: 'bold',
                  color: plan.color
                }">
                  {{ period.title }} {{ plan[period.value].toLocaleString() }}원
                </label>
              </div>
              <div v-else :key="`${period.value}-else`" :style="{
                cursor: 'grab',
                backgroundColor: selectedPeriods[plan.value] === period.value ? plan.color2 : 'transparent',
                padding: '20px 10px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }">
                <input type="radio" :name="`period-${plan.value}`" :id="`${plan.value}-${period.value}`" :value="period.value" v-model="selectedPeriods[plan.value]" @change="updateSelectedPeriod(plan.value, period.value)" style="margin-right: 8px; cursor: grab;">
                <label :for="`${plan.value}-${period.value}`" :style="{
                  cursor: 'grab',
                  flex: 1
                }">
                  <p style="margin: 0; padding: 0;">
                    <span :style="{ color: plan.color }">{{ period.title }}</span>
                    <span style="position: relative; color: #999; font-size: 0.9em; margin-left: 8px;">
                      {{ (plan.month1 * parseInt(period.value.replace('month',''))).toLocaleString() }}원
                      <div style="position: absolute; top: 50%; left: -5%;">
                        <img src="@/assets/discountLine.png" :style="{ width: index > 2 ? '125%' : '140%', height: index > 2 ? '70%' : '100%' }">
                      </div>
                    </span>
                  </p>
                  <p :style="{
                    margin:'20px 0px 0px 30px', padding: 0,
                    fontWeight: 'bold', 
                    color: plan.color
                  }">
                    {{ plan[period.value].toLocaleString() }}원
                  </p>
                </label>
              </div>
            </template>
          </div>
          <button @click="goToPay(plan.value)" :style="{
            marginBottom: '20px',
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: plan.color2,
            color: plan.color,
            fontWeight: 'bold',
            cursor: 'pointer'
          }">{{ index > 2 ? '직접 문의' : '결제하기' }}</button>
          <!-- <div v-if="index > 2" style="width: 100%; height: calc(100% - 88px); background-color: rgba(0, 0, 0, 0.2); border-radius: 0 0 36px 36px; display: flex; justify-content: center; align-items: center; font-size: 24px; font-weight: bold; color: #666; position: absolute; top: 88px; right: 0;">
          </div> -->
      </div>
    </div>
    <div style="width: 100%; margin-top: 100px; display: flex; flex-direction: column; align-items: center;">
      <p style="font-size: 1.2em; color: #999;">나에게 맞는 플랜을 찾기 어려울 땐,</p>
      <h2 style="font-size: 2em; margin-top: 10px; margin-bottom: 50px;">맞춤형 플랜 찾기</h2>
      <findplan />
    </div>
  </div>
  
</template>

<script>
import { usePlans } from '@/composables/usePlans'
import findplan from '~/components/findplan.vue'

export default {
  setup() {
    const { plans, periods } = usePlans()
    return { plans, periods }
  },
  data() {
    return {
      selectedPeriods: {
        class: 'month1',
        grade: 'month1',
        schoolSmall: 'month1',
        schoolMedium: 'month1',
        schoolLarge: 'month1'
      }
    }
  },
  components: {
    findplan
  },
  methods: {
    goToPay(planTitle) {
      if (['schoolMedium', 'schoolLarge'].includes(planTitle)) {
        if (process.client && window.Kakao) {
          return window.Kakao.Channel.chat({
            channelPublicId: '_FvrSG', // Use your channel public ID
          });
        }
      }
      this.$router.push('/pay');
    },
    goToEstimate() {
      this.$router.push('/estimate');
    },
  }
}
</script>
<style>
    .payment-flow__submit-button {
      background: linear-gradient(45deg, #d8d8fa, #ab8de6);
      border: none;
      border-radius: 25px;
      color: black;
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
      padding: 12px 30px;
      text-transform: uppercase;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .payment-flow__submit-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
    }
    
    .payment-flow__submit-button:active {
      transform: translateY(1px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  </style>