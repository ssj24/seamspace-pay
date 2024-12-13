<template>
  <div style="margin: 0 auto; width: 80%; text-align: center;">
    <h1>견적 페이지</h1>
    <button 
      @click="isTableVisible = !isTableVisible"
      class="payment-flow__submit-button"
      style="margin-bottom: 20px; margin-left: auto; display: block;"
    >
      {{ isTableVisible ? '견적표 숨기기' : '견적표 보기' }}
    </button>
    <button 
      @click="isExcelVisible = !isExcelVisible"
      class="payment-flow__submit-button"
      style="margin-bottom: 20px; margin-left: auto; display: block;"
    >
      견적서 만들기
    </button>
    <div v-show="isTableVisible" style="width: 100%; margin: 20px 0; overflow-x: auto;">
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f5f5f5;">구분</th>
            <th v-for="plan in plans" :key="plan.value" style="border: 1px solid #ddd; padding: 8px; background-color: #f5f5f5;">
              {{ plan.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">최대 학생 수</td>
            <td v-for="plan in plans" :key="plan.value" style="border: 1px solid #ddd; padding: 8px;">
              {{ plan.maxStudent === Infinity ? '제한없음' : plan.maxStudent + '명' }}
            </td>
          </tr>
          <tr v-for="period in periods" :key="period.value">
            <td style="border: 1px solid #ddd; padding: 8px;">{{ period.title }}</td>
            <td v-for="plan in plans" :key="plan.value" style="border: 1px solid #ddd; padding: 8px;">
              <template v-if="period.value === 'month1'">
                {{ plan[period.value].toLocaleString() }}원
              </template>
              <template v-else>
                <div style="position: relative;">
                  <span style="position: relative; z-index: 1; color: #595959; font-size: 0.9em;">{{ (plan.month1 * parseInt(period.value.replace('month',''))).toLocaleString() }}원</span>
                  <div style="position: absolute; top: 50%; left: 15%; width: 70%; height: 2px; background-color: #ff0000; transform: rotate(-5deg);"></div>
                </div>
                <div>{{ plan[period.value].toLocaleString() }}원</div>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-show="isExcelVisible">
      <Makefile />
    </div>
    <div v-show="!isExcelVisible">
      <div class="form-group">
        <label for="school-name" class="form-label">기관 및 학교명</label>
        <input type="text" id="school-name" placeholder="기관 및 학교명" class="form-input" />
      </div>
      <div class="form-group">
        <label for="name" class="form-label">구매자 성함</label>
        <input type="text" id="name" placeholder="구매자 성함" class="form-input" />
      </div>
      <div class="form-group">
        <label for="class-count" class="form-label">학급 수</label>
        <input type="text" id="class-count" placeholder="학급 수" class="form-input" />
      </div>
      <div class="form-group">
        <label for="plan" class="form-label">플랜</label>
        <select id="plan" class="form-input">
          <option value="">플랜을 선택하세요</option>
          <option v-for="plan in plans" :key="plan.value" :value="plan.value">
            {{ plan.title }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="period" class="form-label">기간</label>
        <select id="period" class="form-input">
          <option value="">기간을 선택하세요</option>
          <option v-for="period in periods" :key="period.value" :value="period.value">
            {{ period.title }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="quantity" class="form-label">수량</label>
        <input type="number" id="quantity" placeholder="수량" class="form-input" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isTableVisible: false,
      isExcelVisible: false,
      plans: [
        {title: '학급', value: 'class', maxStudent: 40, month1: 40000, month4: 150000, month6: 200000, month12: 390000},
        {title: '학년', value: 'grade', maxStudent: 200, month1: 180000, month4: 700000, month6: 1000000, month12: 1950000},
        {title: '소규모 학교', value: 'schoolSmall', maxStudent: 500, month1: 440000, month4: 1700000, month6: 2500000, month12: 4800000},
        {title: '중규모 학교', value: 'schoolMedium', maxStudent: 1000, month1: 850000, month4: 3300000, month6: 4800000, month12: 9500000},
        {title: '대규모 학교', value: 'schoolLarge', maxStudent: Infinity, month1: 1200000, month4: 4600000, month6: 6500000, month12: 11000000},
      ],
      periods: [
        {title: '1개월', value: 'month1'},
        {title: '4개월', value: 'month4'},
        {title: '6개월', value: 'month6'},
        {title: '12개월', value: 'month12'},
      ]
    }
  },
  methods: {
    toggleTable() {
      this.isTableVisible = !this.isTableVisible;
    }
  }
}
</script>

<style>
.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #2196F3;
  box-shadow: 0 0 5px rgba(33, 150, 243, 0.3);
}

.form-input::placeholder {
  color: #999;
}

</style>