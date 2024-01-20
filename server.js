require("dotenv").config();
const { default: axios } = require("axios");
const express = require("express");
const app = express();
const port = 8383;
const url = process.env.URL;

let history = [];
app.use(express.static("public"));
app.use(express.json());

app.get("/info", (req, res) => {
  res.status(200).json({ info: "this is the info from server" });
});

app.post("/", (req, res) => {
  const { query } = req.body;
  headers = {
    "Content-Type": "application/json",
  };
  data = {
    model: "mistral",
    stream: false,
    prompt: query,
  };
  axios.post(url, data, { headers }).then((response) => {
    if (response.status === 200) {
      const actualData = response.data.response;
      let questionResponse = "<h1>" + query + "</h1>" + "<br>" + actualData;
      history.push(questionResponse);
      history.reverse();
      // console.log(history)
      res.status(200).json({ info: actualData, history: history });
      console.log(history, "\n");
    } else {
      res.status(500).json({ info: "server error" });
    }
  });
});

app.listen(port, process.env.IP &&  "localhost", () => {
  console.log(`server has started on the port ${port}`);
});
