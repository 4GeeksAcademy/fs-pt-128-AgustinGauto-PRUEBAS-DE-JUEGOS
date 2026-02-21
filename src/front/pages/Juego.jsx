import Phaser from "phaser";
import { useCallback, useEffect } from "react";

export const Juego = () => {

    var level = 1;
    var playerQuantity = 2;
    var player = "";
    var secondPlayer = "";
    var stars = "";
    var bombs = "";


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

            this.load.spritesheet('dude', 'img/dude.png', { frameWidth: 32, frameHeight: 48 });
            this.load.spritesheet('secondPlayer', 'img/secondPlayer.png', { frameWidth: 32, frameHeight: 48 });

        }

        create() {
            this.add.image(400, 265, 'jungle').setScale(2);
            var platforms = this.physics.add.staticGroup();
            platforms.create(180, 530, 'ground')
            platforms.create(560, 530, 'ground')
            platforms.create(800, 530, 'platform')
            platforms.create(180, 500, 'ground')
            platforms.create(560, 500, 'ground')
            platforms.create(800, 500, 'platform')

            if (level == 1) {
                platforms.create(400, 400, 'ground')
                platforms.create(300, 290, 'ground')
                platforms.create(150, 190, 'ground')
                platforms.create(730, 160, 'ground')
            }

            player = this.physics.add.sprite(280, 450, 'dude');
            player.setCollideWorldBounds(true);
            player.setBounce(0.1);
            player.score = 0;
            this.physics.add.collider(player, platforms);

            if (playerQuantity == 2) {
                secondPlayer = this.physics.add.sprite(380, 450, 'secondPlayer');
                secondPlayer.setCollideWorldBounds(true);
                secondPlayer.setBounce(0.1);
                secondPlayer.score = 0;
                this.physics.add.collider(secondPlayer, platforms);
            }

            stars = this.physics.add.group({
                key: 'star',
                repeat: 11,
                setXY: { x: 12, y: 0, stepX: 50 }
            });
            this.physics.add.collider(stars, platforms)
            stars.children.iterate(function (child) {
                child.setBounce(0.3)
            })

            this.physics.add.overlap(player, stars, collectStar, null, this);

            bombs = this.physics.add.group()
            this.physics.add.collider(bombs, platforms)
            this.physics.add.collider(bombs, player, hitBomb, null, this)

            function collectStar(player, star) {
                star.disableBody(true, true);
                player.score += 10;

                if (stars.countActive(true) === 0) {
                    var bomb = bombs.create(Phaser.Math.Between(0, 800), 16, 'bomb');
                    bomb.setBounce(1);
                    bomb.setCollideWorldBounds(true);
                    bomb.setVelocity(Phaser.Math.Between(-400 * level, 400 * level), 20);
                    stars.children.iterate(function (child) {
                        child.enableBody(true, child.x, 0, true, true);

                    })
                }
            }

            function hitBomb(elemnto, bomb) {
                if (playerQuantity == 1) {

                    this.physics.pause();
                    player.setTint(0xff0000);
                    player.anims.play('turn')

                    this.time.addEvent({
                        delay: 1500,
                        loop: false,
                        callback: () => {
                            this.scene.start("endScene")
                        }
                    })
                } else {
                    if (player.score - 50 <= 0) {
                        player.score = 0;
                    } else {
                        player.score -= 50;
                    }
                }
            }


            function hitBombP2(elemnto, bomb) {
                if (secondPlayer.score - 50 <= 0) {
                    secondPlayer.score = 0;
                } else {
                    secondPlayer.score -= 50;
                }
            }
            if (playerQuantity == 2) {

                this.physics.add.overlap(secondPlayer, stars, collectStarPlayer2, null, this);
                this.physics.add.collider(bombs, secondPlayer, hitBombP2, null, this)



                function collectStarPlayer2(player, star) {
                    star.disableBody(true, true);
                    secondPlayer.score += 10;



                    if (stars.countActive(true) === 0) {
                        var bomb = bombs.create(Phaser.Math.Between(0, 800), 16, 'bomb');
                        bomb.setBounce(1);
                        bomb.setCollideWorldBounds(true);
                        bomb.setVelocity(Phaser.Math.Between(-400 * level, 400 * level), 20);
                        stars.children.iterate(function (child) {
                            child.enableBody(true, child.x, 0, true, true);
                        })
                    }
                }
            }




            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1,
            });

            this.anims.create({
                key: 'turn',
                frames: [{ key: 'dude', frame: 4 }],
                frameRate: 10,
                repeat: -1,
            });

            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
                frameRate: 10,
                repeat: -1,
            });

            this.anims.create({
                key: 'leftP2',
                frames: this.anims.generateFrameNumbers('secondPlayer', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1,
            });

            this.anims.create({
                key: 'turnP2',
                frames: [{ key: 'secondPlayer', frame: 4 }],
                frameRate: 10,
                repeat: -1,
            });

            this.anims.create({
                key: 'rightP2',
                frames: this.anims.generateFrameNumbers('secondPlayer', { start: 5, end: 8 }),
                frameRate: 10,
                repeat: -1,
            });


        }

        update() {
            var cursors = this.input.keyboard.createCursorKeys();

            if (cursors.left.isDown) {
                player.setVelocityX(-160);
                player.anims.play('left', true)
            } else if (cursors.right.isDown) {
                player.setVelocityX(160);
                player.anims.play('right', true)
            } else {
                player.setVelocityX(0);
                player.anims.play('turn', true)
            }

            if (cursors.up.isDown && player.body.touching.down) {
                player.setVelocityY(-300);

            }
            if (playerQuantity == 2) {
                var keyObjUp = this.input.keyboard.addKey('w')
                var player2Up = keyObjUp.isDown;

                var keyObjRight = this.input.keyboard.addKey('d')
                var player2Right = keyObjRight.isDown;

                var keyObjLeft = this.input.keyboard.addKey('a')
                var player2Left = keyObjLeft.isDown;

                if (player2Left) {
                    secondPlayer.setVelocityX(-160);
                    secondPlayer.anims.play('leftP2', true)
                } else if (player2Right) {
                    secondPlayer.setVelocityX(160);
                    secondPlayer.anims.play('rightP2', true)
                } else {
                    secondPlayer.setVelocityX(0);
                    secondPlayer.anims.play('turnP2', true)
                }

                if (player2Up && secondPlayer.body.touching.down) {
                    secondPlayer.setVelocityY(-300);
                }
            }
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

