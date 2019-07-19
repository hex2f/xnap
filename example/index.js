import React, { Component } from 'react'
import { render } from 'react-dom'
import Xnap from '../lib'
import './style.css'

navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate

class App extends Component {
  constructor () {
    super()

    this.enableBackground = this.enableBackground.bind(this)
    this.disableBackground = this.disableBackground.bind(this)
  }

  enableBackground () {
    this.refs.app.style.backgroundColor = 'rgba(0,0,0,0.33)'
  }

  disableBackground () {
    this.refs.app.style.backgroundColor = 'rgba(0,0,0,0.0)'
  }

  componentDidMount () {
    this.card = new Xnap(this.refs.card, {
      onTrue: this.enableBackground,
      onFalse: this.disableBackground,
      states: ['0% + ', '100% - 36px + '],
      vibrate: 8
    })
    this.card.register()

    this.small = new Xnap(this.refs.small, {
      states: ['-100% + ', '100% + '],
      factor: 25,
      length: 50,
      direction: 3,
      state: true,
      vibrate: 4
    })
    this.small.register()
  }

  render () {
    return (
      <div className='app' ref='app'>
        <button onTouchStart={() => navigator.vibrate(4)} onTouchEnd={() => navigator.vibrate(2)}>Bzzz</button>
        <div className='card small' ref='small' />
        <div className='card' ref='card'>
          <div className='dragIndicator' />
        </div>
      </div>
    )
  }
}

const root = document.createElement('div')
render(<App />, root)
document.body.appendChild(root)
