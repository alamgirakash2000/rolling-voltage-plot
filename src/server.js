const server = require("http").createServer();
const fs = require("fs");
const csv = require("csv-parser");

const io = require("socket.io")(server, {
  transports: ["websocket", "polling"],
});

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
          channel1: limit(CHANNEL1.slice(n1, n1 + 200)),
          channel2: limit(CHANNEL2.slice(n2, n2 + 200)),
          channel3: limit(CHANNEL3.slice(n3, n3 + 200)),
          channel4: limit(CHANNEL4.slice(n4, n4 + 200)),
          channel5: limit(CHANNEL5.slice(n5, n5 + 200)),
          channel6: limit(CHANNEL6.slice(n6, n6 + 200)),
          channel7: limit(CHANNEL7.slice(n7, n7 + 200)),
          channel8: limit(CHANNEL8.slice(n8, n8 + 200)),
        });
      });
  }, 100);
});

server.listen(3000);

const increaseNumber = () => {
  if (n1 + 300 < CHANNEL1.length) {
    n1 += 1;
  }
  if (n2 + 300 < CHANNEL2.length) {
    n2 += 1;
  }
  if (n3 + 300 < CHANNEL3.length) {
    n3 += 1;
  }
  if (n4 + 300 < CHANNEL4.length) {
    n4 += 1;
  }
  if (n5 + 300 < CHANNEL5.length) {
    n5 += 1;
  }
  if (n6 + 300 < CHANNEL6.length) {
    n6 += 1;
  }
  if (n7 + 300 < CHANNEL7.length) {
    n7 += 1;
  }
  if (n8 + 300 < CHANNEL8.length) {
    n8 += 1;
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

// const loadData = async (dat) => {
//   if (dat["Channel1"]) {
//     CHANNEL1.push({
//       value: dat["Channel1"],
//     });
//   }
//   if (dat["Channel2"]) {
//     CHANNEL2.push({
//       value: dat["Channel2"],
//     });
//   }
//   if (dat["Channel3"]) {
//     CHANNEL3.push({
//       value: dat["Channel3"],
//     });
//   }
//   if (dat["Channel4"]) {
//     CHANNEL4.push({
//       value: dat["Channel4"],
//     });
//   }
//   if (dat["Channel5"]) {
//     CHANNEL5.push({
//       value: dat["Channel5"],
//     });
//   }
//   if (dat["Channel6"]) {
//     CHANNEL6.push({
//       value: dat["Channel6"],
//     });
//   }
//   if (dat["Channel7"]) {
//     CHANNEL7.push({
//       value: dat["Channel7"],
//     });
//   }
//   if (dat["Channel8"]) {
//     CHANNEL8.push({
//       value: dat["Channel8"],
//     });
//   }
// };

const limit = (value) => {
  if (value?.length <= 1000) {
    return value;
  } else {
    return value?.slice(-1000);
  }
};
