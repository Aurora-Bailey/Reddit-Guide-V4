import api from "./reddit/api"
import mongodb from "./tools/mongodb"

class Main {
  running: boolean
  ready: boolean
  credentials: {
    version: string
    name: string
    type: string
    developer: string
    url: string
    app_id: string
    secret: string
    id: string
  }
  last_update: number
  error_log: any[]
  spider_name: string
  current_target: string

  constructor() {
    this.ready = false
    this.running = false
    this.credentials = {
      version: "",
      name: "",
      type: "",
      developer: "",
      url: "",
      app_id: "",
      secret: "",
      id: "",
    }
    this.last_update = 0
    this.error_log = []
    this.spider_name = ""
    this.current_target = ""
  }

  public async start() {
    let db: any

    await this.registerSpider()

    let response = await api.info(this.credentials, [
      "t1_j71qba2",
      "t1_j71qba1",
    ])
    if (response?.response?.status === 200) {
      db = await mongodb.db("reddit-data")
      db.collection("comments")
        .insertMany(
          response.list.map((e) => {
            return e.data
          })
        )
        .catch(console.log)
    }
  }

  public async registerSpider() {
    let db: any
    db = await mongodb.db("reddit-crawler")
    let spider = await db.collection("spider").findOne({
      // Find spider that hasnt been used for at least one minute
      last_update: { $lte: Date.now() - 60 * 1000 },
    })

    if (spider === null) {
      console.log("Waiting for available spider...")
      await this.timeout(10000)
      await this.registerSpider()
    } else {
      this.ready = true
      this.credentials = spider.credentials
      this.last_update = spider.last_update
      this.error_log = spider.error_log
      this.spider_name = spider.spider_name
      this.current_target = spider.current_target

      await db
        .collection("spider")
        .updateOne(
          { spider_name: this.spider_name },
          { $set: { last_update: Date.now() } }
        )
      console.log("Success spider has registered...")
    }

    return true
  }

  timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}
const main = new Main()
main.start()
