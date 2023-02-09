import { MongoClient } from "mongodb"

class Mongo {
  private url: string
  private client: {
    close: () => {}
    db: (dbName: string) => {}
  }

  constructor() {
    this.url = `mongodb://localhost:27017`
    this.client = null
  }

  public close() {
    if (this.client) this.client.close()
    console.log("-- Mongodb connection closed on " + this.url)
  }

  public async db(dbName: string) {
    let client = await this.connect()
    return client.db(dbName)
  }

  private async connect() {
    if (this.client) return this.client
    else {
      this.client = await MongoClient.connect(this.url)
      console.log("-- Mongodb connection opened on " + this.url)
      return this.client
    }
  }
}

export default new Mongo()

// await mongodb.db('reddit-guide')
