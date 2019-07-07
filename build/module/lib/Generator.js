import * as tslib_1 from "tslib";
// import * as c from 'casual-browserify'
import { Chance } from 'chance';
import * as f from 'faker';
import * as R from 'randexp';
import { fnParser, loopInside } from './utils';
var c = require('casual-browserify');
var ch = new Chance();
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
            return fnParser('faker', faker, cfg.faker);
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
            return fnParser.call(chance, 'chance', chance, cfg.chance);
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
            return fnParser.call(casual, 'casual', casual, cfg.casual);
        }
    };
    Generator.prototype.randexp = function (cfg) {
        return new R(cfg.randexp).gen();
    };
    Generator.prototype.self = function (cfg) {
        var object = this.object;
        return cfg.eval
            ? eval('object.' + cfg.self)
            : loopInside(this.object, cfg.self);
    };
    Generator.prototype.db = function (cfg) {
        var db = this.DB;
        if (cfg.eval) {
            return eval('db.' + cfg.db);
        }
        else {
            return loopInside(this.DB, cfg.db);
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
                        : loopInside(element, cfg.get)
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
                    : loopInside(entity, cfg.get)
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
export { Generator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9HZW5lcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHlDQUF5QztBQUN6QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBQy9CLE9BQU8sS0FBSyxDQUFDLE1BQU0sT0FBTyxDQUFBO0FBQzFCLE9BQU8sS0FBSyxDQUFDLE1BQU0sU0FBUyxDQUFBO0FBQzVCLE9BQU8sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLE1BQU0sU0FBUyxDQUFBO0FBQzlDLElBQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO0FBQ3RDLElBQU0sRUFBRSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUE7QUFFdkI7SUFBQTtJQTBQQSxDQUFDO0lBNU9HLHlCQUFLLEdBQUwsVUFBTSxHQUF1RDtRQUN6RCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUE7UUFDYixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFBO1FBQ2hCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUE7UUFDeEIsSUFBSSxFQUFFLENBQUE7UUFDTixJQUFJLE9BQU8sQ0FBQTtRQUNYLElBQUksS0FBSyxDQUFBO1FBRVQsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLEVBQUUsRUFBRTtZQUNuQixNQUFNLHVCQUFvQixHQUFHLENBQUMsTUFBTSxRQUFJLENBQUE7U0FDM0M7UUFFRCxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUU7WUFDWixJQUFJLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUUsS0FBYSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQzFELElBQUksZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDN0MsTUFBTSxjQUFXLEdBQUcsQ0FBQyxNQUFNLGtD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