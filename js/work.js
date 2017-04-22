
require('../index.html');
//require(['../phaser.min.js']);

 var Preload = require('./states/preload.js');
 var Main =require('./states/main.js');

var game = new Phaser.Game(512, 512, Phaser.AUTO, new Boot() );
game.state.add('preload', new Preload());
game.state.add('main', new Main());


