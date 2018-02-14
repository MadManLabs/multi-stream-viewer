import { Component, Vue } from 'vue-property-decorator'
import bContainer from 'bootstrap-vue/es/components/layout/container'
import bCol from 'bootstrap-vue/es/components/layout/col'
import bRow from 'bootstrap-vue/es/components/layout/row'
import rison from 'rison'
import { Video, VideoProvider } from './video'

@Component({
  template: require('./viewer.html'),
  components: {
    'b-container': bContainer,
    'b-col': bCol,
    'b-row': bRow
  }
})
export class ViewerComponent extends Vue {
  testMessage: string = 'data string here'
  queryMsg: string = 'query'
  videos: Array<Video> = []

  created () {
    this.videos.push(({ provider: VideoProvider.youtube, id: '' }))
    this.testMessage = rison.encode_object(this.videos[0])
  }
  mounted () {
    if (this.parseQuery()) {
      this.testMessage = 'Successfully parsed URL query'
    } else {
      this.testMessage = 'Failed to parse URL query'
    }
  }

  private parseQuery (): boolean {
    const vids: any = this.$route.query['v']
    for (const v in vids) {
      if (vids.hasOwnProperty(v)) {
        const element = vids[v]
        try {
          const video: Video = rison.decode_object(element)

          if (!this.validateVideoObject(video)) {
            console.error('Failed to parse video query string')
            return false
          }

          this.videos.push(video)

        } catch (error) {
          console.error('Failed to parse video query string - Rison', error)
        }
      }
    }

    return true
  }

  private validateVideoObject (video: Video): boolean {
    if (!video.provider) {
      console.error('Video provider missing')
      return false
    }
    if (!Object.keys(VideoProvider).some(key => VideoProvider[key] === video.provider)) {
      console.error('Unknown video provider indicated')
      return false
    }
    if (!video.id) {
      console.error('Video id missing')
      return false
    }
    if (video.id === '') {
      console.error('Video id is empty')
      return false
    }
    // TODO: Add additional checking for timestamp and muted
    // TODO: Possibly validate the video id with the provider
    return true
  }
}

// http://viewsync.net/watch?v=FgzxNo15T-0&t=1.96&v=bVQogFuMq7c&t=0.29&autoplay=false

// http://localhost:8080/viewer?yt=FgzxNo15T-0&yt=bVQogFuMq7c

// http://localhost:8080/viewer?hello=hello%20me&hello=peter,peter2&hello%5Blast%5D=pedersen

// http://localhost:8080/viewer?v=provider:yt,id:FgzxNo15T-0,t:1.96&v=provider:yt,id:bVQogFuMq7c,timestamp:0.29,muted:!t

// Failing test urls
// unknown provider: http://localhost:8080/viewer?v=provider:yt,id:FgzxNo15T-0,t:1.96&v=provider:vi,id:bVQogFuMq7c
// missing provider: http://localhost:8080/viewer?v=id:FgzxNo15T-0,t:1.96&v=provider:yt,id:bVQogFuMq7c
// missing id: http://localhost:8080/viewer?v=provider:yt,t:1.96&v=provider:yt,id:bVQogFuMq7c
// empty id: http://localhost:8080/viewer?v=provider:yt,id:'',t:1.96&v=provider:yt,id:bVQogFuMq7c

/**
 * video provider - twitch, youtube, ...
 * video id - e.g. bVQogFuMq7c
 * timestamp - where to start the video from
 * muted - should video audio be muted
 */
