import { VideoProvider, Video } from '../../components/routes/viewer/video'

export interface IVideoProvider {
  requestVideoFromProvider (id: string, video: Video, width: number, height: number): Promise<IVideoPlayer>
  acceptsHostName (url: URL): boolean
  getVideoIdFromUrl (url: URL): string
}

export interface IVideoPlayer {
  play ()
  pause ()
  seek (time: number)
  mute ()
  unmute ()
  getTime (): Promise<number>
  getLength (): Promise<number>
}

export const VideoProviders = new Map<VideoProvider, IVideoProvider>()
