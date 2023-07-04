const express = require("express");
const app = express();
const router = require("./router")

const port = 8080;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

router(app)

app.listen(port, (req, res) => {
  console.log(`Server running at port: ${port}`);
});