import * as ex from "excalibur";
import { Resources, ResourceLoader } from "./resources.js";
import { Player } from "./Player";
import { Platform } from './Platform.js'


export class Map extends ex.Scene {

    dataClass
    score = 0
    player
    scoreLabel
    text


    constructor(dataClass) {
        super({
        })
        this.dataClass = dataClass;
    }

    onInitialize(Engine) {

        let scoreLabel = class Scorelabel extends ex.ScreenElement{

            text

            constructor(){
                super({
                    x: 10,
                    y: 10,
                    width: 10,
                    height: 12,
                })
                this.text = new ex.Text({
                    pos: ex.vec(0,0),
                    text: "Score: 0",
                    color: ex.Color.White,
                    font: new ex.Font({ size: 10 }),
                })
                this.graphics.show(this.text)
            }

            updateText(value) {
                this.text.text = value
            }
        }

        this.scoreLabel = new scoreLabel()

        this.add(this.scoreLabel);

        //camera follow code
         this.player = new Player();
        Engine.add(this.player);
        let boundingBox = new ex.BoundingBox(
            0,
            -3000,
            1160,
            600
          )
          this.camera.strategy.lockToActor(this.player)
          this.camera.strategy.limitCameraBounds(boundingBox)


        let leftWall = new ex.Actor({
            pos: ex.vec(-1, 0),
            width: 10,
            height: 9000000000,
            collisionType: ex.CollisionType.Fixed
        })
        let rightWall = new ex.Actor({
            pos: ex.vec(1160, 0),
            width: 10,
            height: 9000000000,
            collisionType: ex.CollisionType.Fixed
        })
        let foundation = new ex.Actor({
            pos: ex.vec(0, 0),
            width: 10000,
            height: 10,
            collisionType: ex.CollisionType.Fixed
        })

        // Je hebt classes en instances gebruikt in je game. Je maakt van minimaal een class meerdere instances
        // dit komt vanuit new platform.
        this.add(new Platform(ex.vec(600, -400), 200, 10))
        this.add(new Platform(ex.vec(800,-100), 200, 10))
        this.add(new Platform(ex.vec(400,-200), 200, 10))
        this.add(new Platform(ex.vec(300,-300), 200, 10))

        this.add(foundation)
        this.add(leftWall);
        this.add(rightWall)

    }


    onPreUpdate() {
        console.log()
        if(this.score < Math.abs(this.player.pos.y)) {
            this.dataClass.setScore(Math.abs(this.player.pos.y));
            this.score = this.dataClass.getScore();
            this.scoreLabel.updateText(`Score: ${Math.floor(this.score)} Meter`)
        }
    }
}