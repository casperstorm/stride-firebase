import { Button } from 'antd'

import firebase from 'firebase/app'
import 'firebase/auth'
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import LoginForm from '../components/login-form'
import { signIn } from '../state/auth/actions'
import { AppState } from '../state/store'

interface Props {
  user?: firebase.User
  signIn: (email: string, password: string) => void
}

class Login extends React.PureComponent<Props> {
  public logout = async () => {
    await firebase.auth().signOut()
  }

  public handleCancel = (e: any) => {
    this.setState({
      loginUserModalVisible: false,
    })
  }

  public handleLoginSubmit = (values: { email: string; password: string }) => {
    const { email, password } = values
    this.props.signIn(email, password)
  }

  public render() {
    const { user } = this.props
    if (user) {
      return (
        <div>
          <Button onClick={this.logout} size={'small'} type="danger" ghost>
            {`Logout ${user.email}`}
          </Button>
        </div>
      )
    } else {
      return <LoginForm onSubmit={this.handleLoginSubmit} />
    }
  }
}

const mapStateToProps = (state: AppState) => ({
  user: state.auth.user,
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  signIn: (email: string, password: string) =>
    dispatch(signIn(email, password)),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
