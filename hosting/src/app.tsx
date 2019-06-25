import { Button, Icon, Layout, Menu } from 'antd'
import React from 'react'
import { Link, Route } from 'react-router-dom'
import Estimator from './pages/estimator'
import Login from './pages/login'

const { Header, Sider, Content } = Layout

interface State {
  collapsed: boolean
}

class App extends React.PureComponent<{}, State> {
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
              <span>nav 3</span>
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
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default App
