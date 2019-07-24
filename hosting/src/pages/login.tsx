import { Button } from 'antd'
import firebase from 'firebase/app'
import 'firebase/auth'
import React from 'react'

const clicked = async () => {
  await firebase.auth().signInWithEmailAndPassword('', '')
}

const login: React.FC = () => (
  <div style={{ margin: '16px 0px 16px 0px' }}>
    <Button onClick={clicked} type="primary">
      Login
    </Button>
  </div>
)

export default login
