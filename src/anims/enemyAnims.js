export function createSkeletonAnims(anims) {
    anims.create({
        key: 'skeleton-idle',
        frames: anims.generateFrameNames('skeleton', { start: 183, end: 186, prefix: 'tile', suffix: '.png'}),
        repeat: -1,
        frameRate: 10
    })

    anims.create({
        key: 'skeleton-run',
        frames: anims.generateFrameNames('skeleton', { start: 187, end: 190, prefix: 'tile', suffix: '.png'}),
        repeat: -1,
        frameRate: 10
    })
}