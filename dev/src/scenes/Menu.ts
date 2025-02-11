class Menu extends Phaser.Scene {

    music_playing = false
    play_text: Phaser.GameObjects.Sprite
    title_text: Phaser.GameObjects.Sprite

    constructor() {
        super('menuScene')
    }

    preload() {
        // load images/tile sprites
        this.load.image('bg', './assets/image/bg.png')
        this.load.image('bg-layer-0', './assets/image/bg-layer-0.png')
        this.load.image('bg-layer-1', './assets/image/bg-layer-1.png')
        this.load.image('bg-layer-2', './assets/image/bg-layer-2.png')
        this.load.image('floor', './assets/image/floor.png')
        this.load.image('obstacle', './assets/image/obstacle.png')
        this.load.image('obstacle-breakable', './assets/image/obstacle-breakable.png')
        this.load.image('ui-perfect', './assets/image/ui-perfect.png')
        this.load.image('ui-lose', './assets/image/ui-lose.png')
        this.load.image('ui-title', './assets/image/ui-title.png')
        this.load.image('ui-play', './assets/image/ui-play.png')
        this.load.image('ui-controls', './assets/image/ui-controls.png')
        this.load.image('ui-credits', './assets/image/ui-credits.png')

        // load spritesheets
        this.load.spritesheet('player-run', './assets/sprite/player-run.png', {
            frameWidth: 256,
            frameHeight: 256,
            startFrame: 0,
            endFrame: 7
        })
        this.load.spritesheet('player-jump', './assets/sprite/player-jump.png', {
            frameWidth: 256,
            frameHeight: 256,
            startFrame: 0,
            endFrame: 7
        })
        this.load.spritesheet('player-attack', './assets/sprite/player-attack.png', {
            frameWidth: 256,
            frameHeight: 256,
            startFrame: 0,
            endFrame: 7
        })

        // load audio
        this.load.audio('sfx-select', './assets/sound/sfx-select.wav')
        this.load.audio('sfx-attack', './assets/sound/sfx-attack.mp3')
        this.load.audio('sfx-break', './assets/sound/sfx-break.mp3')
        this.load.audio('sfx-lose', './assets/sound/sfx-lose.mp3')
        this.load.audio('sfx-perfect', './assets/sound/sfx-perfect.mp3')
        this.load.audio('music-menu', './assets/sound/music-menu.mp3')
        this.load.audio('music-play', './assets/sound/music-play.mp3')
        this.load.audio('music-end', './assets/sound/music-end.mp3')
    }

    create() {
        // Animation configuration
        this.anims.create({
            key: 'player-run',
            frames: this.anims.generateFrameNumbers('player-run', { start: 0, end: 7, first: 0 }),
            frameRate: 16,
            repeat: -1
        })
        this.anims.create({
            key: 'player-jump',
            frames: this.anims.generateFrameNumbers('player-jump', { start: 0, end: 7, first: 0 }),
            frameRate: 32
        })
        this.anims.create({
            key: 'player-attack',
            frames: this.anims.generateFrameNumbers('player-attack', { start: 0, end: 7, first: 0 }),
            frameRate: 32
        })

        this.title_text = this.add.sprite(game.screen_width/2, game.screen_height * 5/12, 'ui-title').setOrigin(0.5, 0.5).setScale(0.7)
        this.play_text = this.add.sprite(game.screen_width/2, game.screen_height/2, 'ui-play').setOrigin(0.5, 0.5).setScale(0.5)
        const controls_text = this.add.sprite(0, game.screen_height, 'ui-controls').setOrigin(0, 1).setScale(0.5)
        const credits_text = this.add.sprite(game.screen_width, game.screen_height, 'ui-credits').setOrigin(1, 1).setScale(0.5)
        
        // Bind key inputs
        game.setScene(this)

        this.music_playing = true
    }

    update(time: number, delta: number) {
        if (Phaser.Input.Keyboard.JustUp(game.KEYS.SPACE)) {
            this.music_playing = false
            this.sound.stopByKey('music-menu')
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }

        // loop menu music
        if (this.music_playing && !this.sound.isPlaying('music-menu')) {
            this.sound.play('music-menu')
        }

        // play text animations
        if (this.play_text != undefined) {
            this.play_text.setY(game.screen_height/2 + Math.sin(time/100) * game.getScale() * 3)
        }
        if (this.title_text != undefined) {
            this.title_text.setRotation(Math.sin(time/1000) / 10)
            this.title_text.setY(game.screen_height * 5/12 + Math.sin(time/400) * game.getScale() * 3)
        }
    }
}