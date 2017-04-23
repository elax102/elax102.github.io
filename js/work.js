
var game = new Phaser.Game(700, 700, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render, setDeadZones: setDeadZones });


const SPEED = 700;

const DEADZONE_LEFTJS = 0.25;
const DEADZONE_RIGHTJS = 0.1;

function preload () {
	game.load.image('CB1', 'img/cowboy1.png');
	game.load.image('CB2', 'img/cowboy2.png');
	game.load.image('Bullet', 'img/bullet.png');
	game.load.image('background', 'img/bg1-tiled.png');
	game.load.image('rock', 'img/rock1.png');

  game.load.audio('foot', 'sfx/foot.wav');
  game.load.audio('foot2', 'sfx/foot2.mp3');
  game.load.audio('bulletspawn', 'sfx/bulletdrop.wav');
  game.load.audio('reload', 'sfx/reload.wav');
  game.load.audio('shoot', 'sfx/gunshot.mp3');
  game.load.audio('dead', 'sfx/wilhelm-scream.wav');
}

  var genloc = [{x1:0,x2:350,y1:0,y2:350}, {x1:0,x2:350,y1:350,y2:700}, {x1:350,x2:700,y1:0,y2:350}, {x1:350,x2:700,y1:350,y2:700} ];
  var fireRate = 1000;
  var nextFire = 0;
  var CB1bulletnum = 1;
  var CB2bulletnum = 1;
  
  
var bsx;
var bsy;
  var CB1;
  var CB2;
  var CB1bullets;
  var CB2bullets;
  var CB1bullet;
  var CB2bullet;
var ammos;
  var ammo;
  
  var foot;
  var bulletSpawn;
  var reload;
  var shoot;
  var dead;

  var cb1walking = false;
  var cb2walking = false;
  var timer;

function create() {
  timer = game.time.create(false);
  timer.loop(200, walkTimer, this);
  timer.start();

	cursors = game.input.keyboard.createCursorKeys();
	game.add.tileSprite(0, 0, 700, 700, 'background');
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.input.gamepad.start();
	game.input.gamepad.pad1.deadZone = 0.01;
	game.input.gamepad.pad2.deadZone = 0.01;

	rock = game.add.sprite( 200, 200, 'rock');
	game.physics.enable(rock, Phaser.Physics.ARCADE);
	rock.body.immovable = true;
	rock.body.setSize(58,58,2,2);

	
	
	ammos = game.add.group();
    ammos.enableBody = true;
	game.physics.arcade.enable(ammos, Phaser.Physics.ARCADE);

    //bullets.physicsBodyType = Phaser.Physics.ARCADE;

    
    ammos.setAll('checkWorldBounds', true);
    ammos.setAll('outOfBoundsKill', true);

	CB1bullets = game.add.group();
    CB1bullets.enableBody = true;
	game.physics.arcade.enable(CB1bullets, Phaser.Physics.ARCADE);

    //bullets.physicsBodyType = Phaser.Physics.ARCADE;

    CB1bullets.createMultiple(50, 'Bullet');
    CB1bullets.setAll('checkWorldBounds', true);
    CB1bullets.setAll('outOfBoundsKill', true);
	//bullets.body.allowRotation = true;
	
	CB2bullets = game.add.group();
    CB2bullets.enableBody = true;
	game.physics.arcade.enable(CB2bullets, Phaser.Physics.ARCADE);

    //bullets.physicsBodyType = Phaser.Physics.ARCADE;

    CB2bullets.createMultiple(50, 'Bullet');
    CB2bullets.setAll('checkWorldBounds', true);
    CB2bullets.setAll('outOfBoundsKill', true);

	//================ Cowboy 1 =====================
	CB1 = game.add.sprite(100, 100, 'CB1');
	CB1.anchor.set(0.5, 0.5);

	game.physics.arcade.enable(CB1, Phaser.Physics.ARCADE);
	CB1Pad = game.input.gamepad.pad1;

	CB1.body.collideWorldBounds = true;

	CB1.body.setSize(58,58,3,3);
	CB1.body.allowRotation = true;
	CB1Pad.addCallbacks(this, { onConnect: CB1addButtons });

	//================ Cowboy 2 =====================
	CB2 = game.add.sprite(800, 800, 'CB2');
	CB2.anchor.set(0.5, 0.5);

	game.physics.arcade.enable(CB2, Phaser.Physics.ARCADE);
	CB2Pad = game.input.gamepad.pad2;

	CB2.body.collideWorldBounds = true;

    CB2.body.setCircle(30);
	CB2Pad.addCallbacks(this, { onConnect: CB2addButtons });

  // Add sfx
  foot = game.add.audio('foot');
  foot2 = game.add.audio('foot2');
  bulletSpawn = game.add.audio('bulletspawn');
  reload = game.add.audio('reload');
  shoot = game.add.audio('shoot');
  dead = game.add.audio('dead');
}

