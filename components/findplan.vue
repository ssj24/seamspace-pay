<template>
  <div>
    <div style="display: flex; align-items: center;">
      <div>
        <p>사용하실 학급 수를 알려주세요.</p>
        <input type="number" v-model="classCount" class="findplan-input" />
      </div>
      <div>
        <p>총 학생 수를 알려주세요.</p>
        <input type="number" v-model="studentCount" class="findplan-input" />
      </div>
      <div>
        <p>사용하실 기간을 알려주세요.</p>
        <input type="number" v-model="period" class="findplan-input" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const classCount = ref(0)
    const studentCount = ref(0)
    const period = ref(0)
    return { classCount, studentCount, period }
  }
}
</script>

<style>
.findplan-input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  width: 120px;
  outline: none;
  transition: border-color 0.2s;
}

.findplan-input:focus {
  border-color: #AB79E0;
  box-shadow: 0 0 5px rgba(171, 121, 224, 0.3);
}

.findplan-input::-webkit-outer-spin-button,
.findplan-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.findplan-input[type=number] {
  -moz-appearance: textfield;
}

</style>