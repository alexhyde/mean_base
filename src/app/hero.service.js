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
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var HeroService = (function () {
    function HeroService(http) {
        this.http = http;
        this.heroesUrl = 'http://localhost:5000/hero/';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    HeroService.prototype.getHeroes = function () {
        return this.http.get(this.heroesUrl + 'data')
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    HeroService.prototype.getHeroesSlowly = function () {
        var _this = this;
        return new Promise(function (resolve) {
            // Simulate server latency with 2 second delay
            setTimeout(function () { return resolve(_this.getHeroes()); }, 2000);
        });
    };
    HeroService.prototype.getHero = function (id) {
        return this.http.get(this.heroesUrl + 'data/' + id)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
        ;
    };
    HeroService.prototype.update = function (hero) {
        var url = this.heroesUrl + 'data/' + hero.identifier;
        return this.http
            .put(url, JSON.stringify(hero), { headers: this.headers })
            .toPromise()
            .then(function () { return hero; })
            .catch(this.handleError);
    };
    HeroService.prototype.create = function (name) {
        var url = this.heroesUrl + 'data';
        return this.http
            .post(url, JSON.stringify({ name: name }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    HeroService.prototype.delete = function (name) {
        var url = this.heroesUrl + 'data/' + name;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    HeroService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    HeroService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
    ], HeroService);
    return HeroService;
    var _a;
}());
exports.HeroService = HeroService;

//# sourceMappingURL=hero.service.js.map