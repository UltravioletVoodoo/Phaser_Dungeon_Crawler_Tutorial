import Phaser from 'phaser'
import getDistance from '../utils/getDistance'
import getVelocity from '../utils/getVelocity'
import getDirection from '../utils/getDirection'

export default class Skeleton extends Phaser.Physics.Arcade.Sprite {

    speed
    chaseDistance

    constructor(scene,  x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        this.anims.play('skeleton-idle')
        this.speed = 50
        this.chaseDistance = 50
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt)

        if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
            this.anims.play('skeleton-idle', true)
        } else {
            this.anims.play('skeleton-run', true)
        }
    }

    chaseCharacter(character) {
        const distance = getDistance(this, character)
        if (distance < this.chaseDistance) {
            const velocity = getVelocity(getDirection(this, character), this.speed)
            this.setVelocity(velocity.x, velocity.y)
        } else {
            this.setVelocity(0, 0)
        }
    }
}