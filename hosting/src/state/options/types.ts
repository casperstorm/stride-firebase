export interface OptionsState {
  showVDOT: boolean
  showTags: boolean
}

export const SET_OPTIONS = 'SET_OPTIONS'

export interface SetOptionsAction {
  type: typeof SET_OPTIONS
  payload: OptionsState
}
export type OptionsActionTypes = SetOptionsAction
