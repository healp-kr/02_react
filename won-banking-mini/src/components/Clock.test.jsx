import { beforeEach, describe, expect, it, vi } from 'vitest'

const { useStateMock, useEffectMock } = vi.hoisted(() => ({
  useStateMock: vi.fn(),
  useEffectMock: vi.fn(),
}))

vi.mock('react', () => ({
  useState: useStateMock,
  useEffect: useEffectMock,
}))

import Clock from './Clock'

describe('Clock', () => {
  beforeEach(() => {
    useStateMock.mockReset()
    useEffectMock.mockReset()
  })

  it('현재 시각을 muted span으로 표시한다', () => {
    const now = new Date('2026-09-10T12:34:56')
    useStateMock.mockReturnValue([now, vi.fn()])

    const element = Clock()

    expect(element.type).toBe('span')
    expect(element.props.className).toBe('muted')
    expect(element.props.children).toBe(now.toLocaleTimeString('ko-KR'))
  })

  it('1초 간격으로 시각을 갱신하고 언마운트 시 interval을 정리한다', () => {
    const setNow = vi.fn()
    const intervalId = 42
    let tick
    let cleanup

    useStateMock.mockReturnValue([new Date('2026-09-10T12:34:56'), setNow])
    useEffectMock.mockImplementation((effect) => {
      cleanup = effect()
    })
    vi.spyOn(globalThis, 'setInterval').mockImplementation((callback, delay) => {
      tick = callback
      expect(delay).toBe(1000)
      return intervalId
    })
    vi.spyOn(globalThis, 'clearInterval').mockImplementation(() => {})

    Clock()
    tick()
    cleanup()

    expect(setNow).toHaveBeenCalledOnce()
    expect(setNow.mock.calls[0][0]).toBeInstanceOf(Date)
    expect(clearInterval).toHaveBeenCalledWith(intervalId)
  })
})