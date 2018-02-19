import { VideoProvider, Video } from '../video'

export interface IVideoProvider {
  requestVideoFromProvider (id: string, video: Video): Promise<IVideoPlayer>
}

export interface IVideoPlayer {
  play ()
  pause ()
  seek (time: number)
  mute ()
  unmute ()
}

export const VideoProviders = new Map<VideoProvider, IVideoProvider>()
