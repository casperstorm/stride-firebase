import { Button } from 'antd'
import firebase from 'firebase/app'
import 'firebase/auth'
import React from 'react'

const clicked = async () => {
  await firebase.auth().signInWithEmailAndPassword('', '')
}

const login: React.FC = () => (
  <Button onClick={clicked} type="primary">
    Button
  </Button>
)

export default login
