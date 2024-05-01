import { Ticker, Text } from "pixi.js";
import { Paddle, Ball } from "../sprites";
import { LargeFont, SmallFont, TinyFont } from "../fonts";
import { BaseScene } from "./BaseScene";

export class PlayScene extends BaseScene {
    private readonly PADDLE_WIDTH = 5
    private readonly PADDLE_HEIGHT = 30
    private readonly BALL_LENGTH = 5

    private player1: Paddle
    private player2: Paddle

    private ball: Ball

    private player1Score: Text
    private player2Score: Text
    private fpsText: Text
    private servingText: Text
    private winningText: Text

    private gameState: "serve" | "play" | "win"
    private servingPlayer: "Player 1" | "Player 2"

    constructor(windowWidth: number, windowHeight: number, document: Document) {
        super(windowWidth, windowHeight, document)

        const p1XPos = 10
        const p1YPos = 30
        this.player1 = new Paddle(this.WINDOW_WIDTH, this.WINDOW_HEIGHT, p1XPos, p1YPos, this.PADDLE_WIDTH, this.PADDLE_HEIGHT)
        this.player1.mapControls("w", "s")
        this.addChild(this.player1)

        const p2XPos = this.WINDOW_WIDTH - 10 - this.PADDLE_WIDTH
        const p2YPos = this.WINDOW_HEIGHT - 30 - (this.PADDLE_HEIGHT / 2)
        this.player2 = new Paddle(this.WINDOW_WIDTH, this.WINDOW_HEIGHT, p2XPos, p2YPos, this.PADDLE_WIDTH, this.PADDLE_HEIGHT)
        this.player2.mapControls("ArrowUp", "ArrowDown")
        this.addChild(this.player2)

        const ballXPos = (this.WINDOW_WIDTH / 2) - (this.BALL_LENGTH / 2)
        const ballYPos = (this.WINDOW_HEIGHT / 2) - (this.BALL_LENGTH / 2)
        this.ball = new Ball(this.WINDOW_WIDTH, this.WINDOW_HEIGHT, ballXPos, ballYPos, this.BALL_LENGTH)
        this.addChild(this.ball)

        this.player1Score = new Text({ text: this.player1.Score, style: LargeFont })
        this.player2Score = new Text({ text: this.player2.Score, style: LargeFont })

        this.player1Score.x = (this.WINDOW_WIDTH / 2) - 50
        this.player2Score.x = (this.WINDOW_WIDTH / 2) + 50

        this.player1Score.y = (this.WINDOW_HEIGHT / 2) - (this.player1Score.height / 2)
        this.player2Score.y = (this.WINDOW_HEIGHT / 2) - (this.player2Score.height / 2)

        this.addChild(this.player1Score)
        this.addChild(this.player2Score)

        this.fpsText = new Text({ text: `FPS: -`, style: TinyFont })
        this.fpsText.x = 20
        this.fpsText.y = 10
        this.addChild(this.fpsText)

        this.gameState = "serve"
        this.servingPlayer = Math.random() * 10 > 5 ? "Player 1" : "Player 2"

        this.servingText = new Text({ text: `${this.servingPlayer} is serving\nPress <a> to serve`, style: TinyFont })
        this.servingText.x = (this.WINDOW_WIDTH / 2) - (this.servingText.width / 2)
        this.servingText.y = 20
        this.addChild(this.servingText)

        this.winningText = new Text({ text: "", style: SmallFont })
        this.winningText.x = (this.WINDOW_WIDTH / 2) - (this.winningText.width / 2)
        this.winningText.y = 20
        this.addChild(this.winningText)
    }

    public override update(dt: Ticker, keysPressed: Record<string, boolean>) {
        this.player1Score.text = this.player1.Score
        this.player2Score.text = this.player2.Score

        this.winningText.text = ""
        this.servingText.text = ""

        switch (this.gameState) {
            case "play":
                this.playStateUpdate(dt, keysPressed)
                break
            case "serve":
                this.serveStateUpdate(keysPressed)
                break
            case "win":
                this.winStateUpdate(keysPressed)
                break
        }

    }

    private winStateUpdate(keysPressed: Record<string, boolean>) {
        const winningPlayer = this.player1.Score > this.player2.Score ? "Player 1" : "Player 2"
        this.winningText.text = `${winningPlayer} wins !!!\nPress <a> to reset game`
        this.winningText.x = (this.WINDOW_WIDTH / 2) - (this.winningText.width / 2)

        if (keysPressed["a"]) {
            this.gameState = "serve"
            this.player1.Score = 0
            this.player2.Score = 0
        }

    }

    private serveStateUpdate(keysPressed: Record<string, boolean>) {
        if (keysPressed["a"]) {
            this.ball.serveBall(this.servingPlayer)
            this.gameState = "play"
        }

        this.servingText.text = `${this.servingPlayer} is serving\nPress <a> to serve`
    }

    private playStateUpdate(dt: Ticker, keysPressed: Record<string, boolean>) {
        this.servingText.text = ""
        this.player1.update(dt, keysPressed)
        this.player2.update(dt, keysPressed)
        this.ball.update(dt)



        this.fpsText.text = `FPS: ${dt.FPS.toFixed(0)}`

        if (this.ball.isCollision(this.player1) || this.ball.isCollision(this.player2)) {
            this.ball.changeDirectionAfterCollision(dt)
        }

        if (this.ball.x < 0) {
            this.player2.Score += 1
            this.ball.reset()
            this.gameState = "serve"
            this.servingPlayer = "Player 1"
        }

        if (this.ball.x > this.WINDOW_WIDTH) {
            this.player1.Score += 1
            this.ball.reset()
            this.gameState = "serve"
            this.servingPlayer = "Player 2"
        }

        if (this.player1.Score === 10 || this.player2.Score === 10) {
            this.gameState = "win"
        }
    }
}