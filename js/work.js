var game = new Phaser.Game(512, 512, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	game.load.image('CB1', 'img/cowboy1.png');
	game.load.image('CB2', 'img/cowboy2.png');
	game.load.image('Bullet', 'img/bullet.png');
}

function create() {
	game.add.sprite(0, 0, 'CB1');
	game.add.sprite(40, 0, 'CB2');
	game.add.sprite(30, 0, 'Bullet');
}

function update() {
}
