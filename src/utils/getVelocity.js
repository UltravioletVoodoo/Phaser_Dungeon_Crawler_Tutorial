import { DIRECTION } from "./direction";

export default function getVelocity(dir, speed) {
    switch(dir) {
        case DIRECTION.RIGHT:
            return {x: speed, y: 0}
        case DIRECTION.LEFT:
            return {x: -speed, y: 0}
        case DIRECTION.UP:
            return {x: 0, y: -speed}
        case DIRECTION.DOWN:
            return {x: 0, y: speed}
        default:
            return {x: 0, y: 0}
    }
}