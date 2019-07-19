import React, { Component } from 'react'
import { render } from 'react-dom'
import Xnap from '../lib'
import './style.css'

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
      states: ['0% + ', '100% - 36px + ']
    })
    this.card.register()

    this.small = new Xnap(this.refs.small, {
      states: ['-100% + ', '100% + '],
      factor: 25,
      length: 50,
      direction: 0,
      state: true
    })
    this.small.register()
  }

  render () {
    return (
      <div className='app' ref='app'>
        <div className='card small' ref='small' />
        <div className='card' ref='card'>
          <div className='dragIndicator' />
        </div>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
