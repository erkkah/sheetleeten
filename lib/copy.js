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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyFiles = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var fs_2 = require("fs");
var mkdir = fs_2.promises.mkdir, readFile = fs_2.promises.readFile, writeFile = fs_2.promises.writeFile;
var ncp_1 = __importDefault(require("ncp"));
var util_1 = require("util");
var copy = util_1.promisify(ncp_1.default);
function copyFiles(target) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (fs_1.existsSync(target)) {
                        throw new Error("Target \"" + target + "\" already exists");
                    }
                    return [4 /*yield*/, mkdir(target, { recursive: true })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, createPackage(target)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, copy(path_1.join(__dirname, "..", "src"), path_1.join(target, "src"), {
                            clobber: false,
                            filter: function (path) { return !path.endsWith(".md"); },
                            stopOnErr: true,
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, copy(path_1.join(__dirname, "..", "cli", "template"), path_1.join(target, "src", "content"), {
                            clobber: false,
                            stopOnErr: true,
                        })];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.copyFiles = copyFiles;
function createPackage(target) {
    return __awaiter(this, void 0, void 0, function () {
        var now, year, packageTemplate, packageData;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    now = new Date();
                    year = now.getFullYear();
                    _a = {
                        name: path_1.basename(target),
                        version: "1.0.0",
                        browser: "src/index.html",
                        scripts: {
                            "serve": "parcel serve -d site --no-cache src/index.html",
                            "build": "parcel build -d site --no-cache src/index.html",
                        },
                        posthtml: {
                            plugins: {
                                "posthtml-expressions": {
                                    locals: {
                                        theme: "angel",
                                        title: "My Site",
                                        keywords: "",
                                        logo: false,
                                        tagline: "Sites like these...",
                                        copy: "&copy; " + year,
                                        email: {
                                            to: "",
                                            domain: "example",
                                            tld: "com"
                                        },
                                        mdi: true,
                                        code: {
                                            highlight: true,
                                            theme: "rainbow"
                                        }
                                    },
                                }
                            }
                        },
                        postcss: {
                            plugins: {
                                "postcss-simple-vars": {
                                    variables: {
                                        headline: "My Site"
                                    }
                                }
                            }
                        }
                    };
                    return [4 /*yield*/, extractDevDependencies()];
                case 1:
                    packageTemplate = (_a.devDependencies = _b.sent(),
                        _a);
                    packageData = JSON.stringify(packageTemplate, null, 2);
                    return [4 /*yield*/, writeFile(path_1.join(target, "package.json"), packageData)];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function extractDevDependencies() {
    return __awaiter(this, void 0, void 0, function () {
        var packageJSON, packageData, depList, versions, deps;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readFile(path_1.join(__dirname, "..", "package.json"))];
                case 1:
                    packageJSON = _a.sent();
                    packageData = JSON.parse(packageJSON.toString());
                    depList = [
                        "@babel/preset-env",
                        "markdown-it-highlightjs",
                        "parcel-bundler",
                        "parcel-plugin-markdown-it",
                        "parcel-plugin-static-files-copy",
                        "postcss-simple-vars",
                        "posthtml-expressions",
                        "typescript",
                    ];
                    versions = packageData.devDependencies;
                    deps = depList.reduce(function (map, dep) {
                        map[dep] = versions[dep];
                        return map;
                    }, {});
                    return [2 /*return*/, deps];
            }
        });
    });
}
