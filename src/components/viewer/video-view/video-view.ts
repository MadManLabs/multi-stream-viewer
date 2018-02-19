import { Component, Vue, Prop } from 'vue-property-decorator'
import { Video } from '../video'
import { VideoProviders } from '../providers/providers'

@Component({
  template: require('./video-view.html')
})
export class VideoViewComponent extends Vue {
  @Prop({ required: true })
  video: Video

  get id () {
    return `${this.video.provider}_${this.video.id}`
  }

  mounted () {
    VideoProviders.get(this.video.provider).requestVideoFromProvider(this.id, this.video)
  }
}
