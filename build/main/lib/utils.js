"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.isArray = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
};
exports.isObject = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Object]';
};
exports.evalWithContextData = function (key, object, db) {
    // In this (way, we can pass object and use inside the eval string
    return eval(key);
};
exports.fieldArrayCalcLength = function (config, fixedArrayLength, schema) {
    var length;
    if (typeof config.length === 'function') {
        length = config.length.call(schema);
    }
    else if (config.fixedLength) {
        length = config.length - fixedArrayLength;
    }
    else {
        length = Math.floor(Math.random() * config.length + 1);
    }
    return length;
};
exports.iamLastChild = function (parent, k) {
    if (exports.isArray(parent[k])) {
        var last = false;
        if (parent[k].length === 0) {
            return true;
        }
        for (var i = 0; i < parent[k].length; i++) {
            var el = parent[k][i];
            last = !exports.isObject(el);
            if (last) {
                break;
            }
        }
        return last;
    }
    else {
        return !exports.isObject(parent[k]);
    }
};
exports.iamLastParent = function (obj) {
    var last = false;
    if (exports.isObject(obj)) {
        var ks = Object.keys(obj);
        for (var i = 0; i < ks.length; i++) {
            var k = ks[i];
            last = exports.iamLastChild(obj, k);
            if (!last) {
                break;
            }
        }
    }
    else {
        last = true;
    }
    return last;
};
exports.isConditional = function (str) {
    var arr = str.split(',');
    return arr.length > 1;
};
exports.cleanVirtuals = function (paths, object, options) {
    // clean specific paths
    var objectCleaner = function (path, obj, options) {
        var lvls, dest, i, field;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lvls = path.split(options.symbol);
                    dest = obj;
                    if (!lvls || lvls.length === 0) {
                        return [2 /*return*/];
                    }
                    if (!obj) {
                        return [2 /*return*/];
                    }
                    for (i = 0; i < lvls.length; i++) {
                        field = lvls[i];
                        if (i === lvls.length - 1 && dest[field]) {
                            if (Object.getOwnPropertyNames(dest[field]).length < 1) {
                                delete dest[field];
                                break;
                            }
                        }
                        else {
                            dest = dest[field];
                        }
                    }
                    lvls.pop();
                    if (!(lvls.length > 0)) return [3 /*break*/, 2];
                    return [5 /*yield**/, tslib_1.__values(objectCleaner(lvls.join(options.symbol), obj, options))];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2: return [2 /*return*/];
                case 3: return [2 /*return*/];
            }
        });
    };
    var forEachPath = function (path, object, options) {
        var lvls, dest, i, field;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lvls = path.split(options.symbol);
                    dest = object;
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < lvls.length)) return [3 /*break*/, 5];
                    field = lvls[i];
                    if (!(i === lvls.length - 1)) return [3 /*break*/, 3];
                    // delete specific path
                    delete dest[field];
                    // clean specific path
                    return [5 /*yield**/, tslib_1.__values(objectCleaner(path, object, options))];
                case 2:
                    // clean specific path
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    dest = dest[field];
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    };
    var forPaths = function (paths, object, options) {
        var i, path;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < paths.length)) return [3 /*break*/, 4];
                    path = paths[i];
                    return [5 /*yield**/, tslib_1.__values(Array.from(forEachPath(path, object, options)))];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    };
    for (var _i = 0, _a = Array.from(forPaths(paths, object, options)); _i < _a.length; _i++) {
        var res = _a[_i];
    }
    return object;
};
exports.fnParser = function (name, fn, cfg) {
    var _a = cfg.split('('), body = _a[0], args = _a[1];
    body = body.split('.');
    var func = body.reduce(function (acc, val) {
        if (!acc[val]) {
            throw "This " + name + " method doesnt exists '" + cfg + "'.";
        }
        return acc[val];
    }, fn);
    if (!args) {
        if (typeof func === 'function') {
            return func.call.apply(func, [this].concat(args));
        }
        else {
            return func;
        }
    }
    var _b = args.split(')'), args2 = _b[0], mods = _b[1];
    args = args2
        ? args2[0] === '{'
            ? [JSON.parse(args2)]
            : args2.split(',')
        : [];
    var result = func.call.apply(func, [this].concat(args));
    if (!mods || mods === '') {
        return result;
    }
    mods = mods
        .split('[')
        .filter(function (i) { return i !== ''; })
        .map(function (i) { return i.slice(0, -1); })
        .map(function (i) { return (i[0] === '"' ? i.slice(1, -1) : parseInt(i, 10)); });
    return mods.reduce(function (acc, val) {
        if (!acc[val]) {
            throw "'" + acc + "' doesnt have key '" + val + "'.";
        }
        return acc[val];
    }, result);
};
exports.loopInside = function (object, path) {
    var p = path.split('.');
    return p.reduce(function (acc, val) {
        if (acc[val] === null) {
            throw "'" + acc + "' doesnt have key '" + val + "'.";
        }
        return acc[val];
    }, object);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFhLFFBQUEsT0FBTyxHQUFHLFVBQVMsR0FBUTtJQUNwQyxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxnQkFBZ0IsQ0FBQTtBQUNuRSxDQUFDLENBQUE7QUFFWSxRQUFBLFFBQVEsR0FBRyxVQUFTLEdBQVE7SUFDckMsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssaUJBQWlCLENBQUE7QUFDcEUsQ0FBQyxDQUFBO0FBRVksUUFBQSxtQkFBbUIsR0FBRyxVQUFTLEdBQVcsRUFBRSxNQUFVLEVBQUUsRUFBRztJQUNwRSxrRUFBa0U7SUFDbEUsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDcEIsQ0FBQyxDQUFBO0FBRVksUUFBQSxvQkFBb0IsR0FBRyxVQUFTLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNO0lBQ3pFLElBQUksTUFBTSxDQUFBO0lBQ1YsSUFBSSxPQUFPLE1BQU0sQ0FBQyxNQUFNLEtBQUssVUFBVSxFQUFFO1FBQ3JDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtLQUN0QztTQUFNLElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRTtRQUMzQixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQTtLQUM1QztTQUFNO1FBQ0gsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7S0FDekQ7SUFDRCxPQUFPLE1BQU0sQ0FBQTtBQUNqQixDQUFDLENBQUE7QUFFWSxRQUFB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