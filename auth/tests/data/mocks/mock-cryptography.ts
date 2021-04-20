import { Hasher } from '@/data/protocols/cryptography'

import faker from 'faker'

export const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (plaintext: string): Promise<string> {
      return Promise.resolve(faker.datatype.uuid())
    }
  }
  return new HasherStub()
}
