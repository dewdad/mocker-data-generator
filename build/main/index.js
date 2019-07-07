"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("./array-includes");
var Mocker_1 = require("./lib/Mocker");
tslib_1.__exportStar(require("./lib/Mocker"), exports);
tslib_1.__exportStar(require("./lib/Schema"), exports);
tslib_1.__exportStar(require("./lib/Generator"), exports);
exports.mocker = function (opts) { return new Mocker_1.Mocker(opts); };
exports.default = exports.mocker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNEJBQXlCO0FBRXpCLHVDQUFxQztBQUNyQyx1REFBNEI7QUFDNUIsdURBQTRCO0FBQzVCLDBEQUErQjtBQUVsQixRQUFBLE1BQU0sR0FBRyxVQUFDLElBQUssSUFBSyxPQUFBLElBQUksZUFBTSxDQUFDLElBQUksQ0FBQyxFQUFoQixDQUFnQixDQUFBO0FBQ2pELGtCQUFlLGNBQU0sQ0FBQSJ9