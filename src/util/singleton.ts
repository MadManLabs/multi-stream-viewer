export abstract class Singleton<T extends Singleton<T>> {
  private static _instance: any = null

  protected constructor () {
    const singleton = this.constructor as typeof Singleton
    if (singleton._instance !== null) {
      throw new Error('Cannot manually construct a singleton instance. Use getInstance(T) in stead.') // Technically you can construct the singleton once when you haven't called getInstance(T)
    }
    singleton._instance = this
  }

  static getInstance<T extends Singleton<T>> (c: new () => T): T { // This does have the unfortunate side-effect that our singletons must have a public constructor
    return this._instance || (this._instance = new c())
  }
}
