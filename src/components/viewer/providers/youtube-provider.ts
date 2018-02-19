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

  protected createVideoPlayer (id: string, video: Video): IVideoPlayer {
    const ytPlayer = new YoutubePlayer(id, {
      height: 390,
      width: 640
      // videoId: video.id
      // playerVars: {
      //   enablejsapi: 1,
      //   origin: window.location.href // TODO: Check if this is correct and proper usage
      // }
    }) as YT.Player
    // FIXME: Try and remove error: Failed to execute 'postMessage' on 'DOMWindow': The target origin provided ('https://www.youtube.com') does not match the recipient window's origin ('http://localhost:8080').

    ytPlayer.cueVideoById(video.id, video.timestamp)
    const player = new YoutubeVideoPlayer(ytPlayer)

    if (video.muted) {
      player.mute()
    }

    // player.seek(video.timestamp)
    // player.pause()

    return player
  }
}

class YoutubeVideoPlayer implements IVideoPlayer {
  private ready = false

  constructor (private player: YT.Player) {
    player.addEventListener('onReady', _ => this.ready = true)
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

const instance = YoutubeProvider.getInstance(YoutubeProvider)
