import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import rootSaga from './sagas'

export type AppState = ReturnType<typeof reducers>

const sagas = createSagaMiddleware()

export default function configureStore() {
  const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(sagas))
  )
  sagas.run(rootSaga)
  return store
}
