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
// export class TwitchProvider implements IVideoProvider {
//   private static _instance: TwitchProvider
//   private ready: boolean

//   private constructor () {
//     console.log('Twitch provider constructor')
//     this.ready = false
//     VideoProviders.set(VideoProvider.twitch, this)
//   }

//   static get Instance (): TwitchProvider {
//     return this._instance || (this._instance = new this())
//   }

//   setup () {
//     console.log('Twitch provider setup')

//     const twitchReady = function () {
//       this.ready = true
//       console.log(TwitchProvider.Instance.ready)
//     }

//     importScript('https://embed.twitch.tv/embed/v1.js', twitchReady)
//   }

//   async requestVideoFromProvider (id: string, video: Video) {
//     // await sleep(1000)
//     while (!this.ready) {
//       await sleep(200)
//     }
//     this.createVideoPlayer(id, video)
//   }

//   private createVideoPlayer (id: string, video: Video) {
//     console.log('twitch create video')
//     const player = new Twitch.Embed(id, {
//       height: 400,
//       width: 640,
//       video: video.id
//     })
//   }
// }

// function sleep (ms = 0) {
//   return new Promise(r => setTimeout(r, ms))
// }

const instance = TwitchProvider.getInstance(TwitchProvider)
