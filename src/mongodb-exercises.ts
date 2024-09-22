const test: string | undefined = process.env.TEST
console.log('Test env-fil: ' + test)

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
import { getFirstDoc } from './getFirst'
import { getAll } from './getAll'
import { getQueries } from './messageQueries'

async function connect() {
  const con: string | undefined = process.env.CONNECTION_STRING
  if (!con) {
    console.log('ERROR: connection string not found!')
    return
  }
  try {
    const client: MongoClient = new MongoClient(con)
    const db: Db = await client.db('Exercise')
    const col: Collection<Chat> = db.collection<Chat>('chat')

    //1D
    // await getFirstDoc(col)
    //1E
    // await getAll(col)

    //2
    await getQueries(col)
  } catch (error: any) {
    console.log('An error occured: ' + error.message)
  }
  console.log('Program executed successfully')
}

connect()
