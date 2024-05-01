import { Application, Ticker } from "pixi.js";
import { GameSceneName, PlayScene } from "./scenes";
import { BaseScene } from "./scenes/BaseScene";
import { StartScene } from "./scenes/StartScene";

export class App {
    private app?: Application

    private readonly WIDTH = 432
    private readonly HEIGHT = 237

    private window: Window
    private document: Document
    private appLocation: HTMLDivElement

    private keysPressed: Record<string, boolean> = {}

    private scenes?: Record<GameSceneName, BaseScene>
    private currentScene?: BaseScene

    constructor(window: Window, document: Document) {
        this.window = window
        this.document = document
        this.appLocation = document.getElementById("pixi-content") as HTMLDivElement
        this.initializeApp()
    }

    private async initializeApp() {
        this.app = new Application()
        await this.app.init({
            resolution: this.window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: 0x0f0f0f,
            resizeTo: this.window,
            roundPixels: true,
        })

        this.appLocation.appendChild(this.app.canvas)

        this.scenes = {
            "play": this.scaleScene(new PlayScene(this.WIDTH, this.HEIGHT, this.document)),
            "start": this.scaleScene(new StartScene(this.WIDTH, this.HEIGHT, this.document))
        }

        this.currentScene = this.scenes["start"]
        this.app.stage.addChild(this.currentScene);

        this.document.addEventListener("keydown", (event) => this.onKeyDown(event, this))
        this.document.addEventListener("keyup", (event) => this.onKeyUp(event, this))
        this.document.addEventListener("scene-change", (event) => this.onSceneChange(event, this))

        this.app.ticker.add((dt) => this.onUpdate(dt))
    }

    private onKeyDown(event: KeyboardEvent, _app: App) {
        _app.keysPressed[event.key] = true
    }

    private onKeyUp(event: KeyboardEvent, _app: App) {
        _app.keysPressed[event.key] = false
    }

    private onUpdate(dt: Ticker) {
        if (!this.currentScene) return
        this.currentScene.update(dt, this.keysPressed)
    }

    private onSceneChange(event: Event, _app: App) {
        if (!_app.app || !_app.scenes) return

        const nextScene = (event as any as CustomEvent<{ newScene: GameSceneName }>).detail.newScene
        _app.currentScene = _app.scenes[nextScene]

        _app.app.stage.removeChildren()
        _app.app.stage.addChild(_app.currentScene)
    }

    private scaleScene(scene: BaseScene) {
        if (!this.app) throw new Error("App is undefined")

        let { width, height } = this.app.screen
        scene.scale.x = width / this.WIDTH;
        scene.scale.y = height / this.HEIGHT;
        scene.x = this.app.screen.width / 2 - width / 2;
        scene.y = this.app.screen.height / 2 - height / 2;

        return scene
    }
}