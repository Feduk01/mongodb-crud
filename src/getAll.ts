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

export async function getAll(col: Collection<Chat>): Promise<void> {
  const filter = {}
  const projection = { messageText: 1, senderId: 1 }
  const cursor: FindCursor<WithId<Chat>> = col.find(filter).project(projection)
  const found: WithId<Chat>[] = await cursor.toArray()

  if (found.length < 1) {
    console.log('No messages')
    return
  }

  found.forEach((message) => {
    console.log(`${message.senderId} writing: ${message.messageText}`)
  })
}
