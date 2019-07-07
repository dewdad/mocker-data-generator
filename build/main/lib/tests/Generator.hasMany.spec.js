"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var __1 = require("../../");
var gen = new __1.Generator();
ava_1.test('Should get many from the DB with max', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var data, res;
    return tslib_1.__generator(this, function (_a) {
        data = Array.from(new Array(10)).map(function (el, i) { return ({ id: i }); });
        gen.DB = { hello: data };
        res = gen.hasMany({
            hasMany: 'hello',
            max: 2
        });
        res.forEach(function (r) { return t.true(data.indexOf(r) > -1); });
        t.true(res.length <= 2);
        t.true(res.length >= 1);
        return [2 /*return*/];
    });
}); });
ava_1.test('Should get many from the DB with min', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var data, res;
    return tslib_1.__generator(this, function (_a) {
        data = Array.from(new Array(10)).map(function (el, i) { return ({ id: i }); });
        gen.DB = { hello: data };
        res = gen.hasMany({
            hasMany: 'hello',
            max: 10,
            min: 4
        });
        res.forEach(function (r) { return t.true(data.indexOf(r) > -1); });
        t.true(res.length <= 10);
        t.true(res.length >= 4);
        return [2 /*return*/];
    });
}); });
ava_1.test('Should get many from the DB with min = 0', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var data, res;
    return tslib_1.__generator(this, function (_a) {
        data = Array.from(new Array(10)).map(function (el, i) { return ({ id: i }); });
        gen.DB = { hello: data };
        res = gen.hasMany({
            hasMany: 'hello',
            max: 1,
            min: 0
        });
        res.forEach(function (r) { return t.true(data.indexOf(r) > -1); });
        t.true(res.length <= 1);
        t.true(res.length >= 0);
        return [2 /*return*/];
    });
}); });
ava_1.test('Should get many from the DB with fixed amount', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var data, res;
    return tslib_1.__generator(this, function (_a) {
        data = Array.from(new Array(10)).map(function (el, i) { return ({ id: i }); });
        gen.DB = { hello: data };
        res = gen.hasMany({
            hasMany: 'hello',
            amount: 5
        });
        res.forEach(function (r) { return t.true(data.indexOf(r) > -1); });
        t.true(res.length === 5);
        return [2 /*return*/];
    });
}); });
ava_1.test('Should get many from the DB, and one field of each entity', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var data, res;
    return tslib_1.__generator(this, function (_a) {
        data = Array.from(new Array(10)).map(function (el, i) { return ({ id: i }); });
        gen.DB = { hello: data };
        res = gen.hasMany({
            hasMany: 'hello',
            get: 'id',
            amount: 1
        });
        t.true(typeof res[0] === 'number');
        return [2 /*return*/];
    });
}); });
ava_1.test('Should get many from the DB, unique', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var data, res;
    return tslib_1.__generator(this, function (_a) {
        data = Array.from(new Array(2)).map(function (el, i) { return ({ id: i }); });
        gen.DB = { hello: data };
        res = gen.hasMany({
            hasMany: 'hello',
            get: 'id',
            amount: 2,
            unique: true
        });
        t.deepEqual(res, [0, 1]);
        return [2 /*return*/];
    });
}); });
ava_1.test('Should throw an error, not enough unique data', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var data, res;
    return tslib_1.__generator(this, function (_a) {
        data = Array.from(new Array(2)).map(function (el, i) { return ({ id: i }); });
        gen.DB = { hello: data };
        try {
            res = gen.hasMany({
                hasMany: 'hello',
                get: 'id',
                amount: 3,
                unique: true
            });
        }
        catch (e) {
            t.deepEqual(e, 'Can´t get unique data. Source "hello" has not enough data');
        }
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdG9yLmhhc01hbnkuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvdGVzdHMvR2VuZXJhdG9yLmhhc01hbnkuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUJBMkdBOzs7QUEzR0EsMkJBQTBCO0FBQzFCLDRCQUFrQztBQUVsQyxJQUFNLEdBQUcsR0FBRyxJQUFJLGFBQVMsRUFBRSxDQUFBO0FBRTNCLFVBQUksQ0FBQyxzQ0FBc0MsRUFBRSxVQUFNLENBQUM7OztRQUM1QyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEVBQUUsRUFBRSxDQUFDLElBQUssT0FBQSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQVgsQ0FBVyxDQUFDLENBQUE7UUFDaEUsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQTtRQUVwQixHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQztZQUNsQixPQUFPLEVBQUUsT0FBTztZQUNoQixHQUFHLEVBQUUsQ0FBQztTQUNULENBQUMsQ0FBQTtRQUVGLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBbkMsQ0FBbUMsQ0FBQyxDQUFBO1FBQ3JELENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQTtRQUN2QixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUE7OztLQUMxQixDQUFDLENBQUE7QUFFRixVQUFJLENBQUMsc0NBQXNDLEVBQUUsVUFBTSxD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