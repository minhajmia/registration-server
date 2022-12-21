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
    const usersCollection = client.db("registerUsersDB").collection("users");

    //  save user to Db
    app.post("/user", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(user);
    });
    //  load all users
    app.get("/users", async (req, res) => {
      const query = {};
      const users = await usersCollection.find(query).toArray();
      res.send(users);
    });

    // load specific user info
    app.get("/users/loginUser", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      res.send(user);
    });
  } finally {
  }
}
run().catch((err) => console.error(err));

// testing code for server
app.get("/", (req, res) => {
  res.send("UNIO Labs server is running");
});
app.listen(port, () => {
  console.log("listening on port " + port);
});
