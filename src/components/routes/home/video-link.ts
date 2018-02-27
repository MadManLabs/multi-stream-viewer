import { Video } from '../viewer/video'

export interface VideoLink {
  urlString: string
  url: URL
  video: Video
}

export function CreateBlankVideoLink (): VideoLink {
  return { urlString: '', url: null, video: null }
}
