import { VideoProvider, Video } from '../video'
import { AbstractProvider } from './abstract-provider'

export class TwitchProvider extends AbstractProvider {
  constructor () {
    super('https://embed.twitch.tv/embed/v1.js', VideoProvider.twitch)
  }

  protected createVideoPlayer //   async requestVideoFromProvider (id: string, video: Video) {
    (id: string, video: Video) {
    const player = new Twitch.Embed(id, {
      height: 400,
      width: 640,
      video: video.id
    })
  }
}

const instance = TwitchProvider.getInstance(TwitchProvider)
