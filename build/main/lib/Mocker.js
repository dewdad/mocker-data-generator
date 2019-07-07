"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Schema_1 = require("./Schema");
var utils_1 = require("./utils");
var Mocker = /** @class */ (function () {
    function Mocker(options) {
        if (options === void 0) { options = {}; }
        this.schemas = [];
        this.DB = {};
        this.options = {};
        this.options = options;
        this.DB = {};
    }
    Mocker.prototype.schema = function (name, schema, options) {
        this.schemas.push(new Schema_1.Schema(name, schema, options));
        return this;
    };
    Mocker.prototype.reset = function () {
        this.DB = {};
        return this;
    };
    Mocker.prototype.restart = function () {
        this.DB = {};
        this.schemas = [];
        return this;
    };
    Mocker.prototype.build = function (cb) {
        try {
            this.schemas.reduce(function (acc, schema) {
                var instances;
                try {
                    instances = schema.build(acc);
                }
                catch (e) {
                    throw new Error('Schema: "' + schema.name + '" ' + e);
                }
                // Clean virtuals
                if (schema.virtualPaths.length > 0) {
                    instances.forEach(function (x) {
                        return utils_1.cleanVirtuals(schema.virtualPaths, x, {
                            strict: true,
                            symbol: ','
                        });
                    });
                }
                // Add to db
                acc[schema.name] = instances;
                return acc;
            }, this.DB);
        }
        catch (e) {
            return cb ? cb(e) : Promise.reject(e);
        }
        return cb ? cb(null, this.DB) : Promise.resolve(this.DB);
    };
    return Mocker;
}());
exports.Mocker = Mocker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9ja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9Nb2NrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBaUM7QUFDakMsaUNBQXVDO0FBTXZDO0lBS0ksZ0JBQVksT0FBWTtRQUFaLHdCQUFBLEVBQUEsWUFBWTtRQUp4QixZQUFPLEdBQWEsRUFBRSxDQUFBO1FBQ3RCLE9BQUUsR0FBUSxFQUFFLENBQUE7UUFDWixZQUFPLEdBQUcsRUFBRSxDQUFBO1FBR1IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7UUFDdEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUE7SUFDaEIsQ0FBQztJQUVELHVCQUFNLEdBQU4sVUFBTyxJQUFZLEVBQUUsTUFBVSxFQUFFLE9BQVk7UUFDekMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFBO1FBQ3BELE9BQU8sSUFBSSxDQUFBO0lBQ2YsQ0FBQztJQUVELHNCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQTtRQUNaLE9BQU8sSUFBSSxDQUFBO0lBQ2YsQ0FBQztJQUVELHdCQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQTtRQUNaLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFBO1FBQ2pCLE9BQU8sSUFBSSxDQUFBO0lBQ2YsQ0FBQztJQUlELHNCQUFLLEdBQUwsVUFBTSxFQUE2QztRQUMvQyxJQUFJO1lBQ0EsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUFHLEVBQUUsTUFBTTtnQkFDNUIsSUFBSSxTQUFTLENBQUE7Z0JBRWIsSUFBSTtvQkFDQSxTQUFTLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtpQkFDaEM7Z0JBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ1IsTUFBTSxJQUFJLEtBQUssQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUE7aUJBQ3hEO2dCQUVELGlCQUFpQjtnQkFDakIsSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ2hDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO3dCQUNmLE9BQUEscUJBQWEsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBRTs0QkFDbEMsTUFBTSxFQUFFLElBQUk7NEJBQ1osTUFBTSxFQUFFLEdBQUc7eUJBQ2QsQ0FBQztvQkFIRixDQUdFLENBQ0wsQ0FBQTtpQkFDSjtnQkFFRCxZQUFZO2dCQUNaLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFBO2dCQUU1QixPQUFPLEdBQUcsQ0FBQTtZQUNkLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7U0FDZDtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUN4QztRQUVELE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDNUQsQ0FBQztJQUNMLGFBQUM7QUFBRCxDQUFDLEFBNURELElBNERDO0FBNURZLHdCQUFNIn0=