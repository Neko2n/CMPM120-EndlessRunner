//  Title: Tag-Team
//  Name: Niko DiStefano
//  Date: 2/10/2025
//  Hours (~): 12
//
//  I felt that adding an element of "switching" between two tracks
//  not only increases user engagement by giving them two inputs rather than
//  just one (the "jump" button), but forces them to look further ahead and
//  be more on-edge about whether the track is going to force them to switch
//  or not. In this regard, I think the tilt of Tag-Team makes it more engaging
//  than a typical "dinosaur game" endless runner.

'use strict'

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [ Menu, Play ]
}

let game: Phaser.Game = new Phaser.Game(config)

let screen_width = game.config.width as number
let screen_height = game.config.height as number
let KEYS: {
    SPACE: Phaser.Input.Keyboard.Key,   // Punch
    W: Phaser.Input.Keyboard.Key,       // Jump
    UP: Phaser.Input.Keyboard.Key,      // Jump
    S: Phaser.Input.Keyboard.Key,       // Swap
    DOWN: Phaser.Input.Keyboard.Key     // Swap
}
