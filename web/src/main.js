//  Title: Box Buster
//  Name: Niko DiStefano
//  Date: 2/10/2025
//  Hours (~): 20
//
//  I felt that adding an element of timing your key presses to
//  "bust" boxes adds more engagement with the endless runner genre.
//  It was fairly difficult to implement for someone who's new to using
//  Phaser's Arcade physics--I'm pretty proud of how it turned out.
//  Especially the "perfect timing" mechanic. The risk-reward of this
//  mechanic makes the game especially fun.
'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [Menu, Play]
};
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game(config) {
        var _this = _super.call(this, config) || this;
        _this.speed = 300;
        _this.screen_width = config.width;
        _this.screen_height = config.height;
        return _this;
    }
    Game.prototype.getScale = function () {
        return 960 / this.screen_height;
    };
    Game.prototype.setScene = function (scene) {
        this.KEYS = {
            SPACE: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
            W: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            UP: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            S: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            DOWN: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
            F: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F),
            CTRL: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL)
        };
    };
    return Game;
}(Phaser.Game));
var game = new Game(config);
