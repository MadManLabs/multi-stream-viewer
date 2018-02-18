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
    chat?: ChatType
    collection?: string
    'font-size'?: FontSizeType
    height?: number | string
    layout?: LayoutType
    theme?: ThemeType
    video?: string
    width?: number | string
  }

  export type ChatType = 'default' | 'mobile'

  export type FontSizeType = 'small' | 'medium' | 'large'

  export type LayoutType = 'video-and-chat' | 'video'

  export type ThemeType = 'light' | 'dark'
}