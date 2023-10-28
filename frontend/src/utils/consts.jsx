import React from 'react'
import store from '../store'

const states = store.getState()
console.log(states.auth.currentAccount.userName)

export  const consts = () => {
  return (
    <div>const</div>
  )
}

export const topics = [
  {
    local: 'Dünyada Trend',
    topic: {
      title: 'İsrail - Filistin Savaşı Çıkacak!',
      value: 'testerkahin1'
    },
    participantCount: 981,
  },
  {
    local: 'Türkiyede Trend',
    topic: {
      title: 'Kemal Kılıçtaroğlu Belediye Seçimlerini Kazanacak!',
      value: 'testerkahin2'
    },
    participantCount: 100000,
  },
  {
    local: 'Dünyada Trend',
    topic: {
      title: 'Yeni bir virüs varyantı geliyor!',
      value: 'testerkahin5'
    },
    participantCount: 5000,
  },
  {
    local: 'Dünyada Trend',
    topic: {
      title: 'Bitcoin 2024 te 1 Milyon Dolar Olacak!',
      value: 'testerkahin1'
    },
    participantCount: 301340,
  },
  {
    local: 'Dünyada Trend',
    topic: {
      title: 'Bitcoin 2024 te 1 Milyon Dolar Olacak!',
      value: 'testerkahin1'
    },
    participantCount: 301340,
  },

]