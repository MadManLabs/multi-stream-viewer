import { Component, Vue, Prop } from 'vue-property-decorator'
import { Video } from '../video'

@Component({
  template: require('./video-view.html')
})
export class VideoViewComponent extends Vue {
  @Prop({ required: true })
  video: Video
}
