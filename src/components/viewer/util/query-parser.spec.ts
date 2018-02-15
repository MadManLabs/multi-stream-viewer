import { spy, assert } from 'sinon'
import { expect } from 'chai'
import { createVideoFromQuery } from './query-parser'

describe('Query parser', () => {
  it('should create correct Video object', function () {
    const query = 'provider:yt,id:FgzxNo15T-0,timestamp:1.96,muted:!f'
    const video = createVideoFromQuery(query)
    expect(video.provider).to.equal('yt')
    expect(video.id).to.equal('FgzxNo15T-0')
    expect(video.timestamp).to.equal(1.96)
    expect(video.muted).to.equal(false)
  }),

  it('should throw unknown provider', function () {
    const query = 'provider:vi,id:bVQogFuMq7c'
    expect(() => createVideoFromQuery(query)).to.throw(RangeError, 'Unknown video provider indicated')
  }),

  it('should throw missing provider', function () {
    const query = 'id:FgzxNo15T-0,timestamp:1.96'
    expect(() => createVideoFromQuery(query)).to.throw(TypeError, 'Video provider missing')
  }),

  it('should throw empty id', function () {
    const query = 'provider:yt,id:\'  \',timestamp:1.96'
    expect(() => createVideoFromQuery(query)).to.throw(RangeError, 'Video id is empty')
  }),

  it('should throw missing id', function () {
    const query = 'provider:yt,timestamp:1.96'
    expect(() => createVideoFromQuery(query)).to.throw(TypeError, 'Video id missing')
  }),

  it('should throw error for ilformed query', function () {
    const query = 'provider:yt,timestamp:1.96,muted:!1'
    expect(() => createVideoFromQuery(query)).to.throw(Error)
  })
})

// http://localhost:8080/viewer?v=provider:yt,id:FgzxNo15T-0,timestamp:1.96&v=provider:yt,id:bVQogFuMq7c,timestamp:0.29,muted:!t

// Failing test urls
// unknown provider: http://localhost:8080/viewer?v=provider:yt,id:FgzxNo15T-0,timestamp:1.96&v=provider:vi,id:bVQogFuMq7c
// missing provider: http://localhost:8080/viewer?v=id:FgzxNo15T-0,timestamp:1.96&v=provider:yt,id:bVQogFuMq7c
// missing id: http://localhost:8080/viewer?v=provider:yt,timestamp:1.96&v=provider:yt,id:bVQogFuMq7c
// empty id: http://localhost:8080/viewer?v=provider:yt,id:'',timestamp:1.96&v=provider:yt,id:bVQogFuMq7c
