// Player prefab
class Player extends Phaser.GameObjects.Sprite {
    
    // In miliseconds
    // 0 = not attacking, else attacking
    private attack_timer: number = 0
    static readonly ATTACK_TIMER: number = 700  // In miliseconds
    static readonly PERFECT_MS = 30            // Miliseconds in which the player's attacks award more points
    static readonly JUMP_SPEED: number = 620    // Pixels/second
    static readonly GRAVITY: number = 1800      // Pixels/second

    private jumping: boolean = false

    body: Phaser.Physics.Arcade.Body

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'player-run')

        this.setScale(game.getScale()/5)

        // Set physics
        scene.physics.add.existing(this)
        this.body.setCollideWorldBounds(false)
        this.body.setImmovable(false)
        this.body.setMaxVelocityX(0)
        this.body.setFriction(0)
        this.body.setSize(this.body.width * 2/3, this.body.height * 1.5)
        this.setOrigin(0.5, 0.5)

        // Bind attack inputs
        scene.input.keyboard.addListener(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, this.keyPressed, this)
        scene.input.addListener(Phaser.Input.Events.POINTER_DOWN, this.attack, this)

        // Add to scene
        scene.add.existing(this)

        // Play running animation
        this.anims.play('player-run')
    }

    private keyPressed = (key: Phaser.Input.Keyboard.Key) => {
        switch(key.keyCode) {
            case game.KEYS.F.keyCode:
            case game.KEYS.CTRL.keyCode:
                this.attack()
                break
        }
    }

    private attack() {
        if (this.attack_timer > 0) return
        this.scene.sound.play('sfx-attack')
        this.attack_timer = Player.ATTACK_TIMER
    }

    private jump() {
        this.body.setVelocityY(-Player.JUMP_SPEED)
        this.jumping = true
        console.log("Set jumping to true")
    }

    addCollider(collider: Phaser.Types.Physics.Arcade.ArcadeColliderType) {
        this.scene.physics.add.collider(this, collider)
    }

    isJumping() {
        return this.jumping
    }
    isAttacking() {
        return this.attack_timer > Player.ATTACK_TIMER/2
    }
    isPerfect() {
        return this.isAttacking() && (Player.ATTACK_TIMER - this.attack_timer) < Player.PERFECT_MS
    }

    update(time: number, delta: number) {
        // Update attack timer
        if (this.attack_timer > 0) {
            this.attack_timer -= delta
        }

        // Force position
        this.setX(game.screen_width * 1/3)

        // Apply gravity to the player
        if (!this.body.touching.down) {
            this.body.setVelocityY(this.body.velocity.y + Player.GRAVITY * delta/1000)
        }
        // Jump when touching the floor
        else if (game.KEYS.SPACE.isDown || game.KEYS.W.isDown || game.KEYS.UP.isDown) {
            this.jump()
        }
        // Update jumping property
        else if (this.jumping) {
            this.jumping = false
            console.log("Set jumping to false")
        }

        // Update animations
        if (this.isAttacking()) {
            if (this.texture.key != 'player-attack') {
                this.anims.play('player-attack')
            }
        } else if (this.isJumping()) {
            if (this.texture.key != 'player-jump') {
                this.anims.play('player-jump')
            }
        } else if (this.texture.key != 'player-run') {
            this.anims.play('player-run')
        }
    }

    destroy(fromScene?: boolean) {
        if (this.scene != null) {
            this.scene.input.keyboard.removeListener(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, this.keyPressed, this)
            this.scene.input.removeListener(Phaser.Input.Events.POINTER_DOWN, this.attack, this)
        }
        super.destroy(fromScene)
    }
}