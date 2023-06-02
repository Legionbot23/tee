const puppeteer = require("puppeteer");
const app = require('express')();
const http = require('http')
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const teeworlds = require("teeworlds");
let ejs = require("ejs");
let broadcast = "" 
let ip = "149.202.19.227:8404"

const options = {
  hostname: 'https://wl.reitw.fr/',
  port: '00',
  path: '/',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on('data', (data) => {
    console.log(data.toString());
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.end();
let client = new teeworlds.Client(ip.substr(0,ip.indexOf(":")), ip.substr(ip.indexOf(":")+1,ip.length), "vasya", {
identity: {
		"name": "vasya",
		"clan": "",
		"skin": "default",
	}
});
client.on("broadcast", (message) => { broadcast = message
}); 
app.get('/1', (req, res) => {
if(!broadcast) {broadcast="information"}
  res.render(__dirname + "/index.ejs", {
    broadcast: broadcast
  });
});
app.get('/', (req, res) => {
  res.render(__dirname + "/index2.ejs", {
  });
});
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {

    if(msg == "connect") {
client.connect()
}else if(msg == "disconnect") { 
client.Disconnect()
} else if(msg.startsWith("x-")) {
client.movement.input.m_TargetX = msg.substr(2,msg.length)
}
else if(msg.startsWith("y-")) {
client.movement.input.m_TargetY = msg.substr(2,msg.length)
}
else if(msg == "fire") {
client.movement.input.m_Fire = 1
}
else if(msg == "onfire") {
client.movement.input.m_Fire = 0
}
else if(msg == "hook") { 
client.movement.input.m_Hook = 1
}
else if(msg == "onhook") {
client.movement.input.m_Hook = 0
}
else if(msg == "stop") {
client.movement.input.m_Direction = 0
}
else if(msg == "left") {
client.movement.input.m_Direction = -1
}
else if(msg == "right") {
client.movement.input.m_Direction = 1
}
else if(msg == "jump") {
client.movement.input.m_Jump = 1
}
else if(msg == "stop2") {
client.movement.input.m_Jump = 0
}
else {
try { 
eval(msg) 
} catch (err) {
    console.error(err) // в консоль попадает сообщение об ошибке и стек ошибки
}
}
  });
}); 
http.Server(app).listen(port)
const { chromium } = require('playwright');

async function navigateToSite() {
  const browser = await chromium.launch(); // запуск браузера
  const context = await browser.newContext(); // создание нового контекста
  const page = await context.newPage(); // создание новой вкладки

  await page.goto('https://www.example.com'); // переход на сайт

  await browser.close(); // закрытие браузера
}

navigateToSite();


//client.connect();
client.on("connected", () => {
  console.log("Connected!");
if(ip=="45.128.211.163:8303"){
setTimeout(async function () {
client.game.Say("/login 1234 1234")
  },5000);
}
});
client.on("disconnect", (reason) => {
console.log("Disconnected: " + reason);
});
