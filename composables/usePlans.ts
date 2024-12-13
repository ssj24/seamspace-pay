export const usePlans = () => {
  const plans = useState('plans', () => [
    {title: '학급', value: 'class', subTitle: '한 학급만을 위한 심플한', maxStudent: 40, month1: 40000, month4: 150000, month6: 200000, month12: 390000, color: '#FF7BAC', color2: '#FCE8F0'},
    {title: '학년', value: 'grade', subTitle: '여러 학급이 함께 사용하기 좋은', maxStudent: 200, month1: 180000, month4: 700000, month6: 1000000, month12: 1950000, color: '#AB79E0', color2: '#EFE8F9'},
    {title: '소규모 학교', value: 'schoolSmall', subTitle: '여러 학년 / 작은 학교를 위한', maxStudent: 500, month1: 440000, month4: 1700000, month6: 2500000, month12: 4800000, color: '#6A59D1', color2: '#E5E3FC'},
    {title: '중규모 학교', value: 'schoolMedium', subTitle: '평균적인 규모의 학교를 위한', maxStudent: 1000, month1: 850000, month4: 3300000, month6: 4800000, month12: 9500000, color: '#473E9E', color2: '#DFDEFC'},
    {title: '대규모 학교', value: 'schoolLarge', subTitle: '아주 큰 규모로, 제한없이!', maxStudent: Infinity, month1: 1200000, month4: 4600000, month6: 6500000, month12: 11000000, color: '#274591', color2: '#CBDAF7'},
  ])

  const periods = useState('periods', () => [
    {title: '1개월', value: 'month1'},
    {title: '4개월', value: 'month4'},
    {title: '6개월', value: 'month6'},
    {title: '12개월', value: 'month12'},
  ])

  return {
    plans,
    periods
  }
}