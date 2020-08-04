export default function getDistance(source, target) {
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

    return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2))
}