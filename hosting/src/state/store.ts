import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import rootSaga from './sagas'

export type AppState = ReturnType<typeof reducers>

const sagas = createSagaMiddleware()

export default function configureStore() {
  const store = createStore(reducers, compose(applyMiddleware(sagas)))
  sagas.run(rootSaga)
  return store
}