function update() {

	//set Cowboy speed to zero at start of update
    CB1.body.velocity.x = 0; CB1.body.velocity.y = 0;
    CB2.body.velocity.x = 0; CB2.body.velocity.y = 0;

	//temporary movement with keyboard
	// if (cursors.up.isDown) { CB1.body.velocity.y = -150; }
	// else if (cursors.down.isDown) {CB1.body.velocity.y = 150; }
    // else if (cursors.left.isDown) { CB1.body.velocity.x = -150; }
    // else if (cursors.right.isDown) { CB1.body.velocity.x = 150; }
    // else {}

	//Mouse
	//CB1.rotation = fixRotation(game.physics.arcade.angleToPointer(CB1));


	//================= Collisions ====================
	game.physics.arcade.collide(CB1,rock);

	//============== Cowboy 1 Gamepad =================
	CB1leftStickX = CB1Pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X);
	CB1leftStickY = CB1Pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y);

	if (Math.abs(CB1leftStickX) > DEADZONE_LEFTJS || Math.abs(CB1leftStickY) > DEADZONE_LEFTJS) {
        CB1.body.velocity.x = SPEED * CB1leftStickX;
        CB1.body.velocity.y = SPEED * CB1leftStickY;

        cb1walking = true;
    }else {
      cb1walking = false;
    }
    // if (Math.abs(CB1leftStickY) > DEADZONE) {
    //     CB1.body.velocity.y = SPEED * CB1leftStickY;
    // }

	CB1rightStickX = CB1Pad.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X);
	CB1rightStickY = CB1Pad.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y);


	if (Math.abs(CB1rightStickX) > DEADZONE_RIGHTJS
		|| Math.abs(CB1rightStickY) > DEADZONE_RIGHTJS){

		CB1.angle =
			fixRotation(Math.atan2(CB1rightStickY, CB1rightStickX)) * (180/Math.PI);
	}

	//============== Cowboy 2 Gamepad =================
	CB2leftStickX = CB2Pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X);
	CB2leftStickY = CB2Pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y);
	if (Math.abs(CB2leftStickX) > DEADZONE_LEFTJS || Math.abs(CB2leftStickY) > DEADZONE_LEFTJS) {
        CB2.body.velocity.x = SPEED * CB2leftStickX;
        CB2.body.velocity.y = SPEED * CB2leftStickY;

        cb2walking = true;
    }else {
      cb2walking = false;
    }

	CB2rightStickX = CB2Pad.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X);
	CB2rightStickY = CB2Pad.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y);

	if (Math.abs(CB2rightStickX) > DEADZONE_RIGHTJS
	|| Math.abs(CB2rightStickY) > DEADZONE_RIGHTJS){
		CB2.angle =
			fixRotation(Math.atan2(CB2rightStickY, CB2rightStickX)) * (180/Math.PI);
	}
	game.physics.arcade.overlap(CB1bullets, rock, function(rock, CB1bullet){CB1bullet.kill(); }, null, this);
	game.physics.arcade.overlap(CB1bullets, CB2, function(CB2, CB1bullet){CB1bullet.kill(); }, null, this);
	game.physics.arcade.overlap(CB2bullets, CB1, function(CB1, CB2bullet){CB2bullet.kill(); }, null, this);
