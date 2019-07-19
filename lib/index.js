export default class Xnap {
  constructor (component, options = {}) {
    this.x = 0
    this.xDown = 0
    this.y = 0
    this.yDown = 0
    this.state = options.state || false
    this.states = options.states || ['0% + ', '100% + ']
    this.anchor = this.states[this.state ? 0 : 1]
    this.factor = options.factor || 5
    this.length = options.length || 100
    this.onTrue = options.onTrue || (() => {})
    this.onFalse = options.onFalse || (() => {})
    this.direction = options.direction === undefined ? 1 : options.direction
    this.vibrate = options.vibrate || false
    this.component = component
    this.moving = false
    this.nexttick = []

    this.register = this.register.bind(this)
    this.down = this.down.bind(this)
    this.up = this.up.bind(this)
    this.move = this.move.bind(this)
    this.frame = this.frame.bind(this)
  }

  frame () {
    this.component.style.transform = this.direction === 1
      ? `translate(0px, calc(${this.anchor}${this.y}px))`
      : `translate(calc(${this.anchor}${this.y}px), 0px)`
    this.nexttick = this.nexttick.filter(action => typeof (action) === 'function').map(action => action())
    if (this.moving || this.nexttick.length > 0) window.requestAnimationFrame(this.frame)
  }

  register () {
    this.component.addEventListener('mousedown', this.down)
    this.component.addEventListener('touchstart', this.down)

    window.addEventListener('mouseup', this.up)
    window.addEventListener('touchend', this.up)

    this.frame()
  }

  down (e) {
    window.addEventListener('mousemove', this.move)
    window.addEventListener('touchmove', this.move)
    this.xDown = (e.touches ? e.touches[0] : e).clientX
    this.yDown = (e.touches ? e.touches[0] : e).clientY
    this.component.style.transition = 'none'
    this.moving = true
    window.requestAnimationFrame(this.frame)
  }

  up () {
    window.removeEventListener('mousemove', this.move, false)
    window.removeEventListener('touchmove', this.move, false)
    this.component.style.transition = 'transform 0.3s'
    this.nexttick.push(() => { this.y = 0 })
  }

  move (e) {
    let y = (e.touches ? e.touches[0] : e)[this.direction === 1 ? 'clientY' : 'clientX'] - this[this.direction === 1 ? 'yDown' : 'xDown']
    let direction = y > 0 ? 1 : -1
    y = Math.abs(y)
    this.y = (Math.log(y / this.factor + this.factor) - Math.log(this.factor)) * (this.factor * 10) * direction

    if (Math.abs(this.y) > this.length) {
      this.state = this.y < 0
      this.anchor = this.state ? this.states[0] : this.states[1]
      this.up()
      this.vibrate && window.navigator.vibrate && window.navigator.vibrate(this.vibrate)
      this.state ? this.onTrue() : this.onFalse()
    }
  }
}
