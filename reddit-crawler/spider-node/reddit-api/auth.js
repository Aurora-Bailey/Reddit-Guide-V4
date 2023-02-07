const axios = require("axios")
const credentials = require("../../reddit_credentials.json")

class Auth {
  constructor() {
    this._token = null
  }

  async _requestAccessToken() {
    let url = "https://www.reddit.com/api/v1/access_token"
    let postData = `grant_type=client_credentials`
    let headers = {
      authorization:
        "Basic " +
        Buffer.from(
          credentials.client.id + ":" + credentials.client.secret
        ).toString("base64"),
      "User-Agent": this.userAgent(),
    }

    let response = await axios.post(url, postData, { headers })
    if (!response.data.error) return response.data
    else throw response.data
  }

  async accessToken() {
    if (this._token !== null && this._token.expires_at > Date.now())
      return this._token
    else {
      let token = await this._requestAccessToken()
      token.expires_at = Date.now() + token.expires_in * 1000 - 60 * 1000
      this._token = token
      return token
    }
    /*
    { access_token: '--nOsE_Kgs_ZIvHeTqbmZVfWqCdk',
    token_type: 'bearer',
    expires_in: 3600,
    scope: '*',
    expires_at: 1552973360483 }
    */
  }

  userAgent() {
    return `node:${credentials.app_id}:v${credentials.version} (by /u/${credentials.developer})`.toLowerCase()
  }
}

module.exports = new Auth()
