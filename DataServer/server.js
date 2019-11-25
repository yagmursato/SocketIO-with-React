/*
Socket.Io kullanımı için socketIo modülü kullanılıyor.
Web server ve http özellikleri içinse epxress ve http modülleri.
*/

const http = require("http");
const express = require("express");
const socketIo = require("socket.io");

const app = express();
const appServer = http.createServer(app);
const channel = socketIo(appServer);

const port = process.env.PORT || 5555;

channel.on("connection", socket => {
  console.log(
    `${Date(Date.now()).toLocaleString()}: yeni bir istemci bağlandı`
  );

  socket.on("input road", data => {
    for (var i = 0; i < data.length; i++) {
      console.log(data[i]);
    }
    socket.broadcast.emit("output road", { anadata: data }); // callback
  });

  socket.on("disconnect", () => {
    console.log(
      `${Date(Date.now()).toLocaleString()}istemci bağlantıyı kapattı`
    );
  });
});

appServer.listen(port, () => {
  console.log(
    `${Date(
      Date.now()
    ).toLocaleString()}: Sunucu ${port} nolu port üzerinden aktif konumda.`
  );
});
