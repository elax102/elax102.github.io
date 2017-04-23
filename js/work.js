var game = new Phaser.Game(512, 512, Phaser.AUTO, '', { preload: preload, create: create, update: update });

const SPEED = 300;
const DEADZONE = 0.001;

function preload() {
	game.load.image('CB1', 'img/cowboy1.png');
	game.load.image('CB2', 'img/cowboy2.png');
	game.load.image('Bullet', 'img/bullet.png');
}

var CB1
var CB2
var bullet

function create() {
	CB1 = game.add.sprite(0, 0, 'CB1');
	CB2 = game.add.sprite(40, 0, 'CB2');
	bullet = game.add.sprite(30, 0, 'Bullet');
	
	cursors = game.input.keyboard.createCursorKeys();
	
	game.physics.arcade.enable(CB1);
	
	game.input.gamepad.start();
	CB1Pad = game.input.gamepad.pad1;
	//CB2Pad = game.input.gamepad.pad2;
}

function update() {
	//set Cowboy speed to zero at start of update
    CB1.body.velocity.x = 0; CB1.body.velocity.y = 0;
    //CB2.body.velocity.x = 0; CB2.body.velocity.y = 0;
	
	//temporary movement with keyboard
	if (cursors.up.isDown) { CB1.body.velocity.y = -150; }
	else if (cursors.down.isDown) {CB1.body.velocity.y = 150; }
    else if (cursors.left.isDown) { CB1.body.velocity.x = -150; }
    else if (cursors.right.isDown) { CB1.body.velocity.x = 150; }
    else {}
	
	leftStickX = CB1Pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X);
	leftStickY = CB1Pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y);
	if (leftStickX < -DEADZONE || leftStickX > DEADZONE) {
        CB1.body.velocity.x = SPEED * leftStickX;
    }
    if (leftStickY < -DEADZONE || leftStickY > DEADZONE) {
        CB1.body.velocity.y = SPEED * leftStickY;
    }
	
	
}
