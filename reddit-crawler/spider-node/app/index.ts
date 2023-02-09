import api from "./reddit/api"
import mongodb from "./tools/mongodb"

class Main {
  constructor() {}

  public async start() {
    let db: any

    let response = await api.info(["t1_j71qaa3"])
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
}
const main = new Main()
main.start()
