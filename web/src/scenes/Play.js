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
var Play = /** @class */ (function (_super) {
    __extends(Play, _super);
    function Play() {
        var _this = _super.call(this, 'playScene') || this;
        _this.Connections = {
            Update: []
        };
        _this.SPEED = 40;
        return _this;
    }
    Play.prototype.init = function () { };
    Play.prototype.create = function () {
        // add background
        this.Background = {
            Layer0: this.add.tileSprite(0, 0, screen_height * 10, screen_height, 'bg-layer-0').setOrigin(0, 0),
            Layer1: this.add.tileSprite(0, 0, screen_height * 10, screen_height, 'bg-layer-1').setOrigin(0, 0),
            Layer2: this.add.tileSprite(0, 0, screen_height * 10, screen_height, 'bg-layer-2').setOrigin(0, 0)
        };
        // add player
        this.Player = new Player(this, screen_width * 1 / 3, screen_height * 1 / 2);
        // add floor
        this.Floor = this.add.tileSprite(0, screen_height * 2 / 3 + this.Player.height, screen_width, screen_height, 'floor').setOrigin(0, 0);
        this.physics.add.existing(this.Floor, true);
        this.Floor.body.setImmovable(true);
        this.Floor.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.Floor, this.Player);
        // start music
        this.sound.play('music');
    };
    Play.prototype.update = function (time, delta) {
        // process event connections
        for (var _i = 0, _a = this.Connections.Update; _i < _a.length; _i++) {
            var func = _a[_i];
            func(time, delta);
        }
        // scroll tile sprites
        this.Floor.tilePositionX -= this.SPEED * (delta / 1000); // speed pixels/second
        this.Background.Layer0.tilePositionX -= this.SPEED / 2 * (delta / 1000);
        this.Background.Layer1.tilePositionX -= this.SPEED / 4 * (delta / 1000);
        this.Background.Layer2.tilePositionX -= this.SPEED / 8 * (delta / 1000);
    };
    return Play;
}(Phaser.Scene));
