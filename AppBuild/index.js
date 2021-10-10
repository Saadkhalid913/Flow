"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var routes_1 = __importDefault(require("./routes"));
var config_1 = __importDefault(require("config"));
var app = require("express")();
var server = http_1.createServer(app);
var io = require("socket.io")(server, {
    cors: {
        origin: "*"
    },
    maxHttpBufferSize: config_1.default.get("MaxBufferSize"),
});
// adding event listeners 
require("./EventHandlers/Events")(io);
app.use("/", routes_1.default);
var PORT = process.env.PORT || 3000;
server.listen(PORT, function () { return console.log("Listening on port #4000"); });
