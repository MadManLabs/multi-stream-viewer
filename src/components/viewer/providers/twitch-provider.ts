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
    console.debug('creating custom twitch player')
    const player = new TwitchPlayer(twPlayer)
    player.seek(video.timestamp)
    // FIXME: This seems to have no effect. Even if the player is ready it wont seek now.
    // However it will seek when calling from a button in the video view
    player.pause()
    if (video.muted) {
      player.mute()
    }
    return player
  }
}

class TwitchPlayer implements IVideoPlayer {
  private ready = false

  constructor (private player: Twitch.Player) {
    player.addEventListener('ready', () => {
      this.ready = true
    })

    // player.addEventListener('play', () => console.debug('play twitch'))
  }

  play () {
    this.readyPlayer().then(player => player.play())
  }
  pause () {
    this.readyPlayer().then(player => player.pause())
  }
  seek (time: number) {
    this.readyPlayer().then(player => {
      const paused = player.isPaused()
      console.debug(`seeking to ${time}`)
      player.seek(time)
      if (paused) {
        player.pause()
      }
    })
  }
  mute () {
    this.readyPlayer().then(player => player.setMuted(true))
  }
  unmute () {
    this.readyPlayer().then(player => player.setMuted(false))
  }

  private async readyPlayer (): Promise<Twitch.Player> {
    while (!this.ready) {
      await sleep(100)
    }
    console.debug('player is ready')
    return this.player
  }
}

function sleep (ms = 0) { // TODO: clean up and refactor sleep to util
  return new Promise(r => setTimeout(r, ms))
}

const instance = TwitchProvider.getInstance(TwitchProvider)
