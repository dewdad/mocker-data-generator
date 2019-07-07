"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// import * as c from 'casual-browserify'
var chance_1 = require("chance");
var f = require("faker");
var R = require("randexp");
var utils_1 = require("./utils");
var c = require('casual-browserify');
var ch = new chance_1.Chance();
var Generator = /** @class */ (function () {
    function Generator() {
    }
    Generator.prototype.faker = function (cfg) {
        var faker = f;
        var db = this.DB;
        var object = this.object;
        var re;
        var matches;
        var strFn;
        if (cfg.locale === '') {
            throw "Locale is empty \"" + cfg.locale + "\".";
        }
        if (cfg.locale) {
            var supportedLocales = Object.keys(faker.locales);
            if (supportedLocales.indexOf(cfg.locale) === -1) {
                throw "Locale \"" + cfg.locale + "\" is not supported by faker.";
            }
            faker = require('faker/locale/' + cfg.locale);
        }
        if (cfg.eval) {
            re = /(^[a-zA-Z.]*)/; // aZ.aZ
            matches = re.exec(cfg.faker);
            if (matches && matches.length === 2) {
                strFn = 'faker.' + cfg.faker;
            }
            re = /\((.*?)\)/; // Match ()
            matches = re.exec(cfg.faker);
            if (!matches) {
                strFn = 'faker.' + cfg.faker + '()';
            }
            return eval(strFn);
        }
        else {
            return utils_1.fnParser('faker', faker, cfg.faker);
        }
    };
    Generator.prototype.chance = function (cfg) {
        var chance = ch;
        if (cfg.eval) {
            var db = this.DB;
            var object = this.object;
            var re = /(^[a-zA-Z.]*)/; // aZ.aZ
            var matches = re.exec(cfg.chance);
            var strFn = void 0;
            if (matches && matches.length === 2) {
                strFn = 'chance.' + cfg.chance;
            }
            re = /\((.*?)\)/; // Match ()
            matches = re.exec(cfg.chance);
            if (!matches) {
                strFn = 'chance.' + cfg.chance + '()';
            }
            return eval(strFn);
        }
        else {
            return utils_1.fnParser.call(chance, 'chance', chance, cfg.chance);
        }
    };
    Generator.prototype.casual = function (cfg) {
        var casual = c;
        if (cfg.eval) {
            var re = /(^[a-zA-Z.]*)/; // aZ.aZ
            var matches = re.exec(cfg.casual);
            var strFn = void 0;
            if (matches && matches.length === 2) {
                strFn = 'casual.' + cfg.casual;
            }
            return eval(strFn);
        }
        else {
            return utils_1.fnParser.call(casual, 'casual', casual, cfg.casual);
        }
    };
    Generator.prototype.randexp = function (cfg) {
        return new R(cfg.randexp).gen();
    };
    Generator.prototype.self = function (cfg) {
        var object = this.object;
        return cfg.eval
            ? eval('object.' + cfg.self)
            : utils_1.loopInside(this.object, cfg.self);
    };
    Generator.prototype.db = function (cfg) {
        var db = this.DB;
        if (cfg.eval) {
            return eval('db.' + cfg.db);
        }
        else {
            return utils_1.loopInside(this.DB, cfg.db);
        }
    };
    Generator.prototype.eval = function (cfg) {
        var db = this.DB;
        var object = this.object;
        var faker = f;
        var chance = ch;
        var casual = c;
        var randexp = R;
        return eval(cfg.eval);
    };
    Generator.prototype.values = function (cfg) {
        var i = Math.floor(cfg.values.length * Math.random());
        return cfg.values[i];
    };
    Generator.prototype.function = function (cfg) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _a;
        var object = this.object;
        var db = this.DB;
        var faker = f;
        var chance = ch;
        var casual = c;
        var randexp = R;
        return (_a = cfg.function).call.apply(_a, [{ object: object, db: db, faker: faker, chance: chance, casual: casual, randexp: randexp }].concat(args));
    };
    Generator.prototype.static = function (cfg) {
        return cfg.static;
    };
    Generator.prototype.incrementalId = function (cfg) {
        var n = 0;
        var db = this.DB;
        if (db[this.name] && db[this.name].length) {
            n = db[this.name].length;
        }
        if (cfg.incrementalId === true) {
            cfg.incrementalId = '0';
        }
        return n + parseInt(cfg.incrementalId, 10);
    };
    Generator.prototype.hasOne = function (cfg) {
        var db = this.DB;
        var entity = null;
        if (cfg.uniqueDB) {
            var dbString = JSON.stringify(cfg.uniqueDB);
            for (var i = 0; i < db[cfg.hasOne].length; i++) {
                var element = db[cfg.hasOne][i];
                element = cfg.get
                    ? cfg.eval
                        ? eval('element.' + cfg.get)
                        : utils_1.loopInside(element, cfg.get)
                    : element;
                if (cfg.uniqueDB.length === 0 ||
                    dbString.indexOf(JSON.stringify(element)) < 0) {
                    entity = element;
                    break;
                }
            }
            if (entity === null) {
                throw "Can\u00B4t get unique data. Source \"" + cfg.hasOne + "\" has not enough data";
            }
        }
        else {
            var i = Math.floor(db[cfg.hasOne].length * Math.random());
            entity = db[cfg.hasOne][i];
            entity = cfg.get
                ? cfg.eval
                    ? eval('entity.' + cfg.get)
                    : utils_1.loopInside(entity, cfg.get)
                : entity;
        }
        return entity;
    };
    Generator.prototype.hasMany = function (cfg) {
        var _this = this;
        var amount = 1;
        var db = this.DB;
        var min = cfg.min || cfg.min === 0 ? cfg.min : 1;
        var max = cfg.max ? cfg.max : cfg.hasMany ? db[cfg.hasMany].length : 1;
        if (cfg.amount) {
            amount = cfg.amount;
        }
        else {
            amount = Math.floor(Math.random() * (max - min + 1)) + min;
        }
        var newCfg = {
            hasOne: cfg.hasMany,
            get: cfg.get ? cfg.get : undefined,
            eval: cfg.eval ? true : false
        };
        return cfg.unique
            ? Array.from(new Array(amount)).reduce(function (acc, val) { return acc.concat([
                _this.hasOne(tslib_1.__assign({}, newCfg, { uniqueDB: acc }))
            ]); }, [])
            : Array.from(new Array(amount)).map(function () { return _this.hasOne(newCfg); });
    };
    return Generator;
}());
exports.Generator = Generator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9HZW5lcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUNBQXlDO0FBQ3pDLGlDQUErQjtBQUMvQix5QkFBMEI7QUFDMUIsMkJBQTRCO0FBQzVCLGlDQUE4QztBQUM5QyxJQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtBQUN0QyxJQUFNLEVBQUUsR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFBO0FBRXZCO0lBQUE7SUEwUEEsQ0FBQztJQTVPRyx5QkFBSyxHQUFMLFVBQU0sR0FBdUQ7UUFDekQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFBO1FBQ2IsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQTtRQUNoQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFBO1FBQ3hCLElBQUksRUFBRSxDQUFBO1FBQ04sSUFBSSxPQUFPLENBQUE7UUFDWCxJQUFJLEtBQUssQ0FBQTtRQUVULElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxFQUFFLEVBQUU7WUFDbkIsTUFBTSx1QkFBb0IsR0FBRyxDQUFDLE1BQU0sUUFBSSxDQUFBO1NBQzNDO1FBRUQsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFO1lBQ1osSUFBSSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFFLEtBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUMxRCxJQUFJLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQzdDLE1BQU0sY0FBVyxHQUFHLENBQUMsTUFBTSxrQ0FBOEIsQ0FBQTthQUM1RDtZQUVELEtBQUssR0FBRyxPQUFPLENBQUMsZUFBZSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtTQUNoRDtRQUVELElBQUksR0FBRyxDQUFDLElBQUksRUFB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