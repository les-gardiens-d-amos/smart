import { describe, expect, test } from '@jest/globals'
import pickImage from '../../src/screens/CameraScreen'
// import dispatch from 'dispatch'

// jest.mock('dispatch', () => jest.fn())


describe('pickImage', () => {
  it('calls dispatch function if result.canceled = false', () => {
    const result = { cancelled: false }
    const disp = jest.fn()
    pickImage(disp);
    expect(dispatch.mock.calls.length).toBe(0);
  })
})
