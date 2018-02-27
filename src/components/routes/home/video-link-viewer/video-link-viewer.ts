import { Component, Vue, Prop } from 'vue-property-decorator'
import { VideoLink } from '../video-link'

@Component({
  template: require('./video-link-viewer.html')
})
export class VideoLinkViewerComponent extends Vue {
  @Prop({ required: true })
  videoLink: VideoLink

  alertMsg = ''

  urlStringChanged () {
    try {
      this.videoLink.url = new URL(this.videoLink.urlString)
      this.alertMsg = ''
    } catch (error) {
      this.alertMsg = 'Input is not a valid URL'
      this.videoLink.url = null
    }
  }
}
