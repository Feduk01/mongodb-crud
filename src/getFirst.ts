import {
  MongoClient,
  Db,
  Collection,
  ObjectId,
  WithId,
  FindCursor,
  InsertOneResult,
  DeleteResult,
  UpdateResult,
} from 'mongodb'

import { Chat } from './modules/message'

export async function getFirstDoc(col: Collection<Chat>): Promise<void> {
  const filter = { senderId: 'Greta' }
  const found: WithId<Chat> | null = await col.findOne(filter)
  if (found) {
    console.log('First document in Collection is: ', found)
  } else {
    console.log('Could not find any documents')
  }
}
