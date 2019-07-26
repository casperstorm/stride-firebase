import { OptionsState, SET_OPTIONS } from './types'

export const setOptions = (options: OptionsState) => ({
  type: SET_OPTIONS,
  payload: options,
})
