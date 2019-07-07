import * as tslib_1 from "tslib";
export var isArray = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
};
export var isObject = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Object]';
};
export var evalWithContextData = function (key, object, db) {
    // In this (way, we can pass object and use inside the eval string
    return eval(key);
};
export var fieldArrayCalcLength = function (config, fixedArrayLength, schema) {
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
export var iamLastChild = function (parent, k) {
    if (isArray(parent[k])) {
        var last = false;
        if (parent[k].length === 0) {
            return true;
        }
        for (var i = 0; i < parent[k].length; i++) {
            var el = parent[k][i];
            last = !isObject(el);
            if (last) {
                break;
            }
        }
        return last;
    }
    else {
        return !isObject(parent[k]);
    }
};
export var iamLastParent = function (obj) {
    var last = false;
    if (isObject(obj)) {
        var ks = Object.keys(obj);
        for (var i = 0; i < ks.length; i++) {
            var k = ks[i];
            last = iamLastChild(obj, k);
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
export var isConditional = function (str) {
    var arr = str.split(',');
    return arr.length > 1;
};
export var cleanVirtuals = function (paths, object, options) {
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
export var fnParser = function (name, fn, cfg) {
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
export var loopInside = function (object, path) {
    var p = path.split('.');
    return p.reduce(function (acc, val) {
        if (acc[val] === null) {
            throw "'" + acc + "' doesnt have key '" + val + "'.";
        }
        return acc[val];
    }, object);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsSUFBTSxPQUFPLEdBQUcsVUFBUyxHQUFRO0lBQ3BDLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLGdCQUFnQixDQUFBO0FBQ25FLENBQUMsQ0FBQTtBQUVELE1BQU0sQ0FBQyxJQUFNLFFBQVEsR0FBRyxVQUFTLEdBQVE7SUFDckMsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssaUJBQWlCLENBQUE7QUFDcEUsQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLElBQU0sbUJBQW1CLEdBQUcsVUFBUyxHQUFXLEVBQUUsTUFBVSxFQUFFLEVBQUc7SUFDcEUsa0VBQWtFO0lBQ2xFLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ3BCLENBQUMsQ0FBQTtBQUVELE1BQU0sQ0FBQyxJQUFNLG9CQUFvQixHQUFHLFVBQVMsTUFBTSxFQUFFLGdCQUFnQixFQUFFLE1BQU07SUFDekUsSUFBSSxNQUFNLENBQUE7SUFDVixJQUFJLE9BQU8sTUFBTSxDQUFDLE1BQU0sS0FBSyxVQUFVLEVBQUU7UUFDckMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0tBQ3RDO1NBQU0sSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFO1FBQzNCLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFHLGdCQUFnQixDQUFBO0tBQzVDO1NBQU07UUFDSCxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQTtLQUN6RDtJQUNELE9B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