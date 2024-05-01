import { Ticker } from "pixi.js";
import { BaseSprite } from "./BaseSprite";

export class Paddle extends BaseSprite {
    private readonly MOVE_DISTANCE = 6
    private upControl: string = ""
    private downControl: string = ""
    private _score = 0

    constructor(
        windowWidth: number,
        windowHeight: number,
        xpos: number,
        ypos: number,
        width: number,
        height: number
    ) {
        super(windowWidth, windowHeight)


        this.rect(0, 0, width, height)
        this.fill(0xffffff)
        this.x = xpos
        this.y = ypos
    }

    public mapControls(upControl: string, downControl: string) {
        this.upControl = upControl
        this.downControl = downControl
    }

    public override update(dt: Ticker, keysPressed: Record<string, boolean>) {
        this.onKeyDown(dt, keysPressed)
    }

    private async onKeyDown(dt: Ticker, keysPressed: Record<string, boolean>) {
        if (keysPressed[this.upControl]) {
            this.position.y = Math.max(5, this.position.y - this.MOVE_DISTANCE * dt.deltaTime)
        }

        if (keysPressed[this.downControl]) {
            this.position.y = Math.min(this.WINDOW_HEIGHT - this.height - 5, this.position.y + this.MOVE_DISTANCE * dt.deltaTime)
        }
    }

    public get Score() { return this._score }
    public set Score(value: number) { this._score = value }
}