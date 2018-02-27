import { spy, assert } from 'sinon'
import { expect } from 'chai'
import { Singleton } from './singleton'

class MySingleton extends Singleton<MySingleton> {
  private myValue = 0

  constructor () {
    super()
    this.myValue = 10
  }

  doSomething () {
    this.myValue++
  }

  get value () {
    return this.myValue
  }
}

class MyOtherSingleton extends Singleton<MyOtherSingleton> {
  private myValue = 3

  constructor () {
    super()
    this.myValue = 6
  }

  doSomething () {
    this.myValue++
  }

  get value () {
    return this.myValue
  }
}

describe('Singleton', () => {
  describe('General', () => {
    it('MySingleton can be instantiated with new the first time', function () {
      const singleton = new MySingleton()
      expect(singleton.value).to.equal(10)
    }),

    it('MySingleton cannot be instantiated with new a second time', function () {
      expect(() => new MySingleton()).to.throw(Error, 'Cannot manually construct a singleton instance. Use getInstance(T) in stead.')
    }),

    it('MySingleton.value should be 10', function () {
      const singleton = MySingleton.getInstance(MySingleton)
      expect(singleton.value).to.equal(10)
    }),

    /*  Singletons don't play nice with unit tests.
        The following two tests shows that the singleton persists and mantains state between tests. */

    it('MySingleton.value should be 11', function () {
      const singleton = MySingleton.getInstance(MySingleton)
      singleton.doSomething()
      expect(singleton.value).to.equal(11)
    }),

    it('MySingleton.value should be 12', function () {
      const singleton = MySingleton.getInstance(MySingleton)
      singleton.doSomething()
      expect(singleton.value).to.equal(12)
    }),

    it('MyOtherSingleton.value should be 6', function () {
      const singleton = MyOtherSingleton.getInstance(MyOtherSingleton)
      expect(singleton.value).to.equal(6)
    }),

    it('MySingleton.value should still be 12', function () { // This is a test to make sure singletons don't interfere with each others instance property
      const singleton = MySingleton.getInstance(MySingleton)
      expect(singleton.value).to.equal(12)
    })
  })
})
