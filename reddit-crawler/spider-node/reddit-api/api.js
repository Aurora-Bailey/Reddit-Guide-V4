const axios = require("axios")
const config = require("../../reddit_credentials.json")
const auth = require("./auth.js")

class Api {
  constructor() {}

  // (array)
  async info(items) {
    let token = await auth.accessToken()
    let url = "https://oauth.reddit.com/api/info"
    let params = { id: items.join(",") }
    let headers = {
      Authorization: token.token_type + " " + token.access_token,
      "User-Agent": auth.userAgent(),
    }

    let response = await axios.get(url, { params, headers })
    if (response.status !== 200) throw response.status

    let list = response.data.data.children

    return { list, response }
  }

  // (string)
  async topPosts(subreddit) {
    let token = await auth.accessToken()
    let url = `https://oauth.reddit.com/r/${subreddit}/top`
    let params = { t: "month", limit: 20 }
    let headers = {
      Authorization: token.token_type + " " + token.access_token,
      "User-Agent": auth.userAgent(),
    }

    let response = await axios.get(url, { params, headers })
    if (response.status !== 200) throw response.status

    let list = response.data.data.children

    return { list, response }
  }
}

module.exports = new Api()
