"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var AddEvents = function (io) {
    var GenerateJoinCode = function () {
        var length = 6;
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };
    // ts-ignore
    var rooms = {};
    io.on("connection", function (socket) {
        // @ts-ignore
        socket._rooms = [];
        // -------------------------------------- ROOM JOIN / LEAVE LISTENERS -------------------------------------- 
        socket.on("join-room", function (code, name) {
            if (!code)
                return;
            socket.join(code);
            socket._name = name;
            socket._rooms.push(code);
            console.log("Socket: " + socket.id + " joined " + code);
            socket.emit("room-joined", code, name, false);
        });
        socket.on("create-room", function (name) {
            var code = GenerateJoinCode();
            socket.join(code);
            socket._name = name;
            socket._rooms.push(code);
            rooms[code] = { files: [], admin: socket.id, usersCanEdit: false };
            socket.emit("room-joined", code, name, true);
        });
        socket.on("disconnect", function () {
            for (var _i = 0, _a = socket._rooms; _i < _a.length; _i++) {
                var room = _a[_i];
                if (rooms[room] && rooms[room].admin == socket.id) {
                    console.log("Admin has left " + room);
                    socket.to(room).emit("room-closed");
                    rooms[room] = null;
                }
            }
        });
        // -------------------------------------- CANVAS LISTENERS -------------------------------------- 
        // socket.on("canvas-edited", (x1,y1,x2,y2, room) => {
        //     socket.to(room).emit("canvas-update", x1,y1,x2,y2)
        // })
        socket.on("canvas-image-edited", function (blob, room) {
            socket.to(room).emit("canvas-image-update", blob);
        });
        socket.on("canvas-cleared", function (room) {
            if (socket.id === rooms[room].admin) {
                socket.to(room).emit("canvas-cleared");
            }
        });
        // -------------------------------------- FILE UPLOAD LISTENERS -------------------------------------- 
        socket.on("file-upload", function (file, name, type, room) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                socket.to(room).emit("files-uploaded", file, name, type);
                return [2 /*return*/];
            });
        }); });
        // -------------------------------------- CHAT LISTENERS -------------------------------------- 
        socket.on("new-chat", function (message, name, room) {
            socket.to(room).emit("chat-recieved", { name: name, message: message, isOwn: false });
        });
    });
};
module.exports = AddEvents;
