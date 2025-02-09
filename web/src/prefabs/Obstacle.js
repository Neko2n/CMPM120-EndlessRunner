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
// Rocket prefab
var Rocket = /** @class */ (function (_super) {
    __extends(Rocket, _super);
    function Rocket(scene, x, y, texture, frame) {
        var _this = _super.call(this, scene, x, y, texture, frame) || this;
        scene.add.existing(_this); // add to existing, displayList, updateList
        _this.isFiring = false; // track rocket's firing status
        _this.moveSpeed = game.settings.rocketSpeed; // In pixels/second
        _this.sfxShot = scene.sound.add('sfx-shot');
        // bind mouse input
        _this.scene.input.on('pointermove', function (pointer) {
            if (!_this.isFiring && !_this.scene.gameOver)
                _this.x = pointer.x;
        }, _this);
        _this.scene.input.on('pointerdown', function () {
            if (!_this.isFiring && !_this.scene.gameOver)
                _this.fire();
        }, _this);
        return _this;
    }
    Rocket.prototype.fire = function () {
        this.isFiring = true;
        this.sfxShot.play();
    };
    Rocket.prototype.update = function (time, delta) {
        // left/right movement
        if (!this.isFiring) {
            if (keys.LEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed * (delta / 1000);
            }
            else if (keys.RIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed * (delta / 1000);
            }
        }
        // fire button
        if (Phaser.Input.Keyboard.JustDown(keys.FIRE) && !this.isFiring) {
            this.fire();
        }
        // if fired, move up
        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed * (delta / 1000);
        }
        // reset on miss
        if (this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
            this.scene.gameTime = Math.max(0, this.scene.gameTime - 4000);
        }
    };
    // reset rocket to "ground"
    Rocket.prototype.reset = function () {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    };
    return Rocket;
}(Phaser.GameObjects.Sprite));
