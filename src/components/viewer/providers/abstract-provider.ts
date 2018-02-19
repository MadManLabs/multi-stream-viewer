import { Singleton } from '../../../util/singleton'
import { IVideoProvider, VideoProviders, IVideoPlayer } from './video-provider'
import { VideoProvider, Video } from '../video'
import { importScript } from '../util/script-loader'

export abstract class AbstractProvider extends Singleton<AbstractProvider> implements IVideoProvider {
  protected ready = false

  private loadingScript = false

  protected constructor (protected apiScript: string, providerId: VideoProvider, private readyWhenScriptLoaded: boolean = true) {
    super()
    VideoProviders.set(providerId, this)
  }

  async requestVideoFromProvider (id: string, video: Video): Promise<IVideoPlayer> {
    if (!this.ready && !this.loadingScript) {
      this.loadingScript = true
      if (this.apiScript !== '') { // Handle importing script
        importScript(this.apiScript, () => {
          if (this.readyWhenScriptLoaded) {
            this.ready = true
          }
        })
      } else { // Provider handles importing script
        if (this.readyWhenScriptLoaded) {
          this.ready = true
        }
      }
    }

    while (!this.ready) {
      await sleep(200)
    }

    return this.createVideoPlayer(id, video)
  }

  protected abstract createVideoPlayer (id: string, video: Video): IVideoPlayer
}

function sleep (ms = 0) {
  return new Promise(r => setTimeout(r, ms))
}
