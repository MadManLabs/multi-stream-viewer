import { VideoProvider, Video } from '../video'
import { AbstractProvider } from './abstract-provider'
import { IVideoPlayer } from './providers'
let YoutubePlayer = require('youtube-player')

export class YoutubeProvider extends AbstractProvider {
  constructor () {
    // super('https://www.youtube.com/iframe_api', VideoProvider.youtube, false)
    super('', VideoProvider.youtube)

    const context = this

    // Done: YoutubePlayer does handle loading youtube api. Remove custom loading of api.
    // if (!window['onYouTubeIframeAPIReady']) {
    //   window['onYouTubeIframeAPIReady'] = function () {
    //     context.ready = true
    //   }
    // }
  }

  protected createVideoPlayer (id: string, video: Video, width: number, height: number): IVideoPlayer {
    const ytPlayer = new YoutubePlayer(id, {
      height: height,
      width: width
      // videoId: video.id
      // playerVars: {
      //   enablejsapi: 1,
      //   origin: window.location.href // TODO: Check if this is correct and proper usage
      // }
    }) as YT.Player
    // FIXME: Try and remove error: Failed to execute 'postMessage' on 'DOMWindow': The target origin provided ('https://www.youtube.com') does not match the recipient window's origin ('http://localhost:8080').

    ytPlayer.cueVideoById(video.id, video.timestamp)
    const player = new YoutubeVideoPlayer(ytPlayer, video)

    if (video.muted) {
      player.mute()
    } else {
      player.unmute()
    }

    player.seek(video.timestamp)
    player.pause()

    // ytPlayer.addEventListener('onReady', () => {
    //   this.bubbleIframeMouseMove(ytPlayer.getIframe())
    // })

    return player
  }
}

class YoutubeVideoPlayer implements IVideoPlayer {
  private initializing = true
  private ready = false

  constructor (private player: YT.Player, private video: Video) {
    player.addEventListener('onReady', _ => {
      this.ready = true
    })

    // player.addEventListener('onStateChange', async () => {
    //   if (!this.initializing || player.getPlayerState() !== YT.PlayerState.PLAYING) return

    //   // FIXME: This is an ugly hack to get youtube videos synced up and ready to play

    //   console.debug('youtube playing')
    //   player.mute()
    //   player.playVideo()

    //   await sleep(1000)

    //   // player.seek(video.timestamp)

    //   // await sleep(1000)

    //   player.pauseVideo()
    //   player.seekTo(video.timestamp, true)
    //   if (!video.muted) player.unMute()
    //   this.initializing = false
    // })
  }

  play () {
    this.player.playVideo()
  }
  pause () {
    this.player.pauseVideo()
  }
  seek (time: number) {
    this.player.seekTo(time, true)
  }
  mute () {
    this.player.mute()
  }
  unmute () {
    this.player.unMute()
  }
}

function sleep (ms = 0) { // TODO: clean up and refactor sleep to util
  return new Promise(r => setTimeout(r, ms))
}

const instance = YoutubeProvider.getInstance(YoutubeProvider)
