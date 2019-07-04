import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Record } from './entities/record'
import Root from './pages/root'
import * as ACTIONS from './state/actions'
import { AppState } from './state/store'

interface Props {
  setUser: (user: firebase.User) => void
  setRecords: (records: Array<Record>) => void
  clearUser: () => void
  user: firebase.User
}

class App extends React.PureComponent<Props, {}> {
  public documentRef?: firebase.firestore.DocumentReference
  public recordsObserver?: () => void

  public componentDidMount = async () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.setUser(user)
        this.documentRef = firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
        this.recordsObserver = this.documentRef
          .collection('records')
          .onSnapshot(this.onRecordsUpdate)
      } else {
        this.props.clearUser()
      }
    })
  }

  public componentWillUnmount() {
    if (this.recordsObserver) {
      this.recordsObserver()
    }
  }

  public render() {
    return <Root />
  }

  private onRecordsUpdate = (snapshot: firebase.firestore.QuerySnapshot) => {
    const records: Array<Record> = []
    snapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
      const rawRecord = doc.data() as Record
      const record: Record = new Record({ ...rawRecord, key: doc.id })
      records.push(record)
    })

    this.props.setRecords(records)
  }
}

const mapStateToProps = (state: AppState) => ({
  user: state.auth.user,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setUser: (user: firebase.User) => dispatch(ACTIONS.setUser(user)),
  clearUser: () => dispatch(ACTIONS.clearUser()),
  setRecords: (records: Array<Record>) => dispatch(ACTIONS.setRecords(records)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
