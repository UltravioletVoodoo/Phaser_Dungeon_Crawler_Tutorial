import { DIRECTION } from "./direction"

export default function getDirection(source, target) {
    const sC = source.body.center
    const tC = target.body.center
    const sX = sC.x
    const sY = sC.y
    const tX = tC.x
    const tY = tC.y

    let vector = {
        x: tX - sX,
        y: tY - sY
    }

    if (Math.abs(vector.x) > Math.abs(vector.y)) {
        if (vector.x > 0) return DIRECTION.RIGHT
        return DIRECTION.LEFT
    } else {
        if (vector.y > 0) return DIRECTION.DOWN
        return DIRECTION.UP
    }
}