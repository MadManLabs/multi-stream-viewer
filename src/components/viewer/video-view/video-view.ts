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
  @Prop({ required: true })
  width: number
  @Prop({ required: true })
  height: number

  wrapperStyle = {
    width: '100vw',
    height: '100vh'
  }

  get id () {
    return `${this.video.provider}_${this.video.id}`
  }

  mounted () {
    VideoProviders.get(this.video.provider).requestVideoFromProvider(this.id, this.video, 640, 400)
    .then(player => {
      this.videoPlayer = player
      this.video.player = player
    })

    this.wrapperStyle.width = this.width + 'vw'
    this.wrapperStyle.height = this.height + 'vh'

    PlayerBus.$on('play', () => this.videoPlayer.play())
    PlayerBus.$on('pause', () => this.videoPlayer.pause())
    PlayerBus.$on('sync', (referenceVideo: Video) => {
      referenceVideo.player.getTime().then(time => {
        this.videoPlayer.seek(time - referenceVideo.timestamp + this.video.timestamp)
      })
    })
    PlayerBus.$on('syncnplay', (referenceVideo: Video) => {
      referenceVideo.player.getTime().then(time => {
        this.videoPlayer.seek(time - referenceVideo.timestamp + this.video.timestamp)
        this.videoPlayer.play()
      })
    })
  }
}
