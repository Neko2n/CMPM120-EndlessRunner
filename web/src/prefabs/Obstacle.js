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
// Obstacle prefab
var Obstacle = /** @class */ (function (_super) {
    __extends(Obstacle, _super);
    function Obstacle(scene, x, y, breakable) {
        var _this = _super.call(this, scene, x, y, breakable ? 'obstacle-breakable' : 'obstacle') || this;
        _this.breakable = breakable;
        _this.setScale(game.getScale() / 2);
        // Set physics
        scene.physics.add.existing(_this);
        _this.body.setCollideWorldBounds(false);
        _this.body.setImmovable(true);
        _this.body.setMaxVelocityY(0);
        _this.body.setFriction(0);
        _this.setOrigin(0, 1);
        // Add to scene
        scene.add.existing(_this);
        return _this;
    }
    Obstacle.prototype.break = function (perfect) {
        if (perfect === void 0) { perfect = false; }
        // Break FX
        this.scene.sound.play('sfx-break');
        // Perfect break FX
        if (perfect) {
            this.scene.sound.play('sfx-perfect');
        }
        console.log("Obstacle broken! Perfect: ", perfect);
        this.destroy();
    };
    // Hooked up to the scene's update function
    Obstacle.prototype.update = function (time, delta) {
        // Set speed
        this.body.setVelocityX(-game.speed);
        // Delete once off screen
        if (this.x < 0 - this.displayWidth) {
            this.destroy();
        }
    };
    Obstacle.prototype.destroy = function (fromScene) {
        _super.prototype.destroy.call(this, fromScene);
    };
    return Obstacle;
}(Phaser.GameObjects.Sprite));
