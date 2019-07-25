import { combineReducers } from 'redux'
import auth from './auth/reducers'
import distance from './distance/reducers'

export default combineReducers({ auth, distance })
