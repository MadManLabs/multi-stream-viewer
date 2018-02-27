import { Component, Vue, Prop } from 'vue-property-decorator'
import { VideoLink } from '../video-link'
import { VideoProviders } from '../../../../shared/providers/providers'
import { url } from 'inspector'
import { VideoViewComponent } from '../../../video-view/video-view'

@Component({
  template: require('./video-link-viewer.html'),
  components: {
    'video-view': VideoViewComponent
  }
})
export class VideoLinkViewerComponent extends Vue {
  @Prop({ required: true })
  videoLink: VideoLink

  alertMsg = ''

  urlStringChanged () {
    try {
      this.videoLink.url = new URL(this.videoLink.urlString)
      this.videoLink.video = null
      this.alertMsg = 'The provided URL is not recognized as a valid video provider'
      VideoProviders.forEach((v,k) => {
        if (v.acceptsHostName(this.videoLink.url)) {
          const id = v.getVideoIdFromUrl(this.videoLink.url)
          if (id === '') {
            this.alertMsg = 'We were not able to find a valid Video ID from the provided URL'
          } else {
            this.alertMsg = ''

            if (this.videoLink.video === null) {
              console.debug('creating new video object')
              this.videoLink.video = {
                provider: k,
                id: id,
                timestamp: 0,
                muted: false,
                player: null
              }
            }
          }
        }
      })
    } catch (error) {
      if (this.videoLink.urlString === '') {
        this.alertMsg = ''
      } else {
        this.alertMsg = 'Input is not a valid URL'
      }
      this.videoLink.url = null
      this.videoLink.video = null
    }
  }

  clearString () {
    this.videoLink.urlString = ''
    this.urlStringChanged()
  }

  captureTimestamp () {
    this.videoLink.video.player.getTime().then(time => this.videoLink.video.timestamp = time)
  }
}
