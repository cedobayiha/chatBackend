let express = require("express")
let cors = require("cors")
let bodyParser = require("body-parser")
let app = express()
app.use(cors())
app.use(bodyParser.raw({ type: "*/*" }))
app.get("/", function(req, res) {
  res.send("hello world")
})
app.listen(4000)
