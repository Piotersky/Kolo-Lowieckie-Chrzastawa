const express = require("express");
var cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.options(
  "*",
  cors({
    origin: ["https://www.google.com/"],
  })
);

app.use("/client", express.static(__dirname + "/client"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/client/index.html");
});

app.get("/struktury", cors(), (req, res) => {
  res.sendFile(__dirname + "/client/struktury.html");
});

app.get("/historia", cors(), (req, res) => {
  res.sendFile(__dirname + "/client/historia.html");
});

app.get("/admin", cors(), (req, res) => {
  res.sendFile(__dirname + "/client/admin.html");
});

app.get("/polowania", cors(), (req, res) => {
  res.sendFile(__dirname + "/client/polowania.html");
});

app.get("/mapa", cors(), (req, res) => {
  res.sendFile(__dirname + "/client/mapa.html");
});

io.on("connection", function (socket) {
  console.log("connected socket!");

  const fs = require("fs");
  const path = require("path");

  const { promisify } = require("util");
  const readFile = promisify(fs.readFile);
  const exists = promisify(fs.exists);

  data_dir =
    "C:/Users/piotr/OneDrive/Pulpit/programowanie/Koło Łowieckie/data/";
  struktury_dir =
    "C:/Users/piotr/OneDrive/Pulpit/programowanie/Koło Łowieckie/data/struktury/";
  polowania_dir =
    "C:/Users/piotr/OneDrive/Pulpit/programowanie/Koło Łowieckie/data/polowania";

  if (socket.handshake.headers["subpage"] === "struktury") {
    async function getBuffer(filePath) {
      const isFile = await exists(filePath);
      if (!isFile) return "";
      return readFile(filePath);
    }

    async function send(file, fun) {
      const content = await readFile(struktury_dir + file, "utf8");

      if (!content) return;

      const json = JSON.parse(content);
      const img_path = struktury_dir + json.numer;

      const buf1 = await getBuffer(`${img_path}.jpg`);
      const buf2 = await getBuffer(`${img_path}.png`);

      const data = {
        number: json.numer,
        image: buf1 || buf2,
        buffer: (buf1 || buf2).toString("base64"),
        rodzaj: json.rodzaj,
        polowanie: json.polowanie,
      };

      fun(data);
      //socket.emit("struktura", data);
    }

    async function files(fun) {
      try {
        const files = fs.readdirSync(struktury_dir);

        files.forEach(async (file) => {
          if (file.split(".").pop() === "json") {
            await fun(file);
          }
        });
      } catch (err) {
        console.log(err);
      }
    }

    files(function (file) {
      send(file, function (data) {
        socket.emit("struktura", data);
      });
    });

    socket.on("search", function (data) {

      function another(multiple) {
        if (data.val == "n") {
          if (multiple) {
            files(function (file) {
              send(file, function (data) {
                if (data.numer == "") {
                  socket.emit("struktura", data);
                }
              });
            });
          }
          if (!multiple) {
            send(file, function (data) {
              if (data.numer == "") {
                socket.emit("struktura", data);
              }
            });
          }
          return;
        }
        if (data.val == "") {
          if (multiple) {
            files(function (file) {
              send(file, function (data) {
                socket.emit("struktura", data);
              });
            });
          }
          if (!multiple) {
            send(file, function (data) {
              socket.emit("struktura", data);
            });
          }
        }
      }

      for (let i = 1; i < 4; i++) {
        const element = data.rodzaj[i - 1];

        if (element) {
          files(async function (file) {
            const content = await readFile(struktury_dir + file, "utf8");
            const json = JSON.parse(content);
            if (json.rodzaj == i) {
              another(false);

              if (data.val == json.numer) {
                send(file, function (data) {
                  socket.emit("struktura", data);
                });
              }
            }
          });
          return;
        }
      }

      //console.log(data.rodzaj)

      another(true);

      file = data.val + ".json";
      if (!fs.existsSync(struktury_dir + file)) return;

      send(file, function (data) {
        socket.emit("struktura", data);
      });
    });
  }

  if (socket.handshake.headers["subpage"] === "admin") {
    logged = false;

    socket.on("login", function (data) {
      if (data == "ambony11") {
        logged = true;
        const files = fs.readdirSync(polowania_dir);

        socket.emit("Authenticated", files);
      }
    });

    socket.on("add_struktura", function (data) {
      console.log("s");

      nazwa = data.numer;
      numer = data.numer;
      if (nazwa == "") {
        last = fs.readFileSync(`${data_dir}last.txt`);
        nazwa = parseInt(last + 1);
        nazwa = nazwa.toString() + "n";
      }

      if (data.numer == "") numer = "bez numeru";

      jsonString = {
        numer: numer,
        rodzaj: data.rodzaj,
        polowanie: data.polowanie,
      };

      console.log(jsonString);

      fs.appendFileSync(
        `${struktury_dir}${nazwa}.json`,
        JSON.stringify(jsonString)
      );
      fs.appendFileSync(`${struktury_dir}${nazwa}.jpgs`, data.img);
    });

    setTimeout(() => {s
      if (!logged) {
        socket.disconnect(true);
        socket.client._remove(socket.id);
      }
    }, 10 * 1000);
  }
});

port = 80 || process.env.port;

ip = "192.168.1.106";

server.listen(port, ip, () => {
  console.log(`Listening on ${ip}:${port}`);
});
