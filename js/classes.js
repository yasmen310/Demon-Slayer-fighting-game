class Sprite {
  constructor({
    possition,
    imgSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
  }) {
    this.possition = possition;
    this.width = 50;
    this.height = 150;
    this.img = new Image();
    this.img.src = imgSrc;
    this.scale = scale;
    this.framesMax = framesMax;
    this.currentFrame = 0;
    this.framesElapsed = 0;
    this.framesHold = 5;
    this.offset = offset;
  }

  drow() {
    ctx.drawImage(
      this.img,
      this.currentFrame * (this.img.width / this.framesMax),
      0,
      this.img.width / this.framesMax,
      this.img.height,
      this.possition.x - this.offset.x,
      this.possition.y - this.offset.y,
      (this.img.width / this.framesMax) * this.scale,
      this.img.height * this.scale
    );
  }

  animateFrames() {
    this.framesElapsed++; // frames done
    if (this.framesElapsed % this.framesHold == 0) {
      if (this.currentFrame < this.framesMax - 1) {
        this.currentFrame++;
      } else this.currentFrame = 0;
    }
  }

  update() {
    this.drow();
    this.animateFrames();
  }
}

class Fighter extends Sprite {
  constructor({
    possition,
    velocity,
    color = "red",
    imgSrc,
    scale = 1,
    framesMax = 1,
    sprites,
    attackBox = { offset: {}, width: undefined, height: undefined },
    offset = { x: 0, y: 0 },
  }) {
    super({
      possition,
      imgSrc,
      scale,
      framesMax,
      offset,
    });
    this.possition = possition;
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey;
    this.color = color;
    this.isAttacking;
    this.attackBox = {
      possition: {
        x: this.possition.x,
        y: this.possition.y,
      },
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height,
    };
    this.health = 100;
    this.currentFrame = 0;
    this.framesElapsed = 0;
    this.framesHold = 17;
    this.sprites = sprites;
    this.dead = false;

    for (const sprite in this.sprites) {
      sprites[sprite].img = new Image();
      sprites[sprite].img.src = sprites[sprite].imgSrc;
    }
    console.log(this.sprites);
  }

  // drow() {
  //   ctx.fillStyle = this.color;

  //   ctx.fillRect(this.possition.x, this.possition.y, this.width, this.height);
  //   //attackBox
  //   if (this.isAttacking) {
  //     ctx.fillStyle = "white";
  //     ctx.fillRect(
  //       this.attackBox.possition.x,
  //       this.attackBox.possition.y,
  //       this.attackBox.width,
  //       this.attackBox.height
  //     );
  //   }
  // }

  getHit() {
    this.health -= 20;
    if (this.health <= 0) {
      this.switchSprite("death");
    } else {
      this.switchSprite("getHit");
    }
    // this.isAttacking = true;
  }

  update() {
    this.drow();
    if (!this.dead) this.animateFrames();
    //attackBox
    this.attackBox.possition.x = this.possition.x + this.attackBox.offset.x;
    this.attackBox.possition.y = this.possition.y + this.attackBox.offset.y;

    // draw attackBox
    // ctx.fillRect(
    //   this.attackBox.possition.x,
    //   this.attackBox.possition.y,
    //   this.attackBox.width,
    //   this.attackBox.height
    // );

    this.possition.y += this.velocity.y;
    this.possition.x += this.velocity.x;

    //gravity function
    if (
      this.possition.y + this.height + this.velocity.y >=
      canvas.height - 70
    ) {
      this.velocity.y = 0;
      this.possition.y = 356;
    } else this.velocity.y += gravity;
    // console.log(this.possition.y);
    // console.log("done");
  }

