const Speed = 300

export default class Movement {
	constructor() {
		this.up = this.down = this.left = this.right = null;
		this.pad = null;
	}
	


	// // Controls
    // if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT))
    // {
        // sprite.x--;
    // }
    // else if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT))
    // {
        // sprite.x++;
    // }

    // if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_UP))
    // {
        // sprite.y--;
    // }
    // else if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN))
    // {
        // sprite.y++;
    // }

    // if (pad1.justPressed(Phaser.Gamepad.XBOX360_A))
    // {
        // sprite.angle += 5;
    // }

    // if (pad1.justReleased(Phaser.Gamepad.XBOX360_B))
    // {
        // sprite.scale.x += 0.01;
        // sprite.scale.y = sprite.scale.x;
    // }

    // if (pad1.connected)
    // {
        // var rightStickX = pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X);
        // var rightStickY = pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y);

        // if (rightStickX)
        // {
            // sprite.x += rightStickX * 10;
        // }

        // if (rightStickY)
        // {
            // sprite.y += rightStickY * 10;
        // }
    // }
