<template>
  <div class="estimate-form">
    <form @submit.prevent="generateEstimate">
      <!-- 견적서 입력 폼 -->
      <div class="form-group">
        <label>날짜</label>
        <input type="date" v-model="estimateData.date" required>
      </div>
      
      <div class="form-group">
        <label>견적서번호</label>
        <input type="text" v-model="estimateData.number" required>
      </div>
      
      <div class="form-group">
        <label>플랜 선택</label>
        <select v-model="selectedPlan" @change="updateUnitPrice">
          <option v-for="plan in plans" :key="plan.id" :value="plan">
            {{ plan.name }}
          </option>
        </select>
      </div>
      
      <div class="form-group">
        <label>기간 선택</label>
        <select v-model="selectedPeriod" @change="updateUnitPrice">
          <option v-for="period in periods" :key="period.id" :value="period">
            {{ period.name }}
          </option>
        </select>
      </div>
      
      <div class="form-group">
        <label>단가</label>
        <input type="number" v-model="estimateData.unitPrice" readonly>
      </div>
      
      <div class="form-group">
        <label>물품번호</label>
        <input type="text" v-model="estimateData.itemNumber" required>
      </div>
      
      <div class="form-group">
        <label>견적금액</label>
        <input type="number" v-model="estimateData.amount" required>
        <div class="amount-in-korean">{{ amountInKorean }}</div>
      </div>
      
      <button type="submit">견적서 생성</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      estimateData: {
        date: new Date().toISOString().substr(0, 10),
        number: 1,
        unitPrice: 190000,
        itemNumber: 'a1111',
        amount: 190000
      },
      selectedPlan: null,
      selectedPeriod: null,
      plans: [
        { id: 1, name: '기본 플랜', basePrice: 100000 },
        { id: 2, name: '프리미엄 플랜', basePrice: 200000 }
      ],
      periods: [
        { id: 1, name: '1개월', multiplier: 1 },
        { id: 2, name: '6개월', multiplier: 0.95 },
        { id: 3, name: '12개월', multiplier: 0.9 }
      ]
    }
  },
  
  computed: {
    amountInKorean() {
      return this.convertToKorean(this.estimateData.amount)
    }
  },
  
  methods: {
    updateUnitPrice() {
      if (this.selectedPlan && this.selectedPeriod) {
        const basePrice = this.selectedPlan.basePrice
        const multiplier = this.selectedPeriod.multiplier
        this.estimateData.unitPrice = Math.floor(basePrice * multiplier)
      }
    },
    
    convertToKorean(number) {
      // 숫자를 한글로 변환하는 로직
      const units = ['', '만', '억', '조']
      const nums = ['영', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구']
      let result = ''
      let i = 0
      
      while (number > 0) {
        const n = number % 10000
        if (n > 0) {
          let s = ''
          let temp = n
          while (temp > 0) {
            s = nums[temp % 10] + s
            temp = Math.floor(temp / 10)
          }
          result = s + units[i] + ' ' + result
        }
        i++
        number = Math.floor(number / 10000)
      }
      
      return `금 ${result.trim()} 원`
    },
    
    async generateEstimate() {
      try {
    // $axios.post 대신 $fetch 사용
    const response = await $fetch('/api/estimates', {
      method: 'POST',
      body: this.estimateData,
      responseType: 'blob'
    })
    // 응답 헤더 확인
    if (!response || response.length === 0) {
      throw new Error('견적서 생성에 실패했습니다. 응답이 비어있습니다.')
    }
    // Blob 처리
    const url = window.URL.createObjectURL(response)
    const link = document.createElement('a')
    link.href = url
    link.download = `견적서_${this.estimateData.number}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('견적서 생성 실패:', error)
    alert('견적서 생성에 실패했습니다.')
  }
    }
  }
}
</script>

<style scoped>
.estimate-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.amount-in-korean {
  margin-top: 5px;
  color: #666;
  font-size: 0.9em;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>