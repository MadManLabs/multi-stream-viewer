import { Video } from '../viewer/video'

export interface VideoLink {
  urlString: string
  url: URL
  video: Video
  key: number
}

export function CreateBlankVideoLink (key: number): VideoLink {
  return { urlString: '', url: null, video: null, key: key }
}
