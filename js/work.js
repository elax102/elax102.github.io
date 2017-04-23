
//require('../index.html');


var game = new Phaser.Game(700, 700, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
function preload () {
	game.load.image('CB1', 'img/cowboy1.png');
	game.load.image('CB2', 'img/cowboy2.png');
	game.load.image('Bullet', 'img/bullet.png');
	game.load.image('background', 'img/bg1-tiled.png');
game.load.image('rock', 'img/rock1.png');}


var fireRate = 1000;
var nextFire = 0;
var bulletnum = 1;

var CB1
var CB2
var bullets

function create() {
	
	
	
	cursors = game.input.keyboard.createCursorKeys();
	
	
	game.add.tileSprite(0, 0, 700, 700, 'background');
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	ammo=game.add.sprite(100, 300, 'Bullet');
game.physics.enable(ammo, Phaser.Physics.ARCADE);
	
	bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(50, 'Bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
	//bullets.body.allowRotation = true;
	
	CB1 = game.add.sprite(100, 100, 'CB1');
	CB1.anchor.set(0.5, 0.5);
	//CB1.rotation = 0.5;
	game.physics.arcade.enable(CB1, Phaser.Physics.ARCADE);
	
	CB1.body.collideWorldBounds = true;
	

    CB1.body.allowRotation = true;
	
	CB2 = game.add.sprite(300, 300, 'CB2');
	CB2.anchor.set(0.5, 0.5);
	//CB1.rotation = 0.5;
	game.physics.arcade.enable(CB2, Phaser.Physics.ARCADE);
	
	CB2.body.collideWorldBounds = true;
	

    CB2.body.allowRotation = true;
	 CB1.body.setCircle(30);
    CB2.body.setCircle(30);
}

function update() {
	CB1.body.velocity.y = 0;
    CB1.body.velocity.x = 0;

	if (cursors.up.isDown) { CB1.body.velocity.y = -150; }
	else if (cursors.down.isDown) {CB1.body.velocity.y = 150; }
    else if (cursors.left.isDown) { CB1.body.velocity.x = -150; }
    else if (cursors.right.isDown) { CB1.body.velocity.x = 150; }
    else {}
	
	CB1.rotation = fixRotation(game.physics.arcade.angleToPointer(CB1));
	game.physics.arcade.collide(bullets, CB2, hitHandler, null, this);
	game.physics.arcade.collide(ammo, CB1, pickHandler, null, this);
    if (game.input.activePointer.isDown && bulletnum > 0)
    {
        fire();
    }
}

	
	
function fixRotation(rotation) {  return rotation + 1.57079633;}
function pickHandler (obj1, obj2) {

    bulletnum=bulletnum+1;
	
	destroySprite(ammo);

}
function hitHandler (obj1, obj2){
	game.stage.backgroundColor = '#992d2d';
	//destorysprite(obj1);
}
function fire() {

    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstDead();

        bullet.reset(CB1.x, CB1.y);
		bullet.rotation = CB1.rotation;
        game.physics.arcade.moveToPointer(bullet, 2000);
		bulletnum = bulletnum-1;
    }

}

function destroySprite (sprite) {

    sprite.destroy();

}
function render() {

    game.debug.text('Active Bullets: ' + bulletnum + ' / ' + bullets.total, 32, 32);
    game.debug.spriteInfo(CB1, 32, 450);
	//game.debug.body(Bullets);
    game.debug.body(ammo);
	game.debug.body(CB1);
	game.debug.body(CB2);

}
