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

  async requestVideoFromProvider (id: string, video: Video, width: number, height: number): Promise<IVideoPlayer> {
    if (!this.loadingScript && !this.ready) {
      // console.debug('about to initiate loading script: ' + this.apiScript)
      this.loadingScript = true
      if (this.apiScript !== '') { // Handle importing script
        // console.debug('importing script: ' + this.apiScript)
        importScript(this.apiScript, () => {
          // console.debug('script imported: ' + this.apiScript)
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

    return this.createVideoPlayer(id, video, width, height)
  }

  protected abstract createVideoPlayer (id: string, video: Video, width: number, height: number): IVideoPlayer

  /**
   * Allows an iframe to bubble its mousemove event so that the iframes parent container can detect it
   * https://stackoverflow.com/a/38442439
   * https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/MouseEvent
   * @param iframe The iframe element
   */
  protected bubbleIframeMouseMove (iframe: HTMLIFrameElement) {

    iframe.contentWindow.addEventListener('mousemove', function (event) {
      const boundingClientRect = iframe.getBoundingClientRect()

      const evt = new MouseEvent('mousemove', {
        bubbles: true,
        cancelable: false,
        clientX: event.clientX + boundingClientRect.left,
        clientY: event.clientY + boundingClientRect.top
      })

      iframe.dispatchEvent(evt)
    })
  }
}

function sleep (ms = 0) {
  return new Promise(r => setTimeout(r, ms))
}
