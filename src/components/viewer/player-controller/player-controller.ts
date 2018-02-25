import { Component, Vue, Prop } from 'vue-property-decorator'
import { PlayerBus } from '../util/player-bus'
import bContainer from 'bootstrap-vue/es/components/layout/container'
// let AlertIcon = require('vue-ionicons/dist/ios-alert')
// import * as AlertIcon from 'vue-ionicons/dist/ios-alert'

@Component({
  template: require('./player-controller.html'),
  // components: {
  //   'alert-icon': AlertIcon
  // }
  components: {
    'b-container': bContainer
  }
})
export class PlayerControllerComponent extends Vue {
  firstPlay = true
  closed = false

  controllerStyle = {
    position: 'absolute',
    'z-index': '9999',
    width: '600px',
    // height: '20px',
    left: '50%',
    bottom: '0%',
    opacity: '1',
    transform: 'translateX(-50%)',
    transition: 'left 0.6s, transform 0.6s, width 0.6s, opacity 0.6s, height 0.6s'
  }

  open () {
    setTimeout(() => {
      this.closed = false
    }, 600)

    this.controllerStyle.width = '600px'
    this.controllerStyle.left = '50%'
    this.controllerStyle.opacity = '1'
    this.controllerStyle.transform = 'translateX(-50%)'
  }

  close () {
    this.closed = true
    this.controllerStyle.width = 'auto'
    this.controllerStyle.left = '100%'
    this.controllerStyle.opacity = '0.5'
    this.controllerStyle.transform = 'translateX(-100%)'
  }

  play () {
    if (this.firstPlay) {
      this.firstPlay = false
      this.seek()
    }
    PlayerBus.$emit('play')
    console.debug('play')
  }

  pause () {
    PlayerBus.$emit('pause')
    console.debug('pause')
  }

  seek () {
    PlayerBus.$emit('seek')
    console.debug('seek')
  }
}
