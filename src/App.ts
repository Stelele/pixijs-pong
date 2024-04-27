import { Application, Ticker } from "pixi.js";
import { Scene } from "./Scene";

export class App {
    private app?: Application
    private scene?: Scene

    private readonly WIDTH = 432
    private readonly HEIGHT = 237

    private window: Window
    private document: Document
    private appLocation: HTMLDivElement

    private keysPressed: Record<string, boolean> = {}

    constructor(window: Window, document: Document) {
        this.window = window
        this.document = document
        this.appLocation = document.getElementById("pixi-content") as HTMLDivElement
        this.initializeApp()
    }

    private async initializeApp() {
        this.app = new Application()
        await this.app.init({
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: 0x0f0f0f,
            resizeTo: window
        })

        this.appLocation.appendChild(this.app.canvas)

        this.scene = new Scene(this.WIDTH, this.HEIGHT)
        this.scaleScene()
        this.app.stage.addChild(this.scene);

        this.document.addEventListener("keydown", (event) => this.onKeyDown(event, this))
        this.document.addEventListener("keyup", (event) => this.onKeyUp(event, this))

        this.app.ticker.add((dt) => this.onUpdate(dt))

    }

    private onKeyDown(event: KeyboardEvent, _app: App) {
        _app.keysPressed[event.key] = true
    }

    private onKeyUp(event: KeyboardEvent, _app: App) {
        _app.keysPressed[event.key] = false
    }

    private onUpdate(dt: Ticker) {
        if (!this.scene) return
        console.log(`Update: ${dt}`)
        this.scene.update(dt, this.keysPressed)
    }

    private scaleScene() {
        if (!this.app || !this.scene) return

        let { width, height } = this.app.screen
        this.scene.scale.x = width / this.WIDTH;
        this.scene.scale.y = height / this.HEIGHT;
        this.scene.x = this.app.screen.width / 2 - width / 2;
        this.scene.y = this.app.screen.height / 2 - height / 2;
    }

}