import { describe, it, expect } from 'vitest'
import { formatWon, maskAccountNo, formatWonMasked } from './format'

describe('format 유틸', () => {
  it('formatWon: 숫자를 "1,523,000원" 형태로 바꾼다', () => {
    // Given: 1523000 이라는 숫자 데이터 (입력값)
    // When: formatWon 함수에 값을 넣고 실행
    // Then: 반환값이 천 단위 콤마가 포함된 '1,523,000원' 문자열인지 검증
    expect(formatWon(1523000)).toBe('1,523,000원')
  })
})