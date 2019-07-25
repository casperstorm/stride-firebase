import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Distance } from './entities/distance'
import Root from './pages/root'
import { setUser, signOut } from './state/auth/actions'
import { purgeDistances, setDistances } from './state/distance/actions'
import { AppState } from './state/store'

interface Props {
  setUser: (user: firebase.User) => void
  setDistances: (distances: Array<Distance>) => void
  signOut: () => void
  purgeDistances: () => void
}

class App extends React.PureComponent<Props, {}> {
  public distancesObserver?: () => void

  public componentDidMount = async () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.setUser(user)
        const documentRef = firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
        this.distancesObserver = documentRef
          .collection('distances')
          .onSnapshot(this.onDistancesUpdate)
      } else {
        this.props.signOut()
        this.props.purgeDistances()
      }
    })
  }

  public componentWillUnmount() {
    if (this.distancesObserver) {
      this.distancesObserver()
    }
  }

  public render() {
    return <Root />
  }

  private onDistancesUpdate = (snapshot: firebase.firestore.QuerySnapshot) => {
    const distances: Array<Distance> = []
    snapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
      const id = doc.id
      const { meters, record } = doc.data()
      const distance: Distance = new Distance(id, meters, record)

      distances.push(distance)
    })

    this.props.setDistances(distances)
  }
}

const mapStateToProps = (state: AppState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setUser: (user: firebase.User) => dispatch(setUser(user)),
  signOut: () => dispatch(signOut()),
  purgeDistances: () => dispatch(purgeDistances()),
  setDistances: (distances: Array<Distance>) =>
    dispatch(setDistances(distances)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
