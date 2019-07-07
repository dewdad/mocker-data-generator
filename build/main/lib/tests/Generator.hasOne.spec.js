"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var __1 = require("../../");
var gen = new __1.Generator();
var set1 = [
    {
        id: 0
    },
    {
        id: 1
    },
    {
        id: 2
    },
    {
        id: 3
    },
    {
        id: 4
    },
    {
        id: 5
    },
    {
        id: 6
    },
    {
        id: 7
    },
    {
        id: 8
    },
    {
        id: 9
    }
];
var set2 = [
    {
        id: {
            id: 0
        }
    },
    {
        id: {
            id: 1
        }
    },
    {
        id: {
            id: 2
        }
    },
    {
        id: {
            id: 3
        }
    },
    {
        id: {
            id: 4
        }
    },
    {
        id: {
            id: 5
        }
    },
    {
        id: {
            id: 6
        }
    },
    {
        id: {
            id: 7
        }
    },
    {
        id: {
            id: 8
        }
    },
    {
        id: {
            id: 9
        }
    }
];
ava_1.test('Should get one of the DB', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        gen.DB = { hello: set1 };
        res = gen.hasOne({ hasOne: 'hello' });
        t.true(set1.indexOf(res) > -1);
        return [2 /*return*/];
    });
}); });
ava_1.test('Should get one of the DB, and one field of that entity (eval)', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        gen.DB = {
            hello: set1
        };
        res = gen.hasOne({ hasOne: 'hello', get: 'id', eval: true });
        t.true(res !== undefined);
        t.true(res !== null);
        t.true(res === 0 || (res && res <= 10));
        t.true(res === 0 || (res && res >= 0));
        return [2 /*return*/];
    });
}); });
ava_1.test('Should get one of the DB, and one field of that entity (no-eval)', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        gen.DB = {
            hello: set1
        };
        res = gen.hasOne({ hasOne: 'hello', get: 'id' });
        t.true(res !== undefined);
        t.true(res !== null);
        t.true(res === 0 || (res && res <= 10));
        t.true(res === 0 || (res && res >= 0));
        return [2 /*return*/];
    });
}); });
ava_1.test('Should get one of the DB, and one field of that entity, more deep', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                gen.DB = {
                    hello: set2
                };
                return [4 /*yield*/, gen.hasOne({ hasOne: 'hello', get: 'id.id' })];
            case 1:
                res = _a.sent();
                t.true(res !== undefined);
                t.true(res !== null);
                t.true(res === 0 || (res && res <= 10));
                t.true(res === 0 || (res && res >= 0));
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdG9yLmhhc09uZS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi90ZXN0cy9HZW5lcmF0b3IuaGFzT25lLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGlCQXFJQTs7O0FBcklBLDJCQUEwQjtBQUMxQiw0QkFBa0M7QUFFbEMsSUFBTSxHQUFHLEdBQUcsSUFBSSxhQUFTLEVBQUUsQ0FBQTtBQUUzQixJQUFNLElBQUksR0FBRztJQUNUO1FBQ0ksRUFBRSxFQUFFLENBQUM7S0FDUjtJQUNEO1FBQ0ksRUFBRSxFQUFFLENBQUM7S0FDUjtJQUNEO1FBQ0ksRUFBRSxFQUFFLENBQUM7S0FDUjtJQUNEO1FBQ0ksRUFBRSxFQUFFLENBQUM7S0FDUjtJQUNEO1FBQ0ksRUFBRSxFQUFFLENBQUM7S0FDUjtJQUNEO1FBQ0ksRUFBRSxFQUFFLENBQUM7S0FDUjtJQUNEO1FBQ0ksRUFBRSxFQUFFLENBQUM7S0FDUjtJQUNEO1FBQ0ksRUFBRSxFQUFFLENBQUM7S0FDUjtJQUNEO1FBQ0ksRUFBRSxFQUFFLENBQUM7S0FDUjtJQUNEO1FBQ0ksRUFBRSxFQUFFLENBQUM7S0FDUjtDQUNKLENBQUE7QUFFRCxJQUFNLElBQUksR0FBRztJQUNUO1FBQ0ksRUFBRSxFQUFFO1lBQ0EsRUFBRSxFQUFFLENBQUM7U0FDUjtLQUNKO0lBQ0Q7UUFDSSxFQUFFLEVBQUU7WUFDQSxFQUFFLEVBQUUsQ0FBQztTQUNSO0tBQ0o7SUFDRDtRQUNJLEVBQUUsRUFBRTtZQUNBLEVBQUUsRUFBRSxDQUFDO1NBQ1I7S0FDSjtJQUNEO1FBQ0ksRUFBRSxFQUFFO1lBQ0EsRUFBRSxFQUFFLENBQUM7U0FDUjtLQUNKO0lBQ0Q7UUFDSSxFQUFFLEVBQUU7WUFDQSxFQUFFLEVBQUUsQ0FBQztTQUNSO0tBQ0o7SUFDRDtRQUNJLEVBQUUsRUFBRTtZQUNBLEVBQUUsRUFBRSxDQUFDO1NBQ1I7S0FDSjtJQUNEO1FBQ0ksRUFBRSxFQUFFO1lBQ0EsRUFBRSxFQUFFLENBQUM7U0FDUjtLQUNKO0lBQ0Q7UUFDSSxFQUFFLEVBQUU7WUFDQSxFQUFFLEVBQUUsQ0FBQztTQUNSO0tBQ0o7SUFDRDtRQUNJLEVBQUUsRUFBRTtZQUNBLEVBQUUsRUFBRSxDQUFDO1NBQ1I7S0FDSjtJQUNEO1FBQ0ksRUFBRSxFQUFFO1lBQ0EsRUFBRSxFQUFFLENBQUM7U0FDUjtLQUNKO0NBQ0osQ0FBQTtBQUVELFVBQUksQ0FBQywwQkFBMEIsRUFBRSxVQUFNLENBQUM7OztRQUNwQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFBO1FBRXBCLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUE7UUFDekMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7OztLQUN4QyxDQUFDLENBQUE7QUFFRixVQUFJLENBQUMsK0RBQStELEVBQUUsVUFBTSxDQUFDOzs7UUFDekUsR0FBRyxDQUFDLEVBQUUsR0FBRztZQUNMLEtBQUssRUFBRSxJQUFJO1NBQ2QsQ0FBQTtRQUVHLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1FBQ2hFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLFNBQVMsQ0FBQyxDQUFBO1FBQ3pCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFBO1FBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUN2QyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7OztLQUN6QyxDQUFDLENBQUE7QUFFRixVQUFJLENBQUMsa0VBQWtFLEVBQUUsVUFBTSxDQUFDOzs7UUFDNUUsR0FBRyxDQUFDLEVBQUUsR0FBRztZQUNMLEtBQUssRUFBRSxJQUFJO1NBQ2QsQ0FBQTtRQUVHLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUNwRCxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxTQUFTLENBQUMsQ0FBQTtRQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQTtRQUNwQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDdkMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBOzs7S0FDekMsQ0FBQyxDQUFBO0FBRUYsVUFBSSxDQUFDLG1FQUFtRSxFQUFFLFVBQU0sQ0FBQzs7Ozs7Z0JBQzdFLEdBQUcsQ0FBQyxFQUFFLEdBQUc7b0JBQ0wsS0FBSyxFQUFFLElBQUk7aUJBQ2QsQ0FBQTtnQkFFUyxxQkFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQTs7Z0JBQXpELEdBQUcsR0FBRyxTQUFtRDtnQkFDN0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssU0FBUyxDQUFDLENBQUE7Z0JBQ3pCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFBO2dCQUNwQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUE7Z0JBQ3ZDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTs7OztLQUN6QyxDQUFDLENBQUEifQ==