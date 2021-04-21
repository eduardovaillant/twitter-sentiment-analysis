import { HashComparer, Hasher } from '@/data/protocols/cryptography'

import faker from 'faker'

export class HasherSpy implements Hasher {
  digest = faker.datatype.uuid()
  plaintext: string

  async hash (plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return this.digest
  }
}

export class HasheComparerSpy implements HashComparer {
  digest: string
  plaintext: string

  async compare (plaintext: string, digest: string): Promise<boolean> {
    this.plaintext = plaintext
    this.digest = digest
    return true
  }
}
