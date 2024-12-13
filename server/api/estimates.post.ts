import { defineEventHandler, readBody } from 'h3'
import PDFDocument from 'pdfkit'
import path from 'path'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { date, number, unitPrice, itemNumber, amount } = body
    // console.log(body);
    // PDF 생성
    const doc = new PDFDocument({
      size: 'A4',
      margin: 50,
      info: {
        Title: `견적서_${body.number}`,
        Author: 'Seamspace',
      }
    })
    
    // 응답 헤더 설정
    event.node.res.setHeader('Content-Type', 'application/pdf')
    event.node.res.setHeader('Content-Disposition', `attachment; filename=estimate_${number}.pdf`)
    
    const fontPath = path.join(process.cwd(), 'public', 'fonts', 'Moneygraphy-Rounded.woff2')
    doc.font(fontPath)

    // 헤더 부분
    // 도장 이미지 (선택사항)
    const stampPath = path.join(process.cwd(), 'assets', 'seamspace.png')
    doc.image(stampPath, 500, 10,{ width: 80, align: 'right' })
    doc.fontSize(13)
    .text(`No. ${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}${String(new Date().getHours()).padStart(2, '0')}${String(new Date().getMinutes()).padStart(2, '0')}${String(new Date().getSeconds()).padStart(2, '0')}${String(new Date().getMilliseconds()).padStart(3, '0')}`)
    .moveDown(2)
    doc.fontSize(24)
       .text('견 적 서', { align: 'center' })
       .moveDown(2)
    // PDF 내용 작성
    doc.fontSize(13)

    const tableTop = 150
    const leftColX = 50
    const rightColX = 300
    doc.text(body.date, leftColX, tableTop)
       
    // 오른쪽 열
    doc.text('사업자등록번호: 440-87-02207', rightColX + 20, tableTop)
    .text('상호: 테바소프트(주)', rightColX + 20, tableTop + 20)
    .text('대표: 오정섭', rightColX + 20, tableTop + 40)
    .text('사업장주소: 대전시 유성구 대덕대로 512번길 20, 2층 200-17호', rightColX + 20, tableTop + 60)
    .text('업태: 정보통신업', rightColX + 20, tableTop + 100)
    .text('종목: 응용 소프트웨어 개발 및 공급업', rightColX + 20, tableTop + 120)
    .text('전화번호: 042-864-5566', rightColX + 20, tableTop + 140)
    .text('담당자 이메일: cs@tebahsoft.com', rightColX + 20, tableTop + 160)
    // 견적 내역 테이블
    const itemTableTop = 450
    doc.moveTo(50, itemTableTop)
       .lineTo(545, itemTableTop)
       .stroke()

    // 테이블 헤더
    doc.text('품목', 60, itemTableTop + 10)
       .text('수량', 200, itemTableTop + 10)
       .text('단가', 300, itemTableTop + 10)
       .text('금액', 400, itemTableTop + 10)
    // 테이블 내용
    doc.text(body.itemNumber, 60, itemTableTop + 40)
       .text('1', 200, itemTableTop + 40)
       .text(body.unitPrice.toLocaleString() + '원', 300, itemTableTop + 40)
       .text(body.amount.toLocaleString() + '원', 400, itemTableTop + 40)

    // 합계
    doc.fontSize(14)
       .text('합계: ' + body.amount.toLocaleString() + '원', 400, itemTableTop + 100)
       .moveDown()
       .text('금액: ' + convertToKorean(body.amount))

    
      //  .text(`날짜: ${date}`)
      //  .text(`견적서번호: ${number}`)
      //  .text(`단가: ${unitPrice}원`) 
      //  .text(`물품번호: ${itemNumber}`)
      //  .text(`견적금액: ${amount}원`)

       return new Promise((resolve, reject) => {
        const chunks: Buffer[] = []
        
        doc.on('data', chunk => chunks.push(chunk))
        doc.on('end', () => {
          const result = Buffer.concat(chunks)
          event.node.res.setHeader('Content-Type', 'application/pdf')
          event.node.res.setHeader('Content-Disposition', `attachment; filename=estimate_${body.number}.pdf`)
          resolve(result)
        })
        doc.on('error', reject)
        
        doc.end()
      })
  
    
  } catch (error) {
    console.error('견적서 생성 오류:', error)
    return { 
      statusCode: 500,
      body: { error: '견적서 생성에 실패했습니다.' }
    }
  }
})

// 숫자를 한글로 변환하는 함수
function convertToKorean(number: number): string {
  const units = ['', '만', '억', '조']
  const nums = ['영', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구']
  const digitUnits = ['', '십', '백', '천']
  let result = ''
  let i = 0
  
  while (number > 0) {
    const n = number % 10000
    if (n > 0) {
      let s = ''
      let temp = n
      let digit = 0
      while (temp > 0) {
        const num = temp % 10
        if (num > 0) {
          // 1은 '일'을 생략 (십일 -> 십)
          // 단, 만, 억, 조 앞의 1은 생략하지 않음
          if (num === 1 && digit > 0) {
            s = digitUnits[digit] + s
          } else {
            s = nums[num] + digitUnits[digit] + s
          }
        }
        digit++
        temp = Math.floor(temp / 10)
      }
      result = s + units[i] + ' ' + result
    }
    i++
    number = Math.floor(number / 10000)
  }
  
  return `금 ${result.trim()} 원정`
}