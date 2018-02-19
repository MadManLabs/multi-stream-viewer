import { Component, Vue, Prop } from 'vue-property-decorator'
import { Video } from '../video'
import { VideoProviders, IVideoPlayer } from '../providers/providers'
import { PlayerBus } from '../util/player-bus'

@Component({
  template: require('./video-view.html')
})
export class VideoViewComponent extends Vue {
  videoPlayer: IVideoPlayer

  @Prop({ required: true })
  video: Video

  get id () {
    return `${this.video.provider}_${this.video.id}`
  }

  created () {
    PlayerBus.$on('play', () => this.videoPlayer.play())
    PlayerBus.$on('pause', () => this.videoPlayer.pause())
    PlayerBus.$on('seek', () => this.videoPlayer.seek(this.video.timestamp))
  }

  mounted () {
    VideoProviders.get(this.video.provider).requestVideoFromProvider(this.id, this.video)
    .then(player => this.videoPlayer = player)
  }
}
