import * as ex from "excalibur";
import { Resources, ResourceLoader } from "./resources.js";


//jouw eigen classes gebruiken inheritanceom over te erven van excalibur classes.
export class Player extends ex.Actor {
  playerAanimations = [];
  facing = "R";
  onGround = true;
  jumped = false

  constructor() {
    super({
      //gebruikers input
      collisionType: ex.CollisionType.Active,
      collider: ex.Shape.Box(50, 40, ex.Vector.Half, ex.vec(0, 0)),
    });
    //   this.graphics.use(Resources.player.toSprite());
    this.pos = new ex.Vector(100, -10);

    this.vel = new ex.Vector(0, 0);
    this.pointer.useGraphicsBounds = true;
    this.enableCapturePointer = true;

    this.on("pointerup", (event) => {
      this.kill();
    });
  }

  onInitialize(Engine) {
    Engine.input.keyboard.enabled = true;

    let idleAnimation = ex.SpriteSheet.fromImageSource({
      image: Resources.playerAnimationSheet,
      grid: {
        rows: 1,
        columns: 4,
        spriteWidth: 50,
        spriteHeight: 37,
      },
      spacing: {
        margin: { x: 0, y: 0 },
      },
    });
    let runAnimation = ex.SpriteSheet.fromImageSource({
      image: Resources.playerAnimationSheet,
      grid: {
        rows: 1,
        columns: 6,
        spriteWidth: 50,
        spriteHeight: 37,
      },
      spacing: {
        originOffset: { x: 0, y: 37 },
      },
    });
    let jumpAnimation = ex.SpriteSheet.fromImageSource({
      image: Resources.playerAnimationSheet,
      grid: {
        rows: 3,
        columns: 6,
        spriteWidth: 50,
        spriteHeight: 37,
      },
      spacing: {
        originOffset: { x: 0, y: 74 },
      },
    });

    this.playerAanimations["idleAnimation"] = ex.Animation.fromSpriteSheet(
      idleAnimation,
      ex.range(0, 3),
      100
    );
    this.playerAanimations["runAnimation"] = ex.Animation.fromSpriteSheet(
      runAnimation,
      ex.range(0, 5),
      100
    );
    this.playerAanimations["jumpAnimation"] = ex.Animation.fromSpriteSheet(
      jumpAnimation,
      ex.range(0, 6),
      100,
      ex.AnimationStrategy.Freeze
    );
  }

  update(Engine) {
    if (this.vel.x > 0) {
      this.vel.x -= 10;
    } else if (this.vel.x < 0) [(this.vel.x += 10)];

    switch (true) {
      case this.vel.x > 0 && !this.jumped:
        this.facing = "R";
        this.playerAanimations["runAnimation"].flipHorizontal = false;
        this.graphics.use(this.playerAanimations["runAnimation"]);
        break;

      case this.vel.x < 0 && !this.jumped:
        this.facing = "L";
        this.playerAanimations["runAnimation"].flipHorizontal = true;
        this.graphics.use(this.playerAanimations["runAnimation"]);
        break;

      case this.vel.x == 0 && !this.jumped:
        switch (this.facing) {
          case "R":
            this.playerAanimations["idleAnimation"].flipHorizontal = false;
            break;

          case "L":
            this.playerAanimations["idleAnimation"].flipHorizontal = true;
            break;
        }
        this.graphics.use(this.playerAanimations["idleAnimation"]);
        break;

        case this.jumped:
          switch(this.facing){
            case 'R':
              this.playerAanimations["jumpAnimation"].flipHorizontal = false
              break;
            case 'L':
              this.playerAanimations["jumpAnimation"].flipHorizontal = true
              break;
          }
          this.graphics.use(this.playerAanimations["jumpAnimation"]);
          break;
    }

    if (this.vel.y == 0) {
      this.onGround = true;
      this.jumped = false
    } else {
      this.onGround = false;
    }


    // je classes kunnen met de game class communiceren via het 'engine' argument in de actor lifecycle
    // gebruikers input
    Engine.input.keyboard.on("hold", (evt) => {
      if (evt.key === ex.Input.Keys.A) {
        this.vel.x = -400;
      } else if (evt.key === ex.Input.Keys.D) {
        this.vel.x = 400;
      } else if (evt.key === ex.Input.Keys.W && this.onGround) {
        this.playerAanimations["jumpAnimation"].reset()
        this.jumped = true
        this.vel.y = -700;
      }
    });
// gravity
    this.on('collisionstart', (event) => {
      if (event.other._name == "platform" && event.contact.info.sideId == 2) {
        console.log(event)
        this.vel.y = -600
       }
    })


  }
}
