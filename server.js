const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;
const { Client } = require("pg");

const connection = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

connection.connect(err => {
  if (err) {
    return err;
  }
});

queryData = (query, path) => {
  app.get(query, (req, res) => {
    connection.query(path, (err, results) => {
      if (err) {
        console.log("Error");
        return res.send(err);
      } else {
        console.log("Data: " + results.rows);
        res.send(results.rows);
      }
    });
  });
};

var frontendQuery =
  "SELECT skill_name FROM portfolio.skills " +
  "WHERE portfolio.skills.skill_type = 'Frontend' ";
var frontendPath = "/skills/frontend";

var backendQuery =
  "SELECT skill_name FROM portfolio.skills " +
  "WHERE portfolio.skills.skill_type = 'Backend' ";
var backendPath = "/skills/backend";

var otherQuery =
  "SELECT skill_name FROM portfolio.skills " +
  "WHERE portfolio.skills.skill_type = 'Other' ";
var otherPath = "/skills/other";

queryData(frontendPath, frontendQuery);
queryData(backendPath, backendQuery);
queryData(otherPath, otherQuery);


app.get("/projects", (req, res) => {
  connection.query("SELECT * FROM portfolio.projects", (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      res.send(results.rows);
    }
  });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
