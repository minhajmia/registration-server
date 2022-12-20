const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(bodyParser.json());

// connect server with mongoDB database
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD_NAME}@cluster0.dftbcru.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    const testInfoCollection = client
      .db("selectTestDB")
      .collection("allTestInfo");

    //  find all testInfo
    app.get("/allTestInfo", async (req, res) => {
      const query = {};
      const allTestInfo = await testInfoCollection.find(query).toArray();
      res.send(allTestInfo);
    });
  } finally {
  }
}
run().catch((err) => console.error(err));

// testing code for server
app.get("/", (req, res) => {
  res.send("Triedge Platform Services Private Limited server is running");
});
app.listen(port, () => {
  console.log("listening on port " + port);
});
