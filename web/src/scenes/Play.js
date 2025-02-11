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
        _this.score = 0;
        _this.music_playing = false;
        return _this;
    }
    Play.prototype.init = function () { };
    Play.prototype.create = function () {
        var _this = this;
        // add background
        this.Background = {
            Layer2: this.add.tileSprite(0, -game.screen_height / 4, game.screen_height * 10, game.screen_height, 'bg-layer-2').setOrigin(0, 0),
            Layer1: this.add.tileSprite(0, -game.screen_height / 6, game.screen_height * 10, game.screen_height, 'bg-layer-1').setOrigin(0, 0),
            Layer0: this.add.tileSprite(0, -game.screen_height / 8, game.screen_height * 10, game.screen_height, 'bg-layer-0').setOrigin(0, 0)
        };
        // add player
        this.Player = new Player(this, game.screen_width * 1 / 3, game.screen_height * 2 / 3).setOrigin(0.5, 1);
        // add floor
        this.Floor = this.add.tileSprite(0, game.screen_height * 2 / 3, game.screen_width, game.screen_height * 1 / 3, 'floor').setOrigin(0, 0);
        this.physics.add.existing(this.Floor);
        var floor_body = this.Floor.body;
        floor_body.setFriction(0);
        floor_body.setImmovable(true);
        // initialize obstacles group
        this.Obstacles = this.add.group();
        // add player collision
        this.Player.addCollider(this.Floor);
        this.Player.addCollider(this.Obstacles);
        this.Player.body.onCollide = true;
        this.physics.world.addListener(Phaser.Physics.Arcade.Events.COLLIDE, function (obj1, obj2, body1, body2) {
            if (obj1 == _this.Player && obj2 instanceof Obstacle && _this.Player.body.touching.right) {
                if (_this.Player.isAttacking() && obj2.breakable) {
                    var perfect = _this.Player.isPerfect();
                    obj2.break(perfect);
                    _this.score += 2;
                    if (perfect)
                        _this.score += 4;
                }
                else {
                    _this.sound.play('sfx-lose');
                    _this.endGame();
                }
            }
        });
        // Bind key inputs
        game.setScene(this);
        // set game speed
        game.speed = 300;
        // initialize variables
        this.spawn_timer = 3;
        this.game_ended = false;
        this.music_playing = true;
        this.score = 0;
        // display score text
        var text_config = {
            fontFamily: 'Papyrus',
            fontSize: '28px',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        };
        this.score_text = this.add.text(game.screen_width / 2, 0, "0", text_config);
    };
    Play.prototype.endGame = function () {
        var _this = this;
        this.game_ended = true;
        game.speed = 0;
        var lose_text = this.add.sprite(game.screen_width / 2, game.screen_height / 2, 'ui-lose').setOrigin(0.5, 0.5);
        var clean = function () {
            lose_text.destroy();
            _this.music_playing = false;
            _this.sound.stopByKey('music-end');
            _this.sound.play('sfx-select');
        };
        var MENU_KEY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        MENU_KEY.once(Phaser.Input.Keyboard.Events.DOWN, function () {
            clean();
            _this.scene.start("menuScene");
        });
        var RESET_KEY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        RESET_KEY.once(Phaser.Input.Keyboard.Events.DOWN, function () {
            clean();
            _this.scene.restart();
        });
    };
    Play.prototype.update = function (time, delta) {
        // Update game objects
        this.Player.update(time, delta);
        for (var _i = 0, _a = this.Obstacles.getChildren(); _i < _a.length; _i++) {
            var obstacle = _a[_i];
            obstacle.update(time, delta);
        }
        if (!this.game_ended) {
            // loop play music
            if (this.music_playing && !this.sound.isPlaying('music-play')) {
                this.sound.play('music-play');
            }
        }
        else {
            // loop game over music
            if (this.music_playing && !this.sound.isPlaying('music-end')) {
                this.sound.play('music-end');
            }
            // stop play music
            this.sound.stopByKey('music-play');
            return;
        }
        // scroll tile sprites
        var scroll = game.speed * (delta / 1000); // pixels/second
        this.Floor.tilePositionX += scroll;
        this.Background.Layer0.tilePositionX += scroll * 3 / 4;
        this.Background.Layer1.tilePositionX += scroll * 2 / 4;
        this.Background.Layer2.tilePositionX += scroll * 1 / 4;
        // Spawn obstacles randomly
        if (this.spawn_timer <= 0) {
            // 50% chance to be breakable
            var breakable = Phaser.Math.Between(1, 2) == 1;
            // If breakable, 25% to have an unbreakable on top
            // If unbreakable, 25% to have a breakable on top
            var stacked = Phaser.Math.Between(1, 4) == 1;
            var bottom = new Obstacle(this, game.screen_width, this.Floor.y, breakable);
            this.Obstacles.add(bottom);
            if (stacked) {
                var top_1 = new Obstacle(this, game.screen_width, this.Floor.y - bottom.displayHeight, !breakable);
                this.Obstacles.add(top_1);
            }
            // Set spawn delay (1-2 seconds)
            this.spawn_timer = Phaser.Math.Between(1000, 2000);
        }
        else {
            this.spawn_timer -= delta;
        }
        // increment game speed infinitely
        game.speed += delta / 1000 * 5;
        // increment score and update text
        this.score += delta / 1000;
        this.score_text.text = Math.floor(this.score).toString();
    };
    return Play;
}(Phaser.Scene));
