import { combineReducers } from 'redux'
import auth from './auth/reducers'
import distance from './distance/reducers'
import options from './options/reducers'

export default combineReducers({ auth, distance, options })
