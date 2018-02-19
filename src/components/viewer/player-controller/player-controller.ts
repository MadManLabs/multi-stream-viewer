import { Component, Vue, Prop } from 'vue-property-decorator'
import { PlayerBus } from '../util/player-bus'

@Component({
  template: require('./player-controller.html')
})
export class PlayerControllerComponent extends Vue {
  firstPlay = true

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
