import { VideoProvider, Video } from '../../components/routes/viewer/video'
import { AbstractProvider } from './abstract-provider'
import { IVideoPlayer } from './video-provider'

export class TwitchProvider extends AbstractProvider {
  constructor () {
    super('https://player.twitch.tv/js/embed/v1.js', VideoProvider.twitch)
  }

  acceptsHostName (url: URL): boolean {
    return url.hostname === 'www.twitch.tv'
  }

  getVideoIdFromUrl (url: URL): string {
    const pathElements = url.pathname.split('/')
    // console.debug(pathElements)
    if (pathElements.length === 3 && pathElements[1] === 'videos') {
      return pathElements[2]
    }

    return ''
  }

  protected createVideoPlayer (id: string, video: Video, width: number, height: number): IVideoPlayer {
    const twPlayer = new Twitch.Player(id, {
      height: height,
      width: width,
      video: video.id
    })

    const player = new TwitchPlayer(twPlayer, video)
    // player.seek(video.timestamp)
    // FIXME: This seems to have no effect. Even if the player is ready it wont seek now.
    // However it will seek when calling from a button in the video view
    // player.pause()
    // if (video.muted) {
    //   player.mute()
    // }
    return player
  }
}

class TwitchPlayer implements IVideoPlayer {
  private initializing = true
  private ready = false

  constructor (private player: Twitch.Player, private video: Video) {
    player.addEventListener('ready', () => {
      this.ready = true
      player.play()
    })

    player.addEventListener('play', async () => {
      if (!this.initializing) return

      // FIXME: This is an ugly hack to get twitch videos synced up and ready to play - only works sometimes
      // TODO: Invistigate. Check how and when these events are really called and when various function calls will work

      // console.debug('twitch playing')
      player.setMuted(true)
      player.play()

      await sleep(1000)

      player.seek(video.timestamp)

      await sleep(1000)

      player.pause()
      player.seek(video.timestamp)
      player.setMuted(video.muted)
      this.initializing = false
    })
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
  getTime (): Promise<number> {
    if (this.ready) return Promise.resolve(this.player.getCurrentTime())

    return Promise.resolve(0)
  }
  getLength (): Promise<number> {
    if (this.ready) return Promise.resolve(this.player.getDuration())

    return Promise.resolve(0)
  }

  private async readyPlayer (): Promise<Twitch.Player> {
    while (!this.ready) {
      await sleep(100)
    }
    return this.player
  }
}

function sleep (ms = 0) { // TODO: clean up and refactor sleep to util
  return new Promise(r => setTimeout(r, ms))
}

const instance = TwitchProvider.getInstance(TwitchProvider)
