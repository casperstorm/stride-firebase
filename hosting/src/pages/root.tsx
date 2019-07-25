import { Layout } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from '../state/store'
import Distances from './distances'
import Login from './login'

interface State {
  collapsed: boolean
}

class Root extends React.PureComponent<{}, State> {
  public state = {
    collapsed: false,
  }

  public toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  public render() {
    return (
      <Layout
        style={{
          height: '100vh',
          padding: '25px 25px 25px 25px',
          background: 'white',
        }}>
        <div>
          <Login />
        </div>
        <br />
        <div>
          <Distances />
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = (state: AppState) => ({})
const mapDispatchToProps = (dispatch: Dispatch) => ({})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root)
