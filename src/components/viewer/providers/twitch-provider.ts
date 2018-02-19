import { VideoProvider, Video } from '../video'
import { AbstractProvider } from './abstract-provider'
import { IVideoPlayer } from './video-provider'

export class TwitchProvider extends AbstractProvider {
  constructor () {
    super('http://player.twitch.tv/js/embed/v1.js', VideoProvider.twitch)
  }

  protected createVideoPlayer (id: string, video: Video): IVideoPlayer {
    const twPlayer = new Twitch.Player(id, {
      height: 400,
      width: 640,
      video: video.id
    })
    const player = new TwitchPlayer(twPlayer)
    player.pause()
    if (video.muted) {
      player.mute()
    }
    player.seek(video.timestamp)
    return player
  }
}

class TwitchPlayer implements IVideoPlayer {
  constructor (private player: Twitch.Player) {}

  play () {
    this.player.play()
  }
  pause () {
    this.player.pause()
  }
  seek (time: number) {
    const paused = this.player.isPaused()
    this.player.seek(time)
    if (paused) {
      this.player.pause()
    }
  }
  mute () {
    this.player.setMuted(true)
  }
  unmute () {
    this.player.setMuted(false)
  }
}

const instance = TwitchProvider.getInstance(TwitchProvider)
