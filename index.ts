declare function require(path: string): any


import { createServer } from "http"
import ViewRouter from "./routes"
import config from "config"

const app = require("express")()
const server = createServer(app)
const io = require("socket.io")(server, {
    cors: {
        origin: "*"
    },
    maxHttpBufferSize: config.get("MaxBufferSize"),
});

// adding event listeners 
require("./EventHandlers/Events")(io)
app.use("/", ViewRouter)

const PORT = process.env.PORT || 3000;


server.listen(PORT, () => console.log("Listening on port #4000"))