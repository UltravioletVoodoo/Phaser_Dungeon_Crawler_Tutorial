import Phaser from 'phaser'
import { debugDraw } from '../utils/debug'

export default class Game extends Phaser.Scene {

    cursors
    fauna

	constructor() {
		super('game')
	}

	preload() {
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    create() {
        const map = this.make.tilemap({ key: 'dungeon' })
        const tileset = map.addTilesetImage('dungeon', 'tiles', 16, 16, 1, 2)

        map.createStaticLayer('floor', tileset)
        map.createStaticLayer('upWalls', tileset)
        this.fauna = this.physics.add.sprite(200, 350, 'fauna', 'walk-down-3.png')
        map.createStaticLayer('downWalls', tileset)
        map.createStaticLayer('sideWalls', tileset)
        
        const collisionLayer = map.createStaticLayer('collision', tileset)
        this.fauna.body.setSize(this.fauna.width * 0.5, this.fauna.height * 0.8) // make her hitbox smaller
        collisionLayer.setCollisionByProperty({ collides: true })


        debugDraw(collisionLayer, this, {red: 255, green: 255, blue: 0}) // Debug layers with collision



        this.anims.create({
            key: 'fauna-idle-down',
            frames: [{ key: 'fauna', frame: 'walk-down-3.png' }]
        })

        this.anims.create({
            key: 'fauna-idle-up',
            frames: [{ key: 'fauna', frame: 'walk-up-3.png' }]
        })

        this.anims.create({
            key: 'fauna-idle-side',
            frames: [{ key: 'fauna', frame: 'walk-side-3.png' }]
        })

        this.anims.create({
            key: 'fauna-run-down',
            frames: this.anims.generateFrameNames('fauna', { start: 1, end: 8, prefix: 'run-down-', suffix: '.png' }),
            repeat: -1,
            frameRate: 15
        })

        this.anims.create({
            key: 'fauna-run-up',
            frames: this.anims.generateFrameNames('fauna', { start: 1, end: 8, prefix: 'run-up-', suffix: '.png' }),
            repeat: -1,
            frameRate: 15
        })

        this.anims.create({
            key: 'fauna-run-side',
            frames: this.anims.generateFrameNames('fauna', { start: 1, end: 8, prefix: 'run-side-', suffix: '.png' }),
            repeat: -1,
            frameRate: 15
        })

        this.fauna.anims.play('fauna-idle-down')

        this.physics.add.collider(this.fauna, collisionLayer)

        this.cameras.main.startFollow(this.fauna, true)
    }

    update() {
        if (!this.cursors || !this.fauna) return

        const speed = 100

        if (this.cursors.left.isDown) { // If the left key is down
            this.fauna.anims.play('fauna-run-side', true)
            this.fauna.setVelocity(-speed, 0)
            // Need to flip on the left because we dont have 2 sets of sprites
            this.fauna.scaleX = -1
            this.fauna.body.offset.x = 24 // We flipped her left, so she got offset to the left, we need to correct
        } else if (this.cursors.right.isDown) { // Going right
            this.fauna.anims.play('fauna-run-side', true)
            this.fauna.setVelocity(speed, 0)
            // Need to flip BACK if we already flipped
            this.fauna.scaleX = 1
            this.fauna.body.offset.x = 8 // We need to undo the offset we added when we flipped too
        } else if (this.cursors.up.isDown) {
            this.fauna.anims.play('fauna-run-up', true)
            this.fauna.setVelocity(0, -speed)
        } else if (this.cursors.down.isDown) {
            this.fauna.anims.play('fauna-run-down', true)
            this.fauna.setVelocity(0, speed)
        } else { // Doing nothing, need to idle
            const parts = this.fauna.anims.currentAnim.key.split('-')
            parts[1] = 'idle'
            this.fauna.anims.play(parts.join('-'))
            this.fauna.setVelocity(0, 0)
        }
    }
}
