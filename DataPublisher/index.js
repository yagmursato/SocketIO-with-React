// soket sunucusuna bağlantı
// socket.io-client modülü
let socket = require("socket.io-client")("http://localhost:5555");
const fetch = require("node-fetch");

setInterval(function() {
  const host = "frankfurter.app";

  var anadata = [];
  fetch(`https://${host}/2019-10-21..?from=USD&to=TRY`)
    .then(resp => resp.json())
    .then(data => {
      console.log("datalength");
      console.log(Object.keys(data.rates).length);
      for (a in data.rates) {
        var dt = new Date(a);
        console.log(a);
        console.log(dt);
        anadata.push({ x: dt, y: data.rates[a].TRY });
      }
      console.log("Date");
      console.log(anadata);
      socket.emit("input road", anadata);
      console.log(`Anadata\n:${anadata}`);
    });
}, 5000);