  attack(num) {
    switch (num) {
      case "1":
        this.switchSprite("attack1");
        break;
      case "2":
        this.switchSprite("attack2");
        break;
      case "3":
        // enmy.velocity.y = -5;
        // enmy.velocity.x = -15;
        this.switchSprite("attack3");
        break;
      case "4":
        this.switchSprite("attack4");
        break;
    }
    this.isAttacking = true;
    // setTimeout(() => {
    //   this.isAttacking = false;
    // }, 1000);
  }
  switchSprite(sprite) {
    if (this.img === this.sprites.death.img) {
      if (this.currentFrame === this.sprites.death.framesMax - 1) {
        this.dead = true;
      }
      return;
    }
    if (
      this.img === this.sprites.attack1.img &&
      this.currentFrame < this.sprites.attack1.framesMax - 1
    )
      return;
    if (
      this.img === this.sprites.attack2.img &&
      this.currentFrame < this.sprites.attack2.framesMax - 1
    )
      return;
    if (
      this.img === this.sprites.attack3.img &&
      this.currentFrame < this.sprites.attack3.framesMax - 1
    )
      return;
    if (
      this.img === this.sprites.attack4.img &&
      this.currentFrame < this.sprites.attack4.framesMax - 1
    )
      return;

    if (
      this.img === this.sprites.getHit.img &&
      this.currentFrame < this.sprites.getHit.framesMax - 1
    )
      return;

    switch (sprite) {
      case "idle":
        if (this.img !== this.sprites.idle.img) {
          this.img = this.sprites.idle.img;
          this.framesMax = this.sprites.idle.framesMax;
          this.framesHold = this.sprites.idle.framesHold;

          this.currentFrame = 0;
        }
        break;
      case "runBack":
        if (this.img !== this.sprites.runBack.img) {
          this.img = this.sprites.runBack.img;
          this.framesMax = this.sprites.runBack.framesMax;
          // this.scale = this.sprites.runBack.scale;
          this.currentFrame = 0;
        }
        break;
      case "run":
        if (this.img !== this.sprites.run.img) {
          this.img = this.sprites.run.img;
          this.framesMax = this.sprites.run.framesMax;
          this.currentFrame = 0;
        }
        break;
      case "jump":
        if (this.img !== this.sprites.jump.img) {
          this.img = this.sprites.jump.img;
          this.framesMax = this.sprites.jump.framesMax;
          this.currentFrame = 0;
        }
        break;
      case "jumpBack":
        if (this.img !== this.sprites.jumpBack.img) {
          this.img = this.sprites.jumpBack.img;
          this.framesMax = this.sprites.jumpBack.framesMax;
          this.currentFrame = 0;
        }
        break;
      case "fall":
        if (this.img !== this.sprites.fall.img) {
          this.img = this.sprites.fall.img;
          this.framesMax = this.sprites.fall.framesMax;
          this.currentFrame = 0;
        }
        break;
      case "fallBack":
        if (this.img !== this.sprites.fallBack.img) {
          this.img = this.sprites.fallBack.img;
          this.framesMax = this.sprites.fallBack.framesMax;
          this.currentFrame = 0;
        }
        break;
      case "attack1":
        if (this.img !== this.sprites.attack1.img) {
          this.img = this.sprites.attack1.img;
          this.framesMax = this.sprites.attack1.framesMax;
          this.framesHold = this.sprites.attack1.framesHold;
          this.currentFrame = 0;
        }
        break;
      case "attack2":
        if (this.img !== this.sprites.attack2.img) {
          this.img = this.sprites.attack2.img;
          this.framesMax = this.sprites.attack2.framesMax;
          this.framesHold = this.sprites.attack2.framesHold;
          this.currentFrame = 0;
        }
        break;
      case "attack3":
        if (this.img !== this.sprites.attack3.img) {
          this.img = this.sprites.attack3.img;
          this.framesMax = this.sprites.attack3.framesMax;
          this.framesHold = this.sprites.attack3.framesHold;
          this.currentFrame = 0;
        }
        break;
      case "attack4":
        if (this.img !== this.sprites.attack4.img) {
          this.img = this.sprites.attack4.img;
          this.framesMax = this.sprites.attack4.framesMax;
          this.framesHold = this.sprites.attack4.framesHold;
          this.currentFrame = 0;
        }
        break;
      case "getHit":
        if (this.img !== this.sprites.getHit.img) {
          this.img = this.sprites.getHit.img;
          this.framesMax = this.sprites.getHit.framesMax;
          this.framesHold = this.sprites.getHit.framesHold;
          this.currentFrame = 0;
        }
        break;
      case "death":
        if (this.img !== this.sprites.death.img) {
          this.img = this.sprites.death.img;
          this.framesMax = this.sprites.death.framesMax;
          this.framesHold = this.sprites.death.framesHold;
          this.currentFrame = 0;
        }
        break;
    }
  }
}
