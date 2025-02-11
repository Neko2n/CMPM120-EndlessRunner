//  Title: Box Buster
//  Name: Niko DiStefano
//  Date: 2/10/2025
//  Hours (~): 20
//
//  I felt that adding an element of timing your key presses to
//  "bust" boxes adds more engagement with the endless runner genre.
//  It was fairly difficult to implement for someone who's new to using
//  Phaser's Arcade physics--I'm pretty proud of how it turned out.
//  Especially the "perfect timing" mechanic. The risk-reward of this
//  mechanic makes the game especially fun.

'use strict'

const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [ Menu, Play ]
}

class Game extends Phaser.Game {

    screen_width: number
    screen_height: number
    speed: number = 300

    KEYS: {
        SPACE: Phaser.Input.Keyboard.Key,   // Punch
        W: Phaser.Input.Keyboard.Key,       // Jump
        UP: Phaser.Input.Keyboard.Key,      // Jump
        S: Phaser.Input.Keyboard.Key,       // Swap
        DOWN: Phaser.Input.Keyboard.Key,    // Swap
        F: Phaser.Input.Keyboard.Key,       // Attack
        CTRL: Phaser.Input.Keyboard.Key     // Attack
    }

    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config)
        this.screen_width = config.width as number
        this.screen_height = config.height as number
    }

    public getScale() {
        return 960 / this.screen_height
    }

    public setScene(scene: Phaser.Scene) {
        this.KEYS = {
            SPACE: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
            W: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            UP: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            S: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            DOWN: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
            F: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F),
            CTRL: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL)
        }
    }
}

const game: Game = new Game(config)
