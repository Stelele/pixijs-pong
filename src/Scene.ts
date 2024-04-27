import { Container, Ticker, Text } from "pixi.js";
import { Paddle } from "./sprites/Paddle";
import { Ball } from "./sprites/Ball";
import { PixelateFilter } from "pixi-filters";

export class Scene extends Container {
    private readonly PADDLE_WIDTH = 5
    private readonly PADDLE_HEIGHT = 20
    private readonly BALL_LENGTH = 5

    private readonly WINDOW_WIDTH
    private readonly WINDOW_HEIGHT

    private player1: Paddle
    private player2: Paddle

    private ball: Ball

    constructor(windowWidth: number, windowHeight: number) {
        super()

        this.WINDOW_WIDTH = windowWidth
        this.WINDOW_HEIGHT = windowHeight

        const p1XPos = 10
        const p1YPos = 30
        this.player1 = new Paddle(this.WINDOW_WIDTH, this.WINDOW_HEIGHT, p1XPos, p1YPos, this.PADDLE_WIDTH, this.PADDLE_HEIGHT)
        this.player1.mapControls("w", "s")

        const p2XPos = this.WINDOW_WIDTH - 10 - this.PADDLE_WIDTH
        const p2YPos = this.WINDOW_HEIGHT - 30 - (this.PADDLE_HEIGHT / 2)
        this.player2 = new Paddle(this.WINDOW_WIDTH, this.WINDOW_HEIGHT, p2XPos, p2YPos, this.PADDLE_WIDTH, this.PADDLE_HEIGHT)
        this.player2.mapControls("ArrowUp", "ArrowDown")

        const ballXPos = (this.WINDOW_WIDTH / 2) - (this.BALL_LENGTH / 2)
        const ballYPos = (this.WINDOW_HEIGHT / 2) - (this.BALL_LENGTH / 2)
        this.ball = new Ball(this.WINDOW_WIDTH, this.WINDOW_HEIGHT, ballXPos, ballYPos, this.BALL_LENGTH)

        const welcomeText = new Text({ text: "This is Pong", style: { fontSize: 16, fill: 0xffffff } })
        welcomeText.x = (this.WINDOW_WIDTH / 2) - (welcomeText.width / 2)
        welcomeText.y = 10


        this.addChild(this.player1)
        this.addChild(this.player2)
        this.addChild(this.ball)
        this.addChild(welcomeText)
    }

    public update(dt: Ticker, keysPressed: Record<string, boolean>) {
        this.player1.update(dt, keysPressed)
        this.player2.update(dt, keysPressed)
    }
}