import Phaser from "phaser";

export const Juego = () => {

    var level = 1;
    
                    class MainScene extends Phaser.Scene {
                        constructor() {
                        super('gameScene');
            }
                    preload() {
                    this.load.baseURL = "./";
                    this.load.image('jungle', 'img/background.png')
                    this.load.image('platform', 'img/platform1.png');
                    this.load.image('ground', 'img/platform4.png');
                    this.load.image('star', 'img/star.png');
                    this.load.image('bomb', 'img/bomb.png');
                    this.load.image('controlsPlayer1', 'img/Player1.png');
                    this.load.image('controlsPlayer2', 'img/Player2.png');

                    this.load.spritesheet('dude', 'img/dude.png', {frameWidth: 32, frameHeight: 48 });
                    this.load.spritesheet('secondPlayer', 'img/secondPlayer.png', {frameWidth: 32, frameHeight: 48 });

            }

                    create() {
                        this.add.image(400, 265, 'jungle').setScale(2);
                        var platforms = this.physics.add.staticGroup();
                        platforms.create(180, 530,'ground')
                        platforms.create(560, 530,'ground')
                        platforms.create(800, 530,'platform')
                        platforms.create(180, 500,'ground')
                        platforms.create(560, 500,'ground')
                        platforms.create(800, 500,'platform')

                        if (level == 1) {
                            platforms.create(400, 400,'ground')
                            platforms.create(300, 290,'ground')
                            platforms.create(150, 190,'ground')
                            platforms.create(730, 160,'ground')
                        }
                    }

                    update() {
                    }
        }

                    class Menu extends Phaser.Scene {
                        constructor() {
                        super('menuScene');
        }
                    preload() {

                    }

                    create() {
                    }

                    update() {
                    }
    }

                    class Level extends Phaser.Scene {
                        constructor() {
                        super('levelScene');
        }
                    preload() {

                    }

                    create() {
                    }

                    update() {
                    }
    }

                    class Mode extends Phaser.Scene {
                        constructor() {
                        super('modeScene');
        }
                    preload() {

                    }

                    create() {
                    }

                    update() {
                    }
    }

                    class Controls extends Phaser.Scene {
                        constructor() {
                        super('controlsScene');
        }
                    preload() {

                    }

                    create() {
                    }

                    update() {
                    }
    }

                    class EndGame extends Phaser.Scene {
                        constructor() {
                        super('endScene');
        }
                    preload() {

                    }

                    create() {
                    }

                    update() {
                    }
    }


                    const config = {
                        type: Phaser.AUTO,
                    width: 800,
                    height: 530,
                    scene: [MainScene, Menu, Level, Mode, Controls, EndGame],
                    scale: {
                        mode: Phaser.Scale.FIT
        }, physics: {
            default: 'arcade',
                    arcade: {
                        debug: false,
                    gravity: {
                        y: 300,
                },
            },
        },
    };

                    new Phaser.Game(config);
    }; 

