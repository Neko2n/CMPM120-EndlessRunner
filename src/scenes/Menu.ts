class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    preload() {
        // load images/tile sprites
        this.load.image('bg-layer-0', './assets/image/bg-layer-0.png')
        this.load.image('bg-layer-1', './assets/image/bg-layer-1.png')
        this.load.image('bg-layer-2', './assets/image/bg-layer-2.png')
        this.load.image('floor', './assets/image/floor.png')
        this.load.image('obstacle', './assets/image/obstacle.png')
        this.load.image('obstacle-breakable', './assets/image/obstacle-breakable.png')

        // load spritesheets
        this.load.spritesheet('break', './assets/sprite/break.png', {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })
        this.load.spritesheet('player-run', './assets/sprite/player-run.png', {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })
        this.load.spritesheet('player-jump', './assets/sprite/player-jump.png', {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })
        this.load.spritesheet('player-punch', './assets/sprite/player-punch.png', {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })
        this.load.spritesheet('player-kick', './assets/sprite/player-kick.png', {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })
        this.load.spritesheet('player-swap', './assets/sprite/player-swap.png', {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })
        this.load.spritesheet('sparkles', './assets/sprite/sparkles.png', {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })

        // load audio
        this.load.audio('sfx-select', './assets/sound/sfx-select.wav')
        this.load.audio('sfx-break', './assets/sound/sfx-break.wav')
        this.load.audio('sfx-swap', './assets/sound/sfx-swap.wav')
        this.load.audio('sfx-lose', './assets/sound/sfx-lose.wav')
        this.load.audio('sfx-perfect', './assets/sound/sfx-perfect.wav')
        this.load.audio('music-menu', './assets/sound/music-menu.wav')
        this.load.audio('music-play', './assets/sound/music-play.wav')
        this.load.audio('music-end', './assets/sound/music-end.wav')
    }

    create() {
        // Animation configuration
        this.anims.create({
            key: 'break',
            frames: this.anims.generateFrameNumbers('break', { start: 0, end: 9, first: 0 }),
            frameRate: 15
        })
        this.anims.create({
            key: 'player-run',
            frames: this.anims.generateFrameNumbers('player-run', { start: 0, end: 9, first: 0 }),
            frameRate: 15
        })
        this.anims.create({
            key: 'player-jump',
            frames: this.anims.generateFrameNumbers('player-jump', { start: 0, end: 9, first: 0 }),
            frameRate: 15
        })
        this.anims.create({
            key: 'player-punch',
            frames: this.anims.generateFrameNumbers('player-punch', { start: 0, end: 9, first: 0 }),
            frameRate: 15
        })
        this.anims.create({
            key: 'player-kick',
            frames: this.anims.generateFrameNumbers('player-kick', { start: 0, end: 9, first: 0 }),
            frameRate: 15
        })
        this.anims.create({
            key: 'player-swap',
            frames: this.anims.generateFrameNumbers('player-swap', { start: 0, end: 9, first: 0 }),
            frameRate: 15
        })
        this.anims.create({
            key: 'sparkles',
            frames: this.anims.generateFrameNumbers('sparkles', { start: 0, end: 9, first: 0 }),
            frameRate: 15
        })

        // Display menu text
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(screen_width * 1 / 2, screen_height * 1 / 3, 'TAG-TEAM', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#00FF00'
        menuConfig.color = '#000'
        this.add.text(screen_width * 1 / 2, screen_height * 2 / 3, 'Press SPACE to begin', menuConfig).setOrigin(0.5)

        // Bind key inputs
        KEYS = {
            SPACE: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
            W: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            UP: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            S: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            DOWN: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        }
    }

    update(time, delta) {
        if (Phaser.Input.Keyboard.JustDown(KEYS.SPACE)) {
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
    }
}