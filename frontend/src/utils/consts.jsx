import React from 'react'
import store from '../store'

const states = store.getState()
console.log(states.auth.currentAccount.userName)

const consts = () => {
  return (
    <div>const</div>
  )
}

export default consts