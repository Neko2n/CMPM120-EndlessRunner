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
// Player prefab
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(scene, x, y) {
        var _this = _super.call(this, scene, x, y, 'player-run') || this;
        // In miliseconds
        // 0 = not attacking, else attacking
        _this.attack_timer = 0;
        _this.jumping = false;
        _this.keyPressed = function (key) {
            switch (key.keyCode) {
                case game.KEYS.F.keyCode:
                case game.KEYS.CTRL.keyCode:
                    _this.attack();
                    break;
            }
        };
        _this.setScale(game.getScale() / 5);
        // Set physics
        scene.physics.add.existing(_this);
        _this.body.setCollideWorldBounds(false);
        _this.body.setImmovable(false);
        _this.body.setMaxVelocityX(0);
        _this.body.setFriction(0);
        _this.body.setSize(_this.body.width * 2 / 3, _this.body.height * 1.5);
        _this.setOrigin(0.5, 0.5);
        // Bind attack inputs
        scene.input.keyboard.addListener(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, _this.keyPressed, _this);
        scene.input.addListener(Phaser.Input.Events.POINTER_DOWN, _this.attack, _this);
        // Add to scene
        scene.add.existing(_this);
        // Play running animation
        _this.anims.play('player-run');
        return _this;
    }
    Player.prototype.attack = function () {
        if (this.attack_timer > 0)
            return;
        this.scene.sound.play('sfx-attack');
        this.attack_timer = Player.ATTACK_TIMER;
    };
    Player.prototype.jump = function () {
        this.body.setVelocityY(-Player.JUMP_SPEED);
        this.jumping = true;
        console.log("Set jumping to true");
    };
    Player.prototype.addCollider = function (collider) {
        this.scene.physics.add.collider(this, collider);
    };
    Player.prototype.isJumping = function () {
        return this.jumping;
    };
    Player.prototype.isAttacking = function () {
        return this.attack_timer > Player.ATTACK_TIMER / 2;
    };
    Player.prototype.isPerfect = function () {
        return this.isAttacking() && (Player.ATTACK_TIMER - this.attack_timer) < Player.PERFECT_MS;
    };
    Player.prototype.update = function (time, delta) {
        // Update attack timer
        if (this.attack_timer > 0) {
            this.attack_timer -= delta;
        }
        // Force position
        this.setX(game.screen_width * 1 / 3);
        // Apply gravity to the player
        if (!this.body.touching.down) {
            this.body.setVelocityY(this.body.velocity.y + Player.GRAVITY * delta / 1000);
        }
        // Jump when touching the floor
        else if (game.KEYS.SPACE.isDown || game.KEYS.W.isDown || game.KEYS.UP.isDown) {
            this.jump();
        }
        // Update jumping property
        else if (this.jumping) {
            this.jumping = false;
            console.log("Set jumping to false");
        }
        // Update animations
        if (this.isAttacking()) {
            if (this.texture.key != 'player-attack') {
                this.anims.play('player-attack');
            }
        }
        else if (this.isJumping()) {
            if (this.texture.key != 'player-jump') {
                this.anims.play('player-jump');
            }
        }
        else if (this.texture.key != 'player-run') {
            this.anims.play('player-run');
        }
    };
    Player.prototype.destroy = function (fromScene) {
        if (this.scene != null) {
            this.scene.input.keyboard.removeListener(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, this.keyPressed, this);
            this.scene.input.removeListener(Phaser.Input.Events.POINTER_DOWN, this.attack, this);
        }
        _super.prototype.destroy.call(this, fromScene);
    };
    Player.ATTACK_TIMER = 700; // In miliseconds
    Player.PERFECT_MS = 30; // Miliseconds in which the player's attacks award more points
    Player.JUMP_SPEED = 620; // Pixels/second
    Player.GRAVITY = 1800; // Pixels/second
    return Player;
}(Phaser.GameObjects.Sprite));
