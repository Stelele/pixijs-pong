import { Container, Ticker } from "pixi.js";
import { GameSceneName } from ".";

export abstract class BaseScene extends Container {
    protected readonly WINDOW_WIDTH: number
    protected readonly WINDOW_HEIGHT: number
    protected readonly DOCUMENT: Document

    constructor(windowWidth: number, windowHeight: number, document: Document) {
        super()
        this.WINDOW_WIDTH = windowWidth
        this.WINDOW_HEIGHT = windowHeight
        this.DOCUMENT = document
    }

    protected emitSceneChange(newScene: GameSceneName) {
        const event = new CustomEvent<{ newScene: GameSceneName }>("scene-change", {
            bubbles: true,
            detail: { newScene }
        })

        document.dispatchEvent(event)
    }

    public abstract update(dt: Ticker, keysPressed: Record<string, boolean>): void;
}