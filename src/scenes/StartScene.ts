import { Text, Ticker } from "pixi.js";
import { BaseScene } from "./BaseScene";
import { HugeFont, SmallFont } from "../fonts";

export class StartScene extends BaseScene {
    constructor(windowWidth: number, windowHeight: number, document: Document) {
        super(windowWidth, windowHeight, document)

        const titleText = new Text({ text: "This is Pong!!!", style: HugeFont })
        titleText.x = (this.WINDOW_WIDTH / 2) - (titleText.width / 2)
        titleText.y = 50
        this.addChild(titleText)

        const startText = new Text({ text: "Press <SPACE> to start game", style: SmallFont })
        startText.x = (this.WINDOW_WIDTH / 2) - (startText.width / 2)
        startText.y = 100
        this.addChild(startText)

        const player1ControlsText = new Text({ text: "Player 1\nUp: <w>\nDown: <s>", style: SmallFont })
        player1ControlsText.x = 10
        player1ControlsText.y = this.WINDOW_HEIGHT - player1ControlsText.height - 10
        this.addChild(player1ControlsText)

        const player2ControlsText = new Text({ text: "Player 2\nUp: <up arrow>\nDown: <down arrow>", style: SmallFont })
        player2ControlsText.x = this.WINDOW_WIDTH - player2ControlsText.width - 10
        player2ControlsText.y = this.WINDOW_HEIGHT - player2ControlsText.height - 10
        this.addChild(player2ControlsText)
    }

    public override update(_dt: Ticker, keysPressed: Record<string, boolean>): void {
        if (keysPressed[" "]) {
            this.emitSceneChange("play")
        }
    }
}