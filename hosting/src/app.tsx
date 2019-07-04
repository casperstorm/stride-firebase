import { Icon, Layout, Menu } from 'antd'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import React from 'react'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import { Dispatch } from 'redux'
import Estimator from './pages/estimator'
import Login from './pages/login'
import Records from './pages/records'
import * as ACTIONS from './state/actions'
import { AppState } from './state/store'

const { Header, Sider, Content } = Layout

interface State {
  collapsed: boolean
}

interface Props {
  setUser: (user: firebase.User) => void
  clearUser: () => void
}

class App extends React.PureComponent<Props, State> {
  public state = {
    collapsed: false,
  }

  public componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.setUser(user)
      } else {
        this.props.clearUser()
      }
    })
  }

  public toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  public render() {
    return (
      <Layout style={{ height: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>login</span>
              <Link to="/login" />
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>estimator</span>
              <Link to="/estimator" />
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>records</span>
              <Link to="/records" />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}>
            <Route path="/login" component={Login} />
            <Route path="/estimator" component={Estimator} />
            <Route path="/records" component={Records} />
          </Content>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = (state: AppState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setUser: (user: firebase.User) => dispatch(ACTIONS.setUser(user)),
  clearUser: () => dispatch(ACTIONS.clearUser()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
