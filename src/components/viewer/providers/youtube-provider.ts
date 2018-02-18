import { VideoProvider, Video } from '../video'
import { AbstractProvider } from './abstract-provider'

export class YoutubeProvider extends AbstractProvider {
  constructor () {
    super('https://www.youtube.com/iframe_api', VideoProvider.youtube, false)

    const context = this

    if (!window['onYouTubeIframeAPIReady']) {
      window['onYouTubeIframeAPIReady'] = function () {
        context.ready = true
      }
    }
  }

  protected createVideoPlayer (id: string, video: Video) {
    const player = new YT.Player(id, {
      height: 390,
      width: 640,
      videoId: video.id,
      playerVars: {
        enablejsapi: 1,
        origin: window.location.href // TODO: Check if this is correct and proper usage
      }
     // events: {
     //   'onReady': onPlayerReady,
     //   'onStateChange': onPlayerStateChange
     // }
    })
   // FIXME: Try and remove error: Failed to execute 'postMessage' on 'DOMWindow': The target origin provided ('https://www.youtube.com') does not match the recipient window's origin ('http://localhost:8080').
  }
}

const instance = YoutubeProvider.getInstance(YoutubeProvider)
