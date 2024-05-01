import { Graphics, Ticker } from "pixi.js";

export abstract class BaseSprite extends Graphics {
    protected readonly WINDOW_WIDTH
    protected readonly WINDOW_HEIGHT

    constructor(windowWidth: number, windowHeight: number) {
        super()

        this.WINDOW_WIDTH = windowWidth
        this.WINDOW_HEIGHT = windowHeight
    }

    public abstract update(dt: Ticker, keysPressed: Record<string, boolean>): void

    public isCollision(sprite: BaseSprite) {
        if (this.x > sprite.x + sprite.width) return false
        if (this.x + this.width < sprite.x) return false
        if (this.y > sprite.y + sprite.height) return false
        if (this.y + this.height < sprite.y) return false
        return true
    }
}