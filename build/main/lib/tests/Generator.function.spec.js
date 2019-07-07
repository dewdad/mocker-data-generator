"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var __1 = require("../../");
var utils_1 = require("../utils");
var gen = new __1.Generator();
ava_1.test('Normal Function', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.function({
            function: function () {
                return 'test';
            }
        });
        t.true(typeof res === 'string');
        t.true(res === 'test');
        return [2 /*return*/];
    });
}); });
ava_1.test('ES6 Function', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        res = gen.function({
            function: function () { return 'test'; }
        });
        t.true(typeof res === 'string');
        t.true(res === 'test');
        return [2 /*return*/];
    });
}); });
ava_1.test('Should call function with context', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res, ctx;
    return tslib_1.__generator(this, function (_a) {
        res = gen.function({
            function: function () {
                return this;
            }
        });
        t.true(utils_1.isObject(res));
        ctx = ['object', 'db', 'faker', 'chance', 'casual', 'randexp'];
        t.true(utils_1.isObject(res));
        ctx.forEach(function (c) { return t.true(res.hasOwnProperty(c)); });
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdG9yLmZ1bmN0aW9uLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3Rlc3RzL0dlbmVyYXRvci5mdW5jdGlvbi5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQkFzQ0E7OztBQXRDQSwyQkFBMEI7QUFDMUIsNEJBQWtDO0FBQ2xDLGtDQUE0QztBQUU1QyxJQUFNLEdBQUcsR0FBRyxJQUFJLGFBQVMsRUFBRSxDQUFBO0FBRTNCLFVBQUksQ0FBQyxpQkFBaUIsRUFBRSxVQUFNLENBQUM7OztRQUN2QixHQUFHLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQztZQUNuQixRQUFRLEVBQUU7Z0JBQ04sT0FBTyxNQUFNLENBQUE7WUFDakIsQ0FBQztTQUNKLENBQUMsQ0FBQTtRQUVGLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFDLENBQUE7UUFDL0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssTUFBTSxDQUFDLENBQUE7OztLQUN6QixDQUFDLENBQUE7QUFFRixVQUFJLENBQUMsY0FBYyxFQUFFLFVBQU0sQ0FBQzs7O1FBQ3BCLEdBQUcsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDO1lBQ25CLFFBQVEsRUFBRSxjQUFNLE9BQUEsTUFBTSxFQUFOLENBQU07U0FDekIsQ0FBQyxDQUFBO1FBRUYsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxRQUFRLENBQUMsQ0FBQTtRQUMvQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxNQUFNLENBQUMsQ0FBQTs7O0tBQ3pCLENBQUMsQ0FBQTtBQUVGLFVBQUksQ0FBQyxtQ0FBbUMsRUFBRSxVQUFNLENBQUM7OztRQUN6QyxHQUFHLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQztZQUNuQixRQUFRLEVBQUU7Z0JBQ04sT0FBTyxJQUFJLENBQUE7WUFDZixDQUFDO1NBQ0osQ0FBQyxDQUFBO1FBRUYsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDakIsR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQTtRQUNsRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUNyQixHQUFHLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQTdCLENBQTZCLENBQUMsQ0FBQTs7O0tBQ2xELENBQUMsQ0FBQSJ9