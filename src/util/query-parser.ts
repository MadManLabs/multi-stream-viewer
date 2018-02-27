import rison from 'rison'
import { Video, VideoProvider } from '../components/routes/viewer/video'

/**
 * Creates a Video object from a query string in ORison format.
 * @param {string} query The query in ORison format. E.g. 'provider:yt,id:bVQogFuMq7c,timestamp:0.29,muted:!t'
 * @returns {Video} A Video object based on the query string
 * @throws An error is thrown if the function fails to create a valid Video object from the query
 */
export function createVideoFromQuery (query: string): Video {
  const obj: any = rison.decode_object(query) // may throw an error if the query is not valid ORison
  // obj.provider = obj.provider.toString()
  // obj.id = obj.id.toString()
  const video: Video = obj
  // Validate that the query was parsed into a correct Video object
  validateProvider(video)
  validateId(video)

  // Sanitize optional parameters and set them to default values if not defined in the query so we don't need to check if they are defined later on
  sanitizeTimestamp(video)
  sanitizeMuted(video)

  return video
}

function validateProvider (video: Video) {
  if (!video.provider) {
    throw new TypeError('Video provider missing')
  }
  if (!Object.keys(VideoProvider).some(key => VideoProvider[key] === video.provider)) {
    throw new RangeError('Unknown video provider indicated')
  }
}

function validateId (video: Video) {
  if (!video.id) {
    throw new TypeError('Video id missing')
  }

  video.id = video.id.toString()

  if (video.id === '' || video.id.trim() === '') {
    throw new RangeError('Video id is empty')
  }

  video.id = video.id.trim()
  // TODO: Possibly validate the video id with the provider
}

function sanitizeTimestamp (video: Video) {
  if (!video.timestamp || video.timestamp < 0) {
    video.timestamp = 0
  }
}

function sanitizeMuted (video: Video) {
  if (!video.muted) {
    video.muted = false
  }
}
