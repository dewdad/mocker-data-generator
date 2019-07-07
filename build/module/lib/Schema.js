import * as tslib_1 from "tslib";
import { Generator } from './Generator';
import { evalWithContextData, fieldArrayCalcLength, iamLastParent, isArray, isConditional, isObject } from './utils';
var iterate = function (obj, res, currentPath) {
    var _this = this;
    if (!currentPath) {
        currentPath = [];
    }
    Object.keys(obj).map(function (k) {
        var value = obj[k];
        var path = currentPath.slice(0);
        path.push(k);
        if (iamLastParent(value)) {
            if (path) {
                if (isArray(value)) {
                    if (value[0] && value[0].virtual) {
                        _this.virtualPaths.push(path.toString());
                    }
                }
                else {
                    if (value.virtual) {
                        _this.virtualPaths.push(path.toString());
                    }
                }
            }
            var key = '';
            if (!isConditional(k)) {
                key = k;
            }
            else {
                var keykey = k.split(',');
                if (evalWithContextData(keykey[0], _this.object)) {
                    key = keykey[1];
                }
            }
            if (key !== '') {
                res[key] = _this.proccessLeaf(value);
            }
        }
        else {
            res[k] = {};
            iterate.call(_this, value, res[k], path);
        }
    });
};
var Schema = /** @class */ (function (_super) {
    tslib_1.__extends(Schema, _super);
    function Schema(name, cfg, options) {
        var _this = _super.call(this) || this;
        _this.schema = cfg;
        _this.name = name;
        _this.options = options;
        // Temp fields
        _this.DB = {};
        _this.object = {};
        _this.virtualPaths = [];
        return _this;
    }
    Schema.prototype.proccessLeaf = function (field) {
        var _this = this;
        if (isArray(field)) {
            var fieldConfig_1 = field[0];
            if (field.length > 1) {
                fieldConfig_1 = { values: field };
            }
            var na = Array();
            if (fieldConfig_1.concat) {
                na = evalWithContextData(fieldConfig_1.concat, this.object, this.DB);
                // Strict Mode
                na = fieldConfig_1.concatStrict
                    ? Array.from(new Set(na)).slice() : na;
            }
            var length_1 = fieldArrayCalcLength(fieldConfig_1, na.length, this);
            var array = Array.from(new Array(length_1)).reduce(function (acc, el, index) {
                var self = acc.slice(0);
                acc.push(_this.generateField(fieldConfig_1, index, length_1, self));
                return acc;
            }, []);
            return array.concat(na);
        }
        else {
            return this.generateField(field);
        }
    };
    Schema.prototype.generateField = function (cfg) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var result = {};
        var generators = [
            'faker',
            'chance',
            'casual',
            'randexp',
            'self',
            'db',
            'hasOne',
            'hasMany',
            'static',
            'function',
            'values',
            'incrementalId'
        ];
        var keys = Object.keys(cfg);
        var key = keys.reduce(function (acc, val) {
            if (generators.includes(val)) {
                acc = val;
            }
            return acc;
        }, 'noKey');
        if (key === 'noKey' && !keys.includes('eval')) {
            throw "Error: Cant find key, please check model and use one of this [" + generators.join(',') + "]";
        }
        if (keys.includes('eval') && keys.length === 1) {
            key = 'eval';
        }
        try {
            result = this[key].apply(this, [cfg].concat(args));
        }
        catch (e) {
            throw 'Error: "' + key + '" ' + e;
        }
        return result;
    };
    Schema.prototype.buildSingle = function (schema) {
        if (iamLastParent(schema)) {
            this.object = this.proccessLeaf(schema);
        }
        else {
            iterate.call(this, schema, this.object);
        }
    };
    Schema.prototype.build = function (db) {
        var _this = this;
        if (db === void 0) { db = {}; }
        this.object = {};
        this.DB = db ? db : {};
        this.DB[this.name] = [];
        if (Number.isInteger(this.options)) {
            Array.from(new Array(this.options)).map(function () {
                _this.buildSingle(_this.schema);
                _this.DB[_this.name].push(_this.object);
                _this.object = {};
            });
        }
        else if (isObject(this.options) && this.options.max) {
            var max = this.options.max;
            var min = this.options.min ? this.options.min : 0;
            var length = Math.floor(Math.random() * (max - min + 1) + min);
            Array.from(new Array(length)).map(function () {
                _this.buildSingle(_this.schema);
                _this.DB[_this.name].push(_this.object);
                _this.object = {};
            });
        }
        else if (isObject(this.options) && this.options.uniqueField) {
            var f_1 = this.options.uniqueField;
            var entityConfig_1 = this.schema;
            var possibleValues = void 0;
            if (f_1 === '.') {
                possibleValues = this.schema.values;
            }
            else {
                if (this.schema[f_1]) {
                    if (isArray(this.schema[f_1].values)) {
                        possibleValues = this.schema[f_1].values;
                    }
                    else {
                        possibleValues = this.schema[f_1];
                    }
                }
                else {
                    throw "The field \"" + f_1 + "\" not exists.";
                }
            }
            if (!isArray(possibleValues)) {
                throw "The posible values value is not an Array";
            }
            possibleValues.map(function (value) {
                if (f_1 === '.') {
                    return;
                }
                entityConfig_1[f_1] = { static: value };
                _this.buildSingle(entityConfig_1);
                _this.DB[_this.name].push(_this.object);
                _this.object = {};
            });
        }
        else {
            throw "An string \"" + this.options + "\" is not recognized as a parameter.";
        }
        return this.DB[this.name];
    };
    return Schema;
}(Generator));
export { Schema };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9TY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUE7QUFDdkMsT0FBTyxFQUNILG1CQUFtQixFQUNuQixvQkFBb0IsRUFDcEIsYUFBYSxFQUNiLE9BQU8sRUFDUCxhQUFhLEVBQ2IsUUFBUSxFQUNYLE1BQU0sU0FBUyxDQUFBO0FBRWhCLElBQUksT0FBTyxHQUFHLFVBQVMsR0FBRyxFQUFFLEdBQUcsRUFBRSxXQUFXO0lBQTlCLGlCQTBDYjtJQXpDRyxJQUFJLENBQUMsV0FBVyxFQUFFO1FBQ2QsV0FBVyxHQUFHLEVBQUUsQ0FBQTtLQUNuQjtJQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQztRQUNsQixJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFFbEIsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBRVosSUFBSSxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdEIsSUFBSSxJQUFJLEVBQUU7Z0JBQ04sSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ2hCLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUU7d0JBQzlCLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO3FCQUMxQztpQkFDSjtxQkFBTTtvQkFDSCxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUU7d0JBQ2YsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFD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