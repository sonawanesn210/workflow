"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const app_service_1 = require("./app.service");
const common_1 = require("@nestjs/common");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async createXmlFile(filename, inputData) {
        return this.appService.createXmlFile_xmljs(filename, inputData);
    }
    async createXmlFilejson(filename, inputData) {
        return this.appService.createXmlFile_json(filename, inputData);
    }
    async getXmlFile(filename, res) {
        const data = await this.appService.getXmlFile_xmljs(filename);
        res.setHeader('Content-Type', 'application/xml');
        res.send(data);
    }
    async updateXmlFile(filename, inputData) {
        return this.appService.updateXmlFile_xmljs(filename, inputData);
    }
    async updatekeyvalue(filename, inputData) {
        return this.appService.updateXmlFile_xmljs1(filename, inputData);
    }
};
__decorate([
    (0, common_1.Post)(':filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createXmlFile", null);
__decorate([
    (0, common_1.Post)('/json/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createXmlFilejson", null);
__decorate([
    (0, common_1.Get)(':filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getXmlFile", null);
__decorate([
    (0, common_1.Put)(':filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updateXmlFile", null);
__decorate([
    (0, common_1.Put)('/keyvalue/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updatekeyvalue", null);
AppController = __decorate([
    (0, common_1.Controller)('xml-js'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map