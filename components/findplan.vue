<template>
  <div>
    <section class="findplan-info-section">
      <div style="display: flex; align-items: center; gap: 30px; flex-wrap: wrap; justify-content: center;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
          <p>사용하실 학급 수를 알려 주세요.</p>
          <div style="position: relative; padding: 0 20px;">
            <input type="number" v-model="classCount" class="findplan-input" min="1" style="padding-right: 40px" @input="handleInputChange"/>
            <span style="position: absolute; right: 40px; top: 50%; transform: translateY(-50%); color: #666;">학급</span>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
          <p>총 학생 수를 알려 주세요.</p>
          <div style="position: relative; padding: 0 20px;">
            <input type="number" v-model="studentCount" class="findplan-input" min="1" style="padding-right: 40px" @input="handleInputChange"/>
            <span style="position: absolute; right: 40px; top: 50%; transform: translateY(-50%); color: #666;">명</span>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
          <p>사용하실 기간을 알려 주세요.</p>
          <div style="position: relative; padding: 0 20px;">
            <input type="number" v-model="period" class="findplan-input" min="1" style="padding-right: 40px" @input="handleInputChange"/>
            <span style="position: absolute; right: 40px; top: 50%; transform: translateY(-50%); color: #666;">개월</span>
          </div>
        </div>
      </div>
      <p v-if="errPhrase" style="text-align: center; padding-top: 20px; color: red; font-size: 16px; font-weight: bold;">{{ errPhrase }}</p>

      <!-- <div style="display: flex; align-items: center; gap: 30px; flex-wrap: wrap; justify-content: center;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
          <p>사용하실 학급 수를 알려 주세요.</p>
          <div style="position: relative; padding: 0 20px;">
            <input type="number" v-model="classCount" class="findplan-input" min="1" style="padding-right: 40px" @input="handleInputChange"/>
            <span style="position: absolute; right: 40px; top: 50%; transform: translateY(-50%); color: #666;">학급</span>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
          <p>총 학생 수를 알려 주세요.</p>
          <div style="position: relative; padding: 0 20px;">
            <input type="number" v-model="studentCount" class="findplan-input" min="1" style="padding-right: 40px" @input="handleInputChange"/>
            <span style="position: absolute; right: 40px; top: 50%; transform: translateY(-50%); color: #666;">명</span>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
          <p>사용하실 기간을 알려 주세요.</p>
          <div style="position: relative; padding: 0 20px;">
            <input type="number" v-model="period" class="findplan-input" min="1" style="padding-right: 40px" @input="handleInputChange"/>
            <span style="position: absolute; right: 40px; top: 50%; transform: translateY(-50%); color: #666;">개월</span>
          </div>
        </div>
        <p v-if="errPhrase" style="color: red; font-size: 16px; font-weight: bold;">{{ errPhrase }}</p>
      </div> -->
    </section>
    <section class="findplan-buttons-section">
      <h3 style="text-align: center; font-size: 1.5em; margin: 20px 0 30px;">나를 위한 플랜은?</h3>
      <div style="display: flex; flex-wrap: wrap; gap: 30px; margin: 20px 0;">
        <div style="min-width: 250px; flex: 1 1 250px;">
          <p class="findplan-input" :style="{ backgroundColor: foundPlan.color, color: foundPlan.color != '#fff' ? 'white' : 'black', maxWidth: 'inherit', padding: '30px 10px' }">{{ foundPlan.name }}</p>
        </div>
        <div style="min-width: 400px; flex: 2 1 400px;">
          <div class="findplan-input" style="background-color: #fff; max-width: inherit; font-size: 20px; padding: 30px 20px; display: flex; flex-direction: row; justify-content: space-between; align-items: center; gap: 10px;">
            <span style="color: #666;">예상 견적</span>
            <p style="font-size: 24px; font-weight: 900;">
              {{ foundPlan.price.toLocaleString() }}
            </p>
            <span style="color: #666;">원</span>
          </div>
          <div v-if="foundPlan.idx == 0 || insertedPeriods.length >= 2">
            <div v-for="(period, idx) in insertedPeriods" :key="period" style="display: flex; flex-direction: row; justify-content: end; align-items: center; gap: 10px; margin: 20px;">
              <span v-if="idx > 0" style="padding: 0 10px; font-size: 24px; font-weight: 900;">+</span>
              <p>{{ period }}개월 : {{ plans[foundPlan.idx]['month' + period].toLocaleString() }}원 <span v-if="foundPlan.idx == 0 &&classCount > 1">* {{ classCount }}학급 = {{ (plans[foundPlan.idx]['month' + period] * classCount).toLocaleString() }}원</span></p>
            </div>
          </div>
          <div style="display: flex; justify-content: center;">
            <button class="findplan-button" @click="goToEstimate" :style="{ backgroundColor: foundPlan.color2, color: 'black' }">
              {{ foundPlan.buttonLabel }}
            </button>
            <button class="findplan-button" @click="goToEstimate" :style="{ backgroundColor: foundPlan.color2, color: 'black' }">
              {{ foundPlan.button2Label }}
            </button>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  setup() {
    const classCount = ref(1)
    const studentCount = ref(40)
    const period = ref(1)
    const insertedPeriods = ref([])
    const errPhrase = ref('')
    const { plans, periods } = usePlans()
    return { classCount, studentCount, period, plans, periods, insertedPeriods, errPhrase }
  },
  data() {
    return {
      inputFields: [
        { modelValue: this.classCount, title: '사용하실 학급 수를 알려 주세요.', unit: '학급' },
        { modelValue: this.studentCount, title: '총 학생 수를 알려 주세요.', unit: '명' },
        { modelValue: this.period, title: '사용하실 기간을 알려 주세요.', unit: '개월' }
      ],
      foundPlan: {
        name: this.plans[0].title + ' 플랜',
        price: this.plans[0].month1,
        color: this.plans[0].color,
        color2: this.plans[0].color2,
        buttonLabel: '견적서 신청 바로가기',
        button2Label: '구매하기',
        idx: 0,
      }
    }
  },
  methods: {
    handleInputChange() {
      if (this.period > 12) {
        this.period = 12;
      } else if (this.errPhrase) {
        this.errPhrase = ''
      }
      if (this.classCount && this.studentCount && this.period) {
        let adjustedClassCount = this.classCount
        let studentsPerClass = this.studentCount / adjustedClassCount
        while (studentsPerClass > this.plans[0].maxStudent) {
          adjustedClassCount++
          studentsPerClass = this.studentCount / adjustedClassCount
        }

        if (adjustedClassCount != this.classCount) {
          this.classCount = adjustedClassCount
          this.errPhrase = '한 학급당 최대 학생수는 40명입니다. 학급수를 자동 조정했습니다.'
        }
        
        let remainingMonths = this.period
        this.insertedPeriods = []
        if (remainingMonths === 12) {
          this.insertedPeriods = [12]
        } else {
          while (remainingMonths > 0) {
            if (remainingMonths >= 6) {
              this.insertedPeriods.push(6)
              remainingMonths -= 6
            } else if (remainingMonths >= 4) {
              this.insertedPeriods.push(4) 
              remainingMonths -= 4
            } else {
              this.insertedPeriods.push(1)
              remainingMonths -= 1
            }
          }
        }


        if (this.studentCount > this.plans[3].maxStudent) {
          this.foundPlan.name = '대규모 학교 플랜'
          this.foundPlan.price = this.insertedPeriods.reduce((total, period) => {
            return total + this.plans[4]['month' + period]
          }, 0)
          this.foundPlan.color = this.plans[4].color
          this.foundPlan.color2 = this.plans[4].color2
          this.foundPlan.buttonLabel = '문의하기'
          this.foundPlan.idx = 4
        } else if (this.studentCount > this.plans[2].maxStudent) {
          this.foundPlan.name = '중규모 학교 플랜'
          this.foundPlan.price = this.insertedPeriods.reduce((total, period) => {
            return total + this.plans[3]['month' + period]
          }, 0)
          this.foundPlan.color = this.plans[3].color
          this.foundPlan.color2 = this.plans[3].color2
          this.foundPlan.buttonLabel = '문의하기'
          this.foundPlan.idx = 3
        } else if (this.studentCount > this.plans[1].maxStudent) {
          this.foundPlan.name = '소규모 학교 플랜'
          this.foundPlan.price = this.insertedPeriods.reduce((total, period) => {
            return total + this.plans[2]['month' + period]
          }, 0)
          this.foundPlan.color = this.plans[2].color
          this.foundPlan.color2 = this.plans[2].color2
          this.foundPlan.buttonLabel = '견적서 신청 바로가기'
          this.foundPlan.idx = 2
        } else if (studentsPerClass > this.plans[0].maxStudent || this.classCount > 4) {
          this.foundPlan.name = '학년 플랜'
          this.foundPlan.price = this.insertedPeriods.reduce((total, period) => {
            return total + this.plans[1]['month' + period]
          }, 0)
          this.foundPlan.color = this.plans[1].color
          this.foundPlan.color2 = this.plans[1].color2
          this.foundPlan.buttonLabel = '견적서 신청 바로가기'
          this.foundPlan.idx = 1
        } else {
          this.foundPlan.name = '학급 플랜'
          this.foundPlan.price = this.insertedPeriods.reduce((total, period) => {
            return total + this.plans[0]['month' + period] * (this.adjustedClassCount ?? this.classCount)
          }, 0)
          this.foundPlan.color = this.plans[0].color
          this.foundPlan.color2 = this.plans[0].color2
          this.foundPlan.buttonLabel = '견적서 신청 바로가기'
          this.foundPlan.idx = 0
        }
      } else {
        this.insertedPeriods = []

        this.foundPlan.name = '플랜 찾기'
        this.foundPlan.price = 0
        this.foundPlan.color = '#fff'
        this.foundPlan.color2 = '#fff'
        this.foundPlan.buttonLabel = '견적서 신청 바로가기'
        this.foundPlan.idx = 0
      }
    },
    goToEstimate() {
      if (this.foundPlan.buttonLabel == '문의하기') {
        if (process.client && window.Kakao) {
          return window.Kakao.Channel.chat({
            channelPublicId: '_FvrSG', // Use your channel public ID
          });
        }
      }
      this.$router.push('/estimate');
    }
  }
}
</script>

<style scoped>
section {
  padding: 20px;
  margin-bottom: 40px;
  max-width: 1600px;
}
.findplan-buttons-section {
  background-color: #F9F9F9;
  border-radius: 8px;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.3);
}
.findplan-input {
  padding: 20px 10px;
  border: none;
  border-radius: 8px;
  font-size: 24px;
  font-weight: 900;
  max-width: 240px;
  outline: none;
  /* transition: border-color 0.2s; */
  text-align: center;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.3);
}

.findplan-input:focus {
  /* border-color: #AB79E0; */
  box-shadow: 0 0 5px rgba(171, 121, 224, 0.3);
}

.findplan-input::-webkit-outer-spin-button,
.findplan-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.findplan-button {
  padding: 20px 10px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  width: 40%;
  cursor: pointer;
  margin: 20px;
  transition: all 0.2s ease;
  background-color: #fff;
  color: #666;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.1);
}

.findplan-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.findplan-button:active {
  transform: translateY(1px);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
}

.findplan-button.selected {
  background-color: #AB79E0;
  color: white;
}

.findplan-input[type=number] {
  -moz-appearance: textfield;
}

</style>