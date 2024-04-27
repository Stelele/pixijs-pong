import { Graphics } from "pixi.js";

export class Ball extends Graphics {
    private readonly WINDOW_WIDTH: number
    private readonly WINDOW_HEIGHT: number

    constructor(
        windowWidth: number,
        windowHeight: number,
        xPos: number,
        yPos: number,
        length: number
    ) {
        super()

        this.WINDOW_WIDTH = windowWidth
        this.WINDOW_HEIGHT = windowHeight

        this.rect(0, 0, length, length)
        this.fill(0xffffff)

        this.x = xPos
        this.y = yPos
    }
}