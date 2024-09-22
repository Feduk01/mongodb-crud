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

export async function getQueries(col: Collection<Chat>): Promise<void> {
  // 2a  const filter = { likes: 0 } Alla meddelanden med 0 likes?
  // 2b  const filter = { likes: { $gte: 8 } } Alla meddelanden med minst 8 likes?
  // 2c  const filter = { senderId: 'Greta' } Alla meddelanden som skickats av Greta?
  // 2d const filter = { receiverId: 'Paul' } Alla meddelanden till Paul?
  // 2e const filter = { senderId: 'Zoro', receiverId: 'Hassan' } Alla meddelanden från Zoro till Hassan?
  // 2f const filter = {
  //     $or: [
  //       { senderId: 'Zoro', receiverId: 'Hassan' },
  //       { senderId: 'Hassan', receiverId: 'Zoro' },
  //     ],
  //   }
  // 2g  const filter = { likes: { $gte: 1, $lte: 4 } }
  // 2h const filter = {
  //     $and: [{ senderId: 'Hassan' }, { likes: { $gte: 7 } }],
  //   }
  //  2i const filter = { $and: [{ senderId: 'Greta' }, { likes: { $lt: 4 } }] }
  //  2k const filter = {
  //     $or: [{ senderId: 'Greta' }, { like: 0 }, { like: { $gt: 10 } }],
  //   }
  const filter = {
    $and: [
      { likes: { $gte: 5 } },
      {
        $or: [{ senderId: 'Hassan' }, { receiverId: 'Hassan' }],
      },
    ],
  }

  const projection = { messageText: 1 }
  const cursor: FindCursor<WithId<Chat>> = col.find(filter).project(projection)
  const found: WithId<Chat>[] = await cursor.toArray()

  if (found.length < 1) {
    console.log('Could not find any messages with 0 likes')
    return
  }

  found.forEach((message) => {
    // 2a,b console.log(`${message.messageText} has likes:${message.likes} `)
    console.log(`${message.messageText}`)
  })
}
