import { Component, Vue } from 'vue-property-decorator'
import bContainer from 'bootstrap-vue/es/components/layout/container'
import bCol from 'bootstrap-vue/es/components/layout/col'
import bRow from 'bootstrap-vue/es/components/layout/row'
import { WebSiteName, VideoProviders } from '../../../shared/project-vars'
import { VideoLinkViewerComponent } from './video-link-viewer/video-link-viewer'

import './home.scss'
import { VideoLink, CreateBlankVideoLink } from './video-link'

@Component({
  template: require('./home.html'),
  components: {
    'b-container': bContainer,
    'b-col': bCol,
    'b-row': bRow,
    'video-link-viewer': VideoLinkViewerComponent
  }
})
export class HomeComponent extends Vue {
  webSiteName: string = WebSiteName
  videoProviders: string = ''

  videoLinks: Array<VideoLink> = [ CreateBlankVideoLink(0) ]
  // package: string = 'vue-webpack-typescript'
  // repo: string = 'https://github.com/ducksoupdev/vue-webpack-typescript'
  // mode: string = process.env.ENV

  mounted () {
    this.webSiteName = WebSiteName
    this.videoProviders = (VideoProviders.length <= 2)
      ? VideoProviders.join(' and ')
      : VideoProviders.slice(0, VideoProviders.length - 1).join(', ').concat(' and ', VideoProviders[VideoProviders.length - 1])
  }
}
