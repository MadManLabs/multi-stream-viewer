/** Type definitions for Twitch Embed
 * @author Peter Pedersen
 */

/**
 * @see https://dev.twitch.tv/docs/embed#embedding-video-and-clips
 * @see https://dev.twitch.tv/docs/api/reference#get-videos
 */
declare namespace Twitch
{
  export class Embed {
    /**
		 * Initializes a new instance of the Embed class.
		 *
		 * @param id   ID of the DOM element to insert the player's <iframe>.
		 * @param options   Embed options.
		 */
		constructor(id: string, options: EmbedOptions);
  }

  export interface EmbedOptions {
    allowfullscreen?: boolean
    channel?: string
    chat?: Chat | string
    collection?: string
    'font-size'?: FontSize | string
    height?: number | string
    layout?: Layout | string
    theme?: Theme | string
    video?: string
    width?: number | string
  }

  export enum Chat {
    Default = 'default',
    Mobile = 'mobile'
  }

  export enum FontSize {
    Small = 'small',
    Medium = 'medium',
    Large = 'large'
  }

  export enum Layout {
    VideAndChat = 'video-and-chat',
    Video = 'video'
  }

  export enum Theme {
    Light = 'light',
    Dark = 'dark'
  }

  export class Player {
    /**
		 * Initializes a new instance of the Embed class.
		 *
		 * @param id   ID of the DOM element to insert the player's <iframe>.
		 * @param options   Embed options.
		 */
    constructor(id: string, options: PlayerOptions);
    
    // Synchronous Playback Controls

    /** Pauses the player. */
    pause():void
    /** Begins playing the specified video. */
    play():void
    /** Seeks to the specified timestamp (in seconds) in the video and resumes playing if paused. Does not work for live streams. */
    seek(timestamp:number):void
    /** Sets the channel to be played. */
    setChannel(channel:string):void
    /** Sets the collection to be played. 
     * Optionally also specifies the video within the collection, from which to start playback. If a video ID is not provided here or the specified video is not part of the collection, playback starts with the first video in the collection.
    */
    setCollection(collectionId:string, videoId:string):void
    /** Sets the quality of the video. quality should be a string value returned by getQualities. */
    setQuality(quality:string):void
    /** Sets the video to be played. */
    setVideo(videoId:string):void

    // Synchronous Volume Controls

    /** Returns true if the player is muted; otherwise, false. */
    getMuted():boolean
    /** If true, mutes the player; otherwise, unmutes it. This is independent of the volume setting. */
    setMuted(muted:boolean):void
    /** Returns the volume level, a value between 0.0 and 1.0. */
    getVolume():number
    /** Sets the volume to the specified volume level, a value between 0.0 and 1.0. */
    setVolume(volumelevel:number):void

    // Synchronous Player Status

    /** Returns the channel’s name. Works only for live streams, not VODs. */
    getChannel():string
    /** Returns the current video’s timestamp, in seconds. Works only for VODs, not live streams. */
    getCurrentTime():number
    /** Returns the duration of the video, in seconds. Works only for VODs,not live streams. */
    getDuration():number
    /** Returns true if the live stream or VOD has ended; otherwise, false. */
    getEnded():boolean
    /** (Deprecated) Returns an object with statistics on the embedded video player and the current live stream or VOD. The format of the returned object is undefined. */
    getPlaybackStats():any
    /** Returns the available video qualities. For example, chunked (pass-through of the original source). */	
    getQualities():Array<string>
    /** Returns the current quality of video playback. */
    getQuality():string
    /** Returns the video ID. Works only for VODs, not live streams. */
    getVideo():string	
    /** Returns true if the video is paused; otherwise, false. Buffering or seeking is considered playing. */
    isPaused():boolean

    // Events Emitted by and Defined by the Player

    /** To listen to events, call addEventListener */
    addEventListener(event:PlayerEvent | string, callback:Function)

  }

  export enum PlayerEvent {
    /** Video or stream ends. */
    Ended = 'Twitch.Player.ENDED',
    /** Player is paused. Buffering and seeking is not considered paused. */
    Pause = 'Twitch.Player.PAUSE',
    /** Player is playing. */
    Play = 'Twitch.Player.PLAY',
    /** Loaded channel goes offline. */
    Offline = 'Twitch.Player.OFFLINE',
    /** Loaded channel goes online. */
    Online = 'Twitch.Player.ONLINE',
    /** Player is ready to accept function calls. */
    Ready = 'Twitch.Player.READY'
  }

  export interface PlayerOptions {
    /** Channel name (for a live stream) */
    channel?: string
    /** video ID */
    video?: string
    /** collection ID */
    collection?: string
    /** Height of the embedded window, in pixels. Recommended minimum: 300. */
    height: number
    /** Width of the embedded window, in pixels. Recommended minimum: 400. */
    width: number
  }
}