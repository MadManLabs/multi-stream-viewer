import { VideoProvider, Video } from '../video'

export interface IVideoProvider {
  setup ()
  requestVideoFromProvider (id: string, video: Video)
}

export const VideoProviders = new Map<VideoProvider, IVideoProvider>()
