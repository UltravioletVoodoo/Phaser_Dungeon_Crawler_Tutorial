import Phaser from 'phaser'

export function debugDraw(layer, scene, color) {
    const debugGraphics = scene.add.graphics().setAlpha(0.75)

    layer.renderDebug(debugGraphics, {
        tileColor: null,
        collidingTileColor: new Phaser.Display.Color(color.red, color.green, color.blue, 255)
    })
}