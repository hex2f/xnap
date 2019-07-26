import React, { Component } from 'react'
import { render } from 'react-dom'
import Highlight from 'react-highlight'
import Xnap from '../lib'
import './atom-one-dark.css'
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
      states: ['0% + ', '90% - 30px + '],
      state: false,
      scaleStates: [1, 0.8],
      vibrate: 8,
      exact: true
    })
    this.card.register()

    this.small = new Xnap(this.refs.small, {
      states: ['-100% + ', '100% + '],
      factor: 25,
      length: 50,
      direction: 0,
      vibrate: 4
    })
    this.small.register()

    this.codeCard = new Xnap(this.refs.code, {
      states: ['0% + ', '150px + '],
      direction: 0,
      vibrate: 4
    })
    this.codeCard.register()
  }

  render () {
    return (
      <div className='app' ref='app'>
        <div className='hero'>
          <div>
            <h1><a href='https://github.com/mobooru/xnap'>Xnap</a></h1>
            <p>Components that snap.</p>
          </div>
          <div ref='code'>
            <Highlight className='javascript'>
              {
                `// This card
let xnapCard = new Xnap(component, {
  states: ['0% + ', '150px + '],
  direction: 0,
  vibrate: 4
})
xnapCard.register()`
              }
            </Highlight>
          </div>
          <i className='viewDocsText'><a href='https://github.com/mobooru/xnap'>/* View documentation */</a></i>
        </div>
        <i className='dragMeText'>/* psst. drag me */</i>
        <div className='card big' ref='card'>
          <div className='dragIndicator' />
          <p>🎶got me walkin' side to side🎶</p>
          <div className='card small' ref='small' />
        </div>
      </div>
    )
  }
}

const root = document.createElement('div')
render(<App />, root)
document.body.appendChild(root)
