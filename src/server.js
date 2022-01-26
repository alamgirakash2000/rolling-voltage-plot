const server = require("http").createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method == "GET") {
    res.write("Hello World!");
    res.end();
  } else if (req.method == "POST") {
    var body = "";
    req.on("data", function (data) {
      body += data;
    });
    req.on("end", function () {
      number_of_data = parseInt(body);
      increment = parseInt(parseInt(body) / 100);
    });
  }
});

const fs = require("fs");
const csv = require("csv-parser");

const io = require("socket.io")(server, {
  transports: ["websocket", "polling"],
});

let number_of_data = 200;

let CHANNEL1 = [];
let CHANNEL2 = [];
let CHANNEL3 = [];
let CHANNEL4 = [];
let CHANNEL5 = [];
let CHANNEL6 = [];
let CHANNEL7 = [];
let CHANNEL8 = [];

let n1 = 0;
let n2 = 0;
let n3 = 0;
let n4 = 0;
let n5 = 0;
let n6 = 0;
let n7 = 0;
let n8 = 0;

// 1. listen for socket connections
io.on("connection", (client) => {
  setInterval(() => {
    // Re- initialization
    CHANNEL1 = [];
    CHANNEL2 = [];
    CHANNEL3 = [];
    CHANNEL4 = [];
    CHANNEL5 = [];
    CHANNEL6 = [];
    CHANNEL7 = [];
    CHANNEL8 = [];

    // Read CSV
    fs.createReadStream("./src/data/Voltage.csv")
      .pipe(csv())
      .on("data", function (row) {
        loadData(row);
      })
      .on("end", () => {
        increaseNumber();

        client.emit("myData", {
          channel1: CHANNEL1.slice(n1, n1 + number_of_data),
          channel2: CHANNEL2.slice(n2, n2 + number_of_data),
          channel3: CHANNEL3.slice(n3, n3 + number_of_data),
          channel4: CHANNEL4.slice(n4, n4 + number_of_data),
          channel5: CHANNEL5.slice(n5, n5 + number_of_data),
          channel6: CHANNEL6.slice(n6, n6 + number_of_data),
          channel7: CHANNEL7.slice(n7, n7 + number_of_data),
          channel8: CHANNEL8.slice(n8, n8 + number_of_data),
        });
      });
  }, 100);
});

server.listen(3000);

let increment = 1;
const increaseNumber = () => {
  if (n1 + number_of_data + 20 < CHANNEL1.length) {
    n1 += increment;
  }
  if (n2 + number_of_data + 20 < CHANNEL2.length) {
    n2 += increment;
  }
  if (n3 + number_of_data + 20 < CHANNEL3.length) {
    n3 += increment;
  }
  if (n4 + number_of_data + 20 < CHANNEL4.length) {
    n4 += increment;
  }
  if (n5 + number_of_data + 20 < CHANNEL5.length) {
    n5 += increment;
  }
  if (n6 + number_of_data + 20 < CHANNEL6.length) {
    n6 += increment;
  }
  if (n7 + number_of_data + 20 < CHANNEL7.length) {
    n7 += increment;
  }
  if (n8 + number_of_data + 20 < CHANNEL8.length) {
    n8 += increment;
  }
};

const loadData = async (dat) => {
  if (dat["Channel1"]) {
    CHANNEL1.push(dat["Channel1"]);
  }
  if (dat["Channel2"]) {
    CHANNEL2.push(dat["Channel2"]);
  }
  if (dat["Channel3"]) {
    CHANNEL3.push(dat["Channel3"]);
  }
  if (dat["Channel4"]) {
    CHANNEL4.push(dat["Channel4"]);
  }
  if (dat["Channel5"]) {
    CHANNEL5.push(dat["Channel5"]);
  }
  if (dat["Channel6"]) {
    CHANNEL6.push(dat["Channel6"]);
  }
  if (dat["Channel7"]) {
    CHANNEL7.push(dat["Channel7"]);
  }
  if (dat["Channel8"]) {
    CHANNEL8.push(dat["Channel8"]);
  }
};
