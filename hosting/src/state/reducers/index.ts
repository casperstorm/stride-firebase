import { combineReducers } from 'redux'
import auth from './auth'
import distances from './distances'
import records from './records'

export default combineReducers({ auth, records, distances })
