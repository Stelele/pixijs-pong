import { Ticker } from "pixi.js";
import { BaseSprite } from "./BaseSprite";

export class Ball extends BaseSprite {

    private dx: number
    private dy: number

    private xPosStart: number
    private yPosStart: number

    private sounds: Record<string, HTMLAudioElement>

    constructor(
        windowWidth: number,
        windowHeight: number,
        xPosStart: number,
        yPosStart: number,
        length: number
    ) {
        super(windowWidth, windowHeight)

        this.rect(0, 0, length, length)
        this.fill(0xffffff)

        this.xPosStart = xPosStart
        this.yPosStart = yPosStart

        this.x = xPosStart
        this.y = yPosStart

        this.dx = 0
        this.dy = 0

        this.sounds = {
            "ball_hit_wall": new Audio('sounds/ball_hit_wall.wav'),
            "ball_hit_paddle": new Audio('sounds/paddle_hit_ball.wav')
        }

    }

    public update(dt: Ticker) {
        let dxUpdate = this.dx * dt.deltaTime
        let dyUpdate = this.dy * dt.deltaTime

        if (
            this.position.y + dyUpdate <= 5 ||
            this.position.y + dyUpdate >= this.WINDOW_HEIGHT - this.height - 5
        ) {
            this.dy *= -1
            dyUpdate = this.dy * dt.deltaTime
            this.sounds["ball_hit_wall"].play()
        }

        this.position.x += dxUpdate
        this.position.y += dyUpdate
    }

    public reset() {
        this.position.x = this.xPosStart
        this.position.y = this.yPosStart
        this.dy = 0
        this.dx = 0
    }

    public serveBall(direction: "Player 1" | "Player 2") {
        switch (direction) {
            case "Player 1":
                this.dx = 2
                break
            case "Player 2":
                this.dx = -2
                break
        }

        this.dy = (Math.random() * 10) > 5 ? Math.random() * 2 : Math.random() * -2
    }

    public changeDirectionAfterCollision(dt: Ticker) {
        this.dx *= -1.05
        this.dy = this.dy < 0 ? Math.random() * -2 : Math.random() * 2
        this.position.x += this.dx * dt.deltaTime
        this.position.y += this.dy * dt.deltaTime
        this.sounds["ball_hit_paddle"].play()
    }
}