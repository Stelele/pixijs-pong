import { Graphics, Ticker } from "pixi.js";

export class Paddle extends Graphics {
    private readonly MOVE_DISTANCE = 5
    private readonly WINDOW_WIDTH: number;
    private readonly WINDOW_HEIGHT: number;
    private upControl: string = ""
    private downControl: string = ""

    constructor(
        windowWidth: number,
        windowHeight: number,
        xpos: number,
        ypos: number,
        width: number,
        height: number
    ) {
        super()

        this.WINDOW_WIDTH = windowWidth
        this.WINDOW_HEIGHT = windowHeight

        this.rect(0, 0, width, height)
        this.fill(0xffffff)
        this.x = xpos
        this.y = ypos
    }

    public mapControls(upControl: string, downControl: string) {
        this.upControl = upControl
        this.downControl = downControl
    }

    public update(dt: Ticker, keysPressed: Record<string, boolean>) {
        this.onKeyDown(keysPressed)
    }

    private async onKeyDown(keysPressed: Record<string, boolean>) {
        if (keysPressed[this.upControl]) {
            this.position.y = Math.max(5, this.position.y - this.MOVE_DISTANCE)
        }

        if (keysPressed[this.downControl]) {
            this.position.y = Math.min(this.WINDOW_HEIGHT - this.height - 5, this.position.y + this.MOVE_DISTANCE)
        }
    }
}