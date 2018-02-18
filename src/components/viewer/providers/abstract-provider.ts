import { Singleton } from '../../../util/singleton'
import { IVideoProvider, VideoProviders } from './video-provider'
import { VideoProvider, Video } from '../video'
import { importScript } from '../util/script-loader'

export abstract class AbstractProvider extends Singleton<AbstractProvider> implements IVideoProvider {
  protected ready = false

  private loadingScript = false

  protected constructor (protected apiScript: string, providerId: VideoProvider, private readyWhenScriptLoaded: boolean = true) {
    super()
    VideoProviders.set(providerId, this)
  }

  async requestVideoFromProvider (id: string, video: Video) {
    if (!this.ready && !this.loadingScript) {
      this.loadingScript = true
      importScript(this.apiScript, () => {
        if (this.readyWhenScriptLoaded) {
          this.ready = true
        }
      })
    }

    while (!this.ready) {
      await sleep(200)
    }

    this.createVideoPlayer(id, video)
  }

  protected abstract createVideoPlayer (id: string, video: Video)
}

function sleep (ms = 0) {
  return new Promise(r => setTimeout(r, ms))
}
