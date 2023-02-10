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

    this.t1LoopStart()
  }

  public async t1LoopStart() {
    let db_RedditCrawler: any
    db_RedditCrawler = await mongodb.db("reddit-crawler")

    let db_RedditData: any
    db_RedditData = await mongodb.db("reddit-data")

    let res = await db_RedditCrawler
      .collection("head")
      .findOneAndUpdate(
        { tracking: "t1_" },
        { $inc: { index: 100 } },
        { returnDocument: "before" }
      )
    let indexBefore = res.value.index
    let indexAfter = indexBefore + 100

    // ['t1_698', 't1_699', 't1_69a']
    let arr = Array.from(Array(100).keys()).map((i) => {
      return "t1_" + parseInt(i + indexBefore).toString(36)
    })

    let response = await api.info(this.credentials, arr)

    if (response?.response?.status === 200) {
      await db_RedditData
        .collection("comments")
        .insertMany(
          response.list.map((e) => {
            return e.data
          })
        )
        .catch(console.log)

      await db_RedditCrawler
        .collection("spider")
        .updateOne(
          { spider_name: this.spider_name },
          { $set: { last_update: Date.now() } }
        )
    }

    setTimeout(() => {
      this.t1LoopStart()
    }, 1000)
  }

  public async t2LoopStart() {
    let db_RedditCrawler: any
    db_RedditCrawler = await mongodb.db("reddit-crawler")

    let db_RedditData: any
    db_RedditData = await mongodb.db("reddit-data")

    let res = await db_RedditCrawler
      .collection("head")
      .findOneAndUpdate(
        { tracking: "t2_" },
        { $inc: { index: 100 } },
        { returnDocument: "before" }
      )
    let indexBefore = res.value.index
    let indexAfter = indexBefore + 100

    // ['t2_698', 't2_699', 't2_69a']
    let arr = Array.from(Array(100).keys()).map((i) => {
      return "t2_" + parseInt(i + indexBefore).toString(36)
    })

    let response = await api.info(this.credentials, arr)

    if (response?.response?.status === 200) {
      await db_RedditData
        .collection("posts")
        .insertMany(
          response.list.map((e) => {
            return e.data
          })
        )
        .catch(console.log)

      await db_RedditCrawler
        .collection("spider")
        .updateOne(
          { spider_name: this.spider_name },
          { $set: { last_update: Date.now() } }
        )
    }

    setTimeout(() => {
      this.t2LoopStart()
    }, 1000)
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
