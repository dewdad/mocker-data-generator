"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var __1 = require("../../");
ava_1.test('Should return an new instance of mocker', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        t.deepEqual(__1.default(), new __1.Mocker());
        return [2 /*return*/];
    });
}); });
ava_1.test('Should iterate root level too with fields in models', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var length, expectedResult, user, db;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                length = 1;
                expectedResult = { user: ['firstName'] };
                user = { static: 'firstName' };
                return [4 /*yield*/, __1.default()
                        .schema('user', user, length)
                        .build()];
            case 1:
                db = _a.sent();
                t.deepEqual(db, expectedResult);
                return [2 /*return*/];
        }
    });
}); });
ava_1.test('Virtuals should be eliminated in the final object and can be accesible during generation', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var model, expectedResult, db;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                model = {
                    exampleVirtual: {
                        incrementalId: 0,
                        virtual: true
                    },
                    id: {
                        function: function () {
                            return this.object.exampleVirtual;
                        }
                    },
                    deep: {
                        more: {
                            field: {
                                static: 'im here',
                                virtual: true
                            }
                        }
                    },
                    deep2: {
                        more: {
                            field: {
                                static: 'im here'
                            }
                        }
                    }
                };
                expectedResult = {
                    id: 0,
                    deep2: {
                        more: {
                            field: 'im here'
                        }
                    }
                };
                return [4 /*yield*/, __1.default()
                        .schema('situation', model, 1)
                        .build()];
            case 1:
                db = _a.sent();
                t.deepEqual(db.situation[0], expectedResult);
                return [2 /*return*/];
        }
    });
}); });
ava_1.test('Should iterate over more complex levels (deeper & function used...)', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var model, expectedResult, db;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                model = {
                    name: {
                        firstName: {
                            static: 'firstName'
                        },
                        lastName: {
                            static: 'lastName'
                        },
                        much: {
                            deeper: {
                                function: function () {
                                    return (this.object.name.firstName +
                                        ' ' +
                                        this.object.name.lastName);
                                }
                            },
                            more: {
                                deeper: {
                                    function: function () {
                                        return (this.object.name.firstName +
                                            ' ' +
                                            this.object.name.lastName);
                                    }
                                },
                                level: {
                                    deeper: {
                                        function: function () {
                                            return (this.object.name.firstName +
                                                ' ' +
                                                this.object.name.lastName);
                                        }
                                    },
                                    awesome: {
                                        deeper: {
                                            function: function () {
                                                return (this.object.name.firstName +
                                                    ' ' +
                                                    this.object.name.lastName);
                                            }
                                        },
                                        deeper2: {
                                            function: function () {
                                                return (this.object.name.firstName +
                                                    ' ' +
                                                    this.object.name.lastName);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                };
                expectedResult = {
                    name: {
                        firstName: 'firstName',
                        lastName: 'lastName',
                        much: {
                            deeper: 'firstName lastName',
                            more: {
                                deeper: 'firstName lastName',
                                level: {
                                    deeper: 'firstName lastName',
                                    awesome: {
                                        deeper: 'firstName lastName',
                                        deeper2: 'firstName lastName'
                                    }
                                }
                            }
                        }
                    }
                };
                return [4 /*yield*/, __1.default()
                        .schema('situation', model, 1)
                        .build()];
            case 1:
                db = _a.sent();
                t.deepEqual(db.situation[0], expectedResult);
                return [2 /*return*/];
        }
    });
}); });
ava_1.test('Should work with conditional keys', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var conditional, expectedResult, db;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                conditional = {
                    condition: {
                        static: 'a'
                    },
                    'object.condition==="a",a': {
                        static: 'conditionLinkedToA'
                    },
                    'object.condition==="b",b': {
                        static: 'conditionLinkedToB'
                    }
                };
                expectedResult = {
                    condition: 'a',
                    a: 'conditionLinkedToA'
                };
                return [4 /*yield*/, __1.default()
                        .schema('situation', conditional, 1)
                        .build()];
            case 1:
                db = _a.sent();
                t.deepEqual(db.situation[0], expectedResult);
                return [2 /*return*/];
        }
    });
}); });
ava_1.test('Should work with conditional keys II', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var conditional, user, email, db;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                conditional = {
                    condition: {
                        faker: 'helpers.randomize(["email", "user"])'
                    },
                    'object.condition==="email",show': {
                        static: 'email'
                    },
                    'object.condition==="user",show': {
                        static: 'user'
                    },
                    'object.condition==="email",email': {
                        hasOne: 'emails'
                    },
                    'object.condition==="user",user': {
                        hasOne: 'users'
                    }
                };
                user = { faker: 'name.findName' };
                email = { faker: 'internet.email' };
                return [4 /*yield*/, __1.default()
                        .schema('users', user, 2)
                        .schema('emails', email, 2)
                        .schema('situation', conditional, 3)
                        .build()];
            case 1:
                db = _a.sent();
                t.true(true);
                return [2 /*return*/];
        }
    });
}); });
ava_1.test('Should not affect init values to next entity', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var length, request, request2, db;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                length = 10;
                request = {
                    type: {
                        values: ['kitty', 'pitxi', 'txuri']
                    }
                };
                request2 = {
                    type: {
                        static: 'staticValue'
                    }
                };
                return [4 /*yield*/, __1.default()
                        .schema('request', request, { uniqueField: 'type' })
                        .schema('request2', request2, 10)
                        .build()];
            case 1:
                db = _a.sent();
                t.notDeepEqual(db.request, db.request2);
                db.request2.forEach(function (r2) {
                    db.request.forEach(function (r) {
                        t.notDeepEqual(r2, r);
                    });
                });
                return [2 /*return*/];
        }
    });
}); });
ava_1.test('Should generate more entities', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var length, model1, model2, data;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                length = 10;
                model1 = {
                    request: {
                        id: {
                            faker: 'random.number'
                        },
                        title: {
                            faker: 'lorem.sentence'
                        },
                        number: {
                            faker: 'random.number'
                        }
                    }
                };
                model2 = {
                    request: {
                        id: {
                            faker: 'random.number'
                        },
                        title: {
                            faker: 'lorem.sentence'
                        },
                        number: {
                            faker: 'random.number'
                        }
                    }
                };
                return [4 /*yield*/, __1.default()
                        .schema('act', model1, length)
                        .schema('act2', model2, length)
                        .build()];
            case 1:
                data = _a.sent();
                t.true(Object.keys(data).length === 2);
                t.deepEqual(Object.keys(data), Array('act', 'act2'));
                t.true(data.act.length === length);
                t.true(data.act2.length === length);
                data.act.forEach(function (d) {
                    t.true(Object.keys(d).length === Object.keys(model1).length);
                    t.deepEqual(Object.keys(d), Object.keys(model1));
                    t.deepEqual(Object.keys(d.request), Object.keys(model1.request));
                });
                data.act2.forEach(function (d) {
                    t.true(Object.keys(d).length === Object.keys(model2).length);
                    t.deepEqual(Object.keys(d), Object.keys(model2));
                    t.deepEqual(Object.keys(d.request), Object.keys(model2.request));
                });
                return [2 /*return*/];
        }
    });
}); });
ava_1.test('Should uniqueField works', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var cat, cat2, result, data;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cat = {
                    name: ['txuri', 'pitxi', 'kitty']
                };
                cat2 = {
                    name: ['txuri', 'pitxi', 'kitty']
                };
                result = [{ name: 'txuri' }, { name: 'pitxi' }, { name: 'kitty' }];
                return [4 /*yield*/, __1.default()
                        .schema('cat', cat, { uniqueField: 'name' })
                        .schema('cat2', cat2, { uniqueField: 'name' })
                        .build()];
            case 1:
                data = _a.sent();
                t.deepEqual(data.cat, data.cat2);
                t.deepEqual(data.cat, result);
                t.deepEqual(data.cat2, result);
                return [2 /*return*/];
        }
    });
}); });
ava_1.test('Should max works', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var cat, data;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cat = {
                    name: { values: ['txuri', 'pitxi', 'kitty'] }
                };
                return [4 /*yield*/, __1.default()
                        .schema('cat', cat, { max: 10 })
                        .schema('cat2', cat, { max: 40 })
                        .build()];
            case 1:
                data = _a.sent();
                t.true(data.cat.length <= 10);
                t.true(data.cat2.length <= 40);
                return [2 /*return*/];
        }
    });
}); });
/*
test('Should max and min works', async t => {
    let cat = {
        name: ['txuri', 'pitxi', 'kitty']
    }

    let data = await mocker()
        .schema('cat', cat, { min: 5, max: 10 })
        .schema('cat2', cat, { min: 10, max: 40 })
        .build()

    t.true(data.cat.length <= 10)
    t.true(data.cat.length >= 5)
    t.true(data.cat2.length <= 40)
    t.true(data.cat2.length >= 10)
})

test('Should generate correctly with 2 ways of uniqueField', function(done) {
            var cat = {
                name: ['txuri', 'pitxi', 'kitty']
            };
            var cat2 = {
                name: {
                    values: ['txuri', 'pitxi', 'kitty']
                }
            };
            var result = [ { name: 'txuri' }, { name: 'pitxi' }, { name: 'kitty' } ]
            var m = mocker()
                .schema('cat', cat, {uniqueField: 'name'})
                .schema('cat2', cat2, {uniqueField: 'name'})
                .build(function(data){
                    try {
                        expect(data.cat)
                            .to.deep.equal(data.cat2)
                            .to.deep.equal(result)
                            .to.not.be.undefined
                            .to.not.be.null
                        done()
                    } catch (x) {
                        done(x)
                    }
                })
        })*/
