import { Component, Vue } from 'vue-property-decorator'
import bContainer from 'bootstrap-vue/es/components/layout/container'
import bCol from 'bootstrap-vue/es/components/layout/col'
import bRow from 'bootstrap-vue/es/components/layout/row'
import { WebSiteName, VideoProviders } from '../../../shared/project-vars'
import { VideoLinkViewerComponent } from './video-link-viewer/video-link-viewer'
import rison from 'rison'

import './home.scss'
import { VideoLink, CreateBlankVideoLink } from './video-link'
import { Video } from '../viewer/video'

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
  viewLink: string = ''

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

  addVideo () {
    this.videoLinks.push(CreateBlankVideoLink(this.videoLinks.length))
    this.scrollToBottom()
  }

  areVideosValid (): boolean {
    return this.videoLinks.every((videoLink => videoLink.video !== null))
  }

  createViewLink () {
    const videos: Array<Video> = []
    this.videoLinks.forEach(videoLink => {
      const video: Video = {
        provider: videoLink.video.provider,
        id: videoLink.video.id,
        muted: videoLink.video.muted,
        timestamp: videoLink.video.timestamp
      }
      videos.push(video)
    })

    let url: string = window.location.href + 'viewer?' // TODO: Fix hard coding of router path
    videos.forEach(video => {
      const encoding = rison.encode_object(video)
      url = `${url}&v=${encoding}`
    })

    this.viewLink = url

    this.scrollToBottom()
  }

  selectLink () {
    window.getSelection().selectAllChildren(document.getElementById('viewLink'))
  }

  copyLink () {
    this.selectLink()
    document.execCommand('copy')
  }

  private scrollToBottom () {
    // Scroll to bottom - we wait 50 ms to give Vue a chance to update view before scrolling
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight)
    }, 50)
  }
}
