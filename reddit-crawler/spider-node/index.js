const Reddit_api = require("./reddit-api/api.js")

Reddit_api.info(["t1_j71qaa3"]).then(console.log)

console.log("hello world")
// https://www.reddit.com/api/info.json?id=t1_j71qaa3
