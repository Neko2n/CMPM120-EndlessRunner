// Obstacle prefab
class Obstacle extends Phaser.GameObjects.Sprite {

    readonly breakable: boolean

    body: Phaser.Physics.Arcade.Body

    constructor(scene: Phaser.Scene, x: number, y: number, breakable: boolean) {
        super(scene, x, y, breakable ? 'obstacle-breakable' : 'obstacle')
        
        this.breakable = breakable

        this.setScale(game.getScale()/2)

        // Set physics
        scene.physics.add.existing(this)
        this.body.setCollideWorldBounds(false)
        this.body.setImmovable(true)
        this.body.setMaxVelocityY(0)
        this.body.setFriction(0)
        this.setOrigin(0, 1)
        
        // Add to scene
        scene.add.existing(this)
    }

    break(perfect: boolean = false) {

        // Break FX
        this.scene.sound.play('sfx-break')
        
        // Perfect break FX
        if (perfect) {
            this.scene.sound.play('sfx-perfect')

        }
        
        console.log("Obstacle broken! Perfect: ", perfect)
        this.destroy()
    }

    // Hooked up to the scene's update function
    update(time: any, delta: number) {
        // Set speed
        this.body.setVelocityX(-game.speed)

        // Delete once off screen
        if (this.x < 0 - this.displayWidth) {
            this.destroy()
        }
    }

    destroy(fromScene?: boolean) {
        super.destroy(fromScene)
    }
  }