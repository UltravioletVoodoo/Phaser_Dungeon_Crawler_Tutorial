import Phaser from 'phaser'

export default class Skeleton extends Phaser.Physics.Arcade.Sprite {

    speed

    constructor(scene,  x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        this.anims.play('skeleton-idle')
        this.speed = 50
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt)

        
    }
}