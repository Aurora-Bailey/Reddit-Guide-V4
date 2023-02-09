import axios from "axios"
declare const Buffer

class Auth {
  token: {
    access_token: string
    token_type: string
    expires_in: number
    scope: string
    expires_at: number
  }
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

  constructor() {
    this.token = {
      access_token: "null",
      token_type: "bearer",
      expires_in: 3600,
      scope: "*",
      expires_at: 0,
    }
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
  }

  userAgent(credentials = this.credentials): string {
    this.credentials = credentials
    return `node:${this.credentials.app_id}:v${this.credentials.version} (by /u/${this.credentials.developer})`.toLowerCase()
  }

  private async requestAccessToken() {
    let url = "https://www.reddit.com/api/v1/access_token"
    let postData = `grant_type=client_credentials`
    let headers = {
      authorization:
        "Basic " +
        Buffer.from(
          this.credentials.id + ":" + this.credentials.secret
        ).toString("base64"),
      "User-Agent": this.userAgent(),
    }

    let response = await axios.post(url, postData, { headers })
    console.log("Request reddit token with id: " + this.credentials.id)
    if (!response.data.error) return response.data
    else throw response.data
  }

  async accessToken(credentials = this.credentials) {
    this.credentials = credentials
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
