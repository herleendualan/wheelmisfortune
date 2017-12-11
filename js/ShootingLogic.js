var shotList = [];
const SHOT_SPEED = 2;
const ORIENT_SPRITE_FORWARD = false; // rotate bullet sprites to face forward? (good for rockets and laser bolts)

function moveShots() {
    for (var i = shotList.length - 1; i >= 0; i--) {
        shotList[i].move();
        if (shotList[i].removeMe) {
            shotList.splice(i, 1);
        }
    }
}

function shotClass(startX, startY, shotAng, enemy, shotSpeed = SHOT_SPEED) {
    this.x = startX;
    this.y = startY;
    this.xv = Math.cos(shotAng) * shotSpeed;
    this.yv = Math.sin(shotAng) * shotSpeed;
    this.lifeLeft = 100;
    this.damage = 1;
    this.removeMe = false;
    this.bulletWidth = 2;
    this.bulletHeight = 2;
    this.enemy = enemy;
    this.rotation = 0;

    this.move = function() {
        this.x += this.xv;
        this.y += this.yv;

        if (this.x < 0 && this.xv < 0) {
            this.xv *= -1;
        }
        if (this.x > canvas.width && this.xv > 0) {
            this.xv *= -1;
        }
        if (this.y < 0 && this.yv < 0) {
            this.yv *= -1;
        }
        if (this.y > canvas.height && this.yv > 0) {
            this.yv *= -1;
        }

        this.lifeLeft--;
        if (this.lifeLeft < 0) {
            this.removeMe = true;
        }
    };

    this.draw = function() {
        if (ORIENT_SPRITE_FORWARD) this.rotation = Math.atan2(this.yv,this.xv);
        drawBitmapCenteredAtLocationWithRotation(bulletPic, this.x, this.y, this.rotation);
    };

    this.checkForCollisionWithPlayer = function() {
        if (!this.enemy || this.removeMe) return;
        var isCollidingWithPlayer = this.x > (player.x - player.mask.width/2) &&
            this.y > (player.y - player.mask.heightOffset) &&
            this.x < (player.x + player.mask.width) &&
            this.y < (player.y + player.mask.heightOffset);

        if (isCollidingWithPlayer) {
            player.takeDamage(this.damage);
            this.removeMe = true;
        }
    };

    this.checkForCollisionWithEnemies = function() {
        if (this.enemy || this.removeMe) return;
        var distX = 0;
        var distY = 0;

        for (var i = 0; i < enemyList.length; i++) {
            var currentEnemy = enemyList[i];

            if (currentEnemy.remove) continue;

            //Hacky collision code, replace at some point
            distX = this.x - currentEnemy.x;
            distY = this.y - currentEnemy.y;
            if ((distX * distX + distY * distY) <= currentEnemy.size) {
                this.removeMe = true;
                currentEnemy.gotHit(this.damage);
            }
        }
    };
}

function checkBulletCollisions() {
    for (var i = 0; i < shotList.length; i++) {
        shotList[i].checkForCollisionWithPlayer();
        shotList[i].checkForCollisionWithEnemies();
    }
}