ava_1.test('Should be awesome', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        t.true(true);
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja2VyLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3Rlc3RzL21vY2tlci5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQkF1WEE7OztBQXZYQSwyQkFBMEI7QUFDMUIsNEJBQStDO0FBRy9DLFVBQUksQ0FBQyx5Q0FBeUMsRUFBRSxVQUFNLENBQUM7O1FBQ25ELENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBTSxFQUFFLEVBQUUsSUFBSSxVQUFNLEVBQUUsQ0FBQyxDQUFBOzs7S0FDdEMsQ0FBQyxDQUFBO0FBRUYsVUFBSSxDQUFDLHFEQUFxRCxFQUFFLFVBQU0sQ0FBQzs7Ozs7Z0JBQzNELE1BQU0sR0FBRyxDQUFDLENBQUE7Z0JBRVYsY0FBYyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQTtnQkFDeEMsSUFBSSxHQUFHLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxDQUFBO2dCQUV6QixxQkFBTSxXQUFNLEVBQUU7eUJBQ2xCLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQzt5QkFDNUIsS0FBSyxFQUFFLEVBQUE7O2dCQUZSLEVBQUUsR0FBRyxTQUVHO2dCQUVaLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLGNBQWMsQ0FBQyxDQUFBOzs7O0tBQ2xDLENBQUMsQ0FBQTtBQUVGLFVBQUksQ0FBQywwRkFBMEYsRUFBRSxVQUFNLENBQUM7Ozs7O2dCQUNoRyxLQUFLLEdBQUc7b0JBQ1IsY0FBYyxFQUFFO3dCQUNaLGFBQWEsRUFBRSxDQUFDO3dCQUNoQixPQUFPLEVBQUUsSUFBSTtxQkFDaEI7b0JBRUQsRUFBRSxFQUFFO3dCQUNBLFFBQVEsRUFBRTs0QkFDTixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFBO3dCQUNyQyxDQUFDO3FCQUNKO29CQUNELElBQUksRUFBRTt3QkFDRixJQUFJLEVBQUU7NEJB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