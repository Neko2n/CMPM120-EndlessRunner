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
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(scene, x, y) {
        var _this = _super.call(this, scene, x, y, 'player-running') || this;
        _this.player_state = "run";
        _this.setImmovable(false);
        _this.setCollideWorldBounds(false);
        scene.physics.add.existing(_this);
        _this.setOrigin(0.5, 0.5);
        return _this;
    }
    Player.prototype.setPlayerState = function (state) {
        switch (state) {
            case "run":
                break;
            case "jump":
                break;
            case "attack":
                break;
            case "swap":
                break;
            default:
                throw RangeError("Invalid PlayerState: " + state);
        }
        this.player_state = state;
    };
    Player.prototype.update = function (time, delta) {
        // handle all movement
    };
    return Player;
}(Phaser.Physics.Arcade.Sprite));
