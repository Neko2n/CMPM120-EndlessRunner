class Play extends Phaser.Scene {
    readonly Connections: { Update: CallableFunction[] } = { 
        Update: [] 
    }
    Background: {
        Layer0: Phaser.GameObjects.TileSprite,
        Layer1: Phaser.GameObjects.TileSprite,
        Layer2: Phaser.GameObjects.TileSprite
    }
    Player: Player
    Floor: Phaser.GameObjects.TileSprite

    readonly SPEED: number = 40
    
    constructor() {
        super('playScene')
    }

    init() {}

    create() {
        // add background
        this.Background = {
            Layer0: this.add.tileSprite(0, 0, screen_height * 10, screen_height, 'bg-layer-0').setOrigin(0, 0),
            Layer1: this.add.tileSprite(0, 0, screen_height * 10, screen_height, 'bg-layer-1').setOrigin(0, 0),
            Layer2: this.add.tileSprite(0, 0, screen_height * 10, screen_height, 'bg-layer-2').setOrigin(0, 0)
        }

        // add player
        this.Player = new Player(this, screen_width * 1/3, screen_height * 1/2)

        // add floor
        this.Floor = this.add.tileSprite(0, screen_height * 2/3 + this.Player.height, screen_width, screen_height, 'floor').setOrigin(0, 0)
        this.physics.add.existing(this.Floor, true)
        this.Floor.body.setImmovable(true)
        this.Floor.body.setCollideWorldBounds(true)
        this.physics.add.collider(this.Floor, this.Player)

        // start music
        this.sound.play('music')
    }

    update(time, delta) {
        // process event connections
        for (const func of this.Connections.Update) {
            func(time, delta)
        }

        // scroll tile sprites
        this.Floor.tilePositionX -= this.SPEED * (delta/1000)               // speed pixels/second
        this.Background.Layer0.tilePositionX -= this.SPEED/2 * (delta/1000)
        this.Background.Layer1.tilePositionX -= this.SPEED/4 * (delta/1000)
        this.Background.Layer2.tilePositionX -= this.SPEED/8 * (delta/1000)
    }
}
