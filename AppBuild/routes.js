"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var path = __importStar(require("path"));
var router = express.Router();
router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/build/index.html"));
});
router.get("/:filename", function (req, res) {
    res.sendFile(path.join(__dirname, "/build/", req.params.filename));
});
router.get("/static/js/:filename", function (req, res) {
    res.sendFile(path.join(__dirname, "/build/static/js/", req.params.filename));
});
router.get("/static/css/:filename", function (req, res) {
    res.sendFile(path.join(__dirname, "/build/static/css/", req.params.filename));
});
exports.default = router;
