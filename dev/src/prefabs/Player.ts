// Player prefab
type PlayerState = "run" | "jump" | "attack" | "swap"
class Player extends Phaser.Physics.Arcade.Sprite {
    player_state: PlayerState = "run"

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'player-running')

        this.setImmovable(false)
        this.setCollideWorldBounds(false)

        scene.physics.add.existing(this)

        this.setOrigin(0.5, 0.5)
    }

    setPlayerState(state: PlayerState) {
        switch(state) {
            case "run":
                break
            case "jump":
                break
            case "attack":
                break
            case "swap":
                break
            default:
                throw RangeError("Invalid PlayerState: " + state)
        }
        this.player_state = state
    }

    update(time, delta) {
        // handle all movement
    }
}