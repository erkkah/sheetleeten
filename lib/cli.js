"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.cli = void 0;
var arg_1 = __importDefault(require("arg"));
var inquirer_1 = __importDefault(require("inquirer"));
var twisters_1 = require("twisters");
var copy_1 = require("./copy");
var operations_1 = require("./operations");
var cat = "🐈";
var plug = "🔌";
var lorry = "🚚";
var success = "✔️";
var failure = "✖️";
var shrug = "🤷";
var horns = "🤘";
function cli(args) {
    return __awaiter(this, void 0, void 0, function () {
        var options, twisters, err_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = parseArguments(args);
                    return [4 /*yield*/, fillInMissing(options)];
                case 1:
                    options = _a.sent();
                    twisters = new twisters_1.Twisters();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 8, , 9]);
                    return [4 /*yield*/, progressRun(twisters, "copy", cat + " Copying", function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, copy_1.copyFiles(options.target)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 3:
                    _a.sent();
                    if (!options.git) return [3 /*break*/, 5];
                    return [4 /*yield*/, progressRun(twisters, "git", plug + " Creating git repo", function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, operations_1.initGit(options.target)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    if (!options.install) return [3 /*break*/, 7];
                    return [4 /*yield*/, progressRun(twisters, "npm", lorry + " Installing dependencies", function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, operations_1.installDeps(options.target)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    err_1 = _a.sent();
                    twisters.log("summary", {
                        text: shrug + " Sheetleeten site creation failed"
                    });
                    return [2 /*return*/];
                case 9:
                    twisters.log("summary", {
                        text: horns + " Sheetleeten site creation succeeded!"
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.cli = cli;
function progressRun(tw, id, operation, action) {
    return __awaiter(this, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tw.put(id, {
                        text: operation
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, action()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    tw.log(id, {
                        text: operation + ": " + err_2.message + " " + failure
                    });
                    throw err_2;
                case 4:
                    tw.log(id, {
                        text: operation + " " + success,
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function parseArguments(args) {
    var _a, _b;
    var parsed = arg_1.default({
        "--help": Boolean,
        "--git": Boolean,
        "--install": Boolean,
        "--noprompt": Boolean,
    }, {
        argv: args.slice(2),
    });
    var _c = parsed["_"], cmd = _c[0], target = _c[1];
    if (!target || cmd != "create" || parsed["--help"]) {
        usage();
    }
    var noprompt = parsed["--noprompt"];
    return {
        cmd: cmd,
        target: target,
        git: ((_a = parsed["--git"]) !== null && _a !== void 0 ? _a : noprompt) ? true : undefined,
        install: ((_b = parsed["--install"]) !== null && _b !== void 0 ? _b : noprompt) ? true : undefined,
    };
}
function usage() {
    console.log("\nUsage: sheetleeten [options] create <target directory>\n\nOptions:\n--help      -   This is it\n--git       -   Initialize git repo\n--install   -   Install npm requirements\n--noprompt  -   Don't ask questions\n");
    process.exit(1);
}
function fillInMissing(options) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var questions, answers;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    questions = [];
                    if (options.git === undefined) {
                        questions.push({
                            type: "confirm",
                            name: "git",
                            message: "Initialize git repository?",
                            default: false,
                        });
                    }
                    if (options.install === undefined) {
                        questions.push({
                            type: "confirm",
                            name: "install",
                            message: "Install npm dependencies?",
                            default: false,
                        });
                    }
                    return [4 /*yield*/, inquirer_1.default.prompt(questions)];
                case 1:
                    answers = _c.sent();
                    return [2 /*return*/, __assign(__assign({}, options), { git: (_a = options.git) !== null && _a !== void 0 ? _a : answers.git, install: (_b = options.install) !== null && _b !== void 0 ? _b : answers.install })];
            }
        });
    });
}
