import axios from "axios"
import * as credentials from "./reddit_credentials.json"
declare const Buffer

interface Auth {
  token: {
    access_token: string
    token_type: string
    expires_in: number
    scope: string
    expires_at: number
  }
}

class Auth {
  token: {
    access_token: string
    token_type: string
    expires_in: number
    scope: string
    expires_at: number
  }

  constructor() {
    this.token = {
      access_token: "null",
      token_type: "bearer",
      expires_in: 3600,
      scope: "*",
      expires_at: 0,
    }
  }

  userAgent(): string {
    return `node:${credentials.app_id}:v${credentials.version} (by /u/${credentials.developer})`.toLowerCase()
  }

  private async requestAccessToken() {
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
    if (this.token.expires_at > Date.now()) return this.token
    else {
      let token = await this.requestAccessToken()
      token.expires_at = Date.now() + token.expires_in * 1000 - 60 * 1000
      this.token = token
      return token
    }
  }
}

export default new Auth()