game.physics.arcade.collide(ammos, CB2, function(CB2, ammo){ammo.kill();  reload.play(); CB2bulletnum++;  }, null, this);
	game.physics.arcade.collide(ammos, CB1, function(CB1, ammo){ammo.kill();  reload.play(); CB1bulletnum++;  }, null, this);
   /* if (game.input.activePointer.isDown && CB2bulletnum > 0)
    {
        fire();
    }*/

}

function walkTimer(){
  if(cb1walking == true){
    foot.play();
    foot.volume = 0.5;
  }
  if(cb2walking == true){
    foot2.play();
    foot2.volume = 0.5;
  }
}

function CB1addButtons() {

    /*leftTriggerButton = CB1Pad.getButton(Phaser.Gamepad.XBOX360_LEFT_TRIGGER);

    leftTriggerButton.onDown.add(onLeftTrigger);
    leftTriggerButton.onUp.add(onLeftTrigger);
    leftTriggerButton.onFloat.add(onLeftTrigger);*/

    rightTriggerButton = CB1Pad.getButton(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER);
    rightTriggerButton.onDown.add(CB1fire);


}
//function onLeftTrigger(button, value) {


//}
function CB2addButtons() {

    /*leftTriggerButton = CB1Pad.getButton(Phaser.Gamepad.XBOX360_LEFT_TRIGGER);

    leftTriggerButton.onDown.add(onLeftTrigger);
    leftTriggerButton.onUp.add(onLeftTrigger);
    leftTriggerButton.onFloat.add(onLeftTrigger);*/

    rightTriggerButton = CB2Pad.getButton(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER);
    rightTriggerButton.onDown.add(CB2fire);

}

function fixRotation(rotation) {  return rotation + 1.57079633;}

/*function pickHandler (obj1, obj2) {


    CB2bulletnum=CB2bulletnum+1;
    reload.play();


	ammos.remove(ammo);

}*/
function hitHandler (obj1, obj2){
	game.stage.backgroundColor = '#992d2d';
	//destorysprite(obj1);
}
function CB1fire() {

    if (game.time.now > nextFire && CB1bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;


        var CB1bullet = CB1bullets.getFirstDead();
        
		CB1bullet.body.setSize(13, 13, 8, 5);
		CB1bullet.body.setCircle(9);
		CB1bullet.reset(CB1.x, CB1.y);
		CB1bullet.rotation = CB1.rotation;
        game.physics.arcade.velocityFromRotation(CB1.rotation -1.57079633, 2000, CB1bullet.body.velocity);
		CB1bulletnum = CB1bulletnum-1;
		bulgenloc();

    shoot.play();
    }
}

function CB2fire() {

    if (game.time.now > nextFire && CB2bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;
bulgenloc();
        var CB2bullet = CB2bullets.getFirstDead();
		CB2bullet.body.setSize(13, 13, 8, 5);
		CB2bullet.body.setCircle(9);
        CB2bullet.reset(CB2.x, CB2.y);
		CB2bullet.rotation = CB2.rotation;
        game.physics.arcade.velocityFromRotation(CB2.rotation-1.57079633, 2000, CB2bullet.body.velocity);
		CB2bulletnum = CB2bulletnum-1;

    shoot.play();
    }
}

function bulgenloc ()
{
var zone=genloc[game.rnd.integerInRange(0, 3)];
  bsx=game.rnd.integerInRange(zone.x1, zone.x2);
  bsy=game.rnd.integerInRange(zone.y1, zone.y2);
	ammo = ammos.create(bsx, bsy, 'Bullet');
ammo.body.setSize(13, 13, 8, 5);
		ammo.body.setCircle(9);
}

function destroySprite (sprite) {

    sprite.destroy();
}

function render() {

    game.debug.text('Active Bullets: ' + CB2bulletnum + ' / ' + CB1bullets.total, 32, 32);
	game.debug.text('' + bsx + '/' + bsy, 45, 45);
    game.debug.spriteInfo(CB1, 32, 450);
	CB1bullets.forEachAlive(renderGroup, this);
    ammos.forEachAlive(renderGroup, this);
	game.debug.body(CB1);
	game.debug.body(rock);
	game.debug.body(CB2);
}

function renderGroup(member) {
	game.debug.body(member);
}

function setDeadZones(Deadzone){
	Deadzone = 0.5;
}
