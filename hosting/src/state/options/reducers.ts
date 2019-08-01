import { OptionsActionTypes, OptionsState, SET_OPTIONS } from './types'

const initialState: OptionsState = {
  showVDOT: false,
  showTags: true,
}

const auth = (
  state: OptionsState = initialState,
  action: OptionsActionTypes
): OptionsState => {
  switch (action.type) {
    case SET_OPTIONS: {
      return action.payload
    }
    default:
      return state
  }
}

export default auth
