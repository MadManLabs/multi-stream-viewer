import { Component, Vue } from 'vue-property-decorator'
import bContainer from 'bootstrap-vue/es/components/layout/container'
import bCol from 'bootstrap-vue/es/components/layout/col'
import bRow from 'bootstrap-vue/es/components/layout/row'
import { Video, VideoProvider } from './video'
import { VideoViewComponent } from './video-view/video-view'
import { createVideoFromQuery } from './util/query-parser'
import * as providers from './providers/providers'

@Component({
  template: require('./viewer.html'),
  components: {
    'b-container': bContainer,
    'b-col': bCol,
    'b-row': bRow,
    'video-view': VideoViewComponent
  }
})
export class ViewerComponent extends Vue {
  testMessage: string = 'data string here'
  videos: Array<Video> = []

  mounted () {
    // providers.VideoProviders.forEach(provider => provider.setup())

    if (this.parseQuery()) {
      this.testMessage = 'Successfully parsed URL query'
    } else {
      this.testMessage = 'Failed to parse URL query'
    }
  }

  private parseQuery (): boolean {
    const videoQueries: any = this.$route.query['v']
    /* this.$route.query[] returns either:
        string`: if there are one 'v' query parameter
        string array: if there are multiple 'v' query parameters
        undefined: if there are no 'v' query parameters
    */
    try {
      if (videoQueries instanceof Array) {
        for (const v in videoQueries) {
          if (videoQueries.hasOwnProperty(v)) {
            const query = videoQueries[v]
            this.videos.push(createVideoFromQuery(query))
          }
        }
        return true
      } else if (typeof videoQueries === 'string') {
        this.videos.push(createVideoFromQuery(videoQueries))
        return true
      }

      // No 'v' query parameters found
      return false
    } catch (error) {
      console.error(error)
      return false
    }
  }
}

// http://viewsync.net/watch?v=FgzxNo15T-0&t=1.96&v=bVQogFuMq7c&t=0.29&autoplay=false
// https://www.twitch.tv/videos/228706241 - austin
// https://www.twitch.tv/videos/228706076 - rob

// http://localhost:8080/viewer?v=provider:yt,id:FgzxNo15T-0,timestamp:1.96&v=provider:yt,id:bVQogFuMq7c,timestamp:0.29,muted:!t&v=provider:tw,id:228706241,muted:!t&v=provider:tw,id:228706076,muted:!t

// Failing test urls
// unknown provider: http://localhost:8080/viewer?v=provider:yt,id:FgzxNo15T-0,timestamp:1.96&v=provider:vi,id:bVQogFuMq7c
// missing provider: http://localhost:8080/viewer?v=id:FgzxNo15T-0,timestamp:1.96&v=provider:yt,id:bVQogFuMq7c
// missing id: http://localhost:8080/viewer?v=provider:yt,timestamp:1.96&v=provider:yt,id:bVQogFuMq7c
// empty id: http://localhost:8080/viewer?v=provider:yt,id:'',timestamp:1.96&v=provider:yt,id:bVQogFuMq7c

/**
 * video provider - twitch, youtube, ...
 * video id - e.g. bVQogFuMq7c
 * timestamp - where to start the video from
 * muted - should video audio be muted
 */
