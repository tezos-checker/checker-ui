import { TezosToolkit } from '@taquito/taquito'

class TezosSingleton {
  private static instance: TezosToolkit

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): TezosToolkit {
    if (!TezosSingleton.instance) {
      //  fixme ==> url to put? env ?
      TezosSingleton.instance = new TezosToolkit('https://YOUR_PREFERRED_RPC_URL')
    }

    return TezosSingleton.instance
  }
}

export default TezosSingleton
