var game = {};

var platforms;
var player;
var cursors;
var fruits;
var bullets;
var enemy;
var enemyLife = 9999999;
var enemyText;
var damage = 1;
game.create = function () {
  this.game.physics.startSystem(Phaser.Physics.ARCADE);
  var background = this.game.add.image(0,0, 'background');
  platforms = this.game.add.group();
  platforms.enableBody = true;
  var ground = platforms.create(0, game.world.height - 32, 'ground');
  ground.body.immovable = true;
  var ledge = platforms.create(200, 50, 'platform');
  ledge.body.immovable = true;
  var ledge = platforms.create(100, 500, 'platform');
  ledge.body.immovable = true;
  var ledge = platforms.create(300, 400, 'platform');
  ledge.body.immovable = true;
  var ledge = platforms.create(400, 250, 'platform');
  ledge.body.immovable = true;
  var ledge = platforms.create(500, 500,  'platform');
  ledge.body.immovable = true;
  player = game.add.sprite(30, game.world.height - 150, 'dude');
  game.physics.arcade.enable(player, fruits);
  //  Player physics properties. Give the little guy a slight bounce.
  player.body.bounce.y = 0.2;
  player.body.gravity.y = 800;
  player.body.collideWorldBounds = true;
  //  Our two animations, walking left and right.
  player.animations.add('left', [0, 1], 10, true);
  player.animations.add('right', [3, 4], 10, true);
  player.animations.add('idle', [2, 2, 2, 2, 5, 2, 2, 2, 2], 4, true);
  cursors = game.input.keyboard.createCursorKeys();
  enemyText = game.add.text(game.world.width - 350, 16, 'Enemy Life: ' + enemyLife, { fontSize: '32px', fill: '#000' });
  fruits = game.add.group();

  fruits.enableBody = true;

  bullets = game.add.group();
  bullets.enableBody = true;



  //  Here we'll create 12 of them evenly spaced apart
  for (var i = 0; i < 12; i++)
  {
    //  Create a star inside of the 'stars' group
    var fruit = fruits.create(i * 70, 0, 'fruit');

    //  Let gravity do its thing
    fruit.body.gravity.y = 200;
    fruit.angle += Math.random() * 100;
    //  This just gives each star a slightly random bounce value
    fruit.body.bounce.y = 0.7 + Math.random() * 0.2;
  }

  //Enemy

  enemy = game.add.sprite(game.world.width - 100, game.world.height - 400, 'enemy');
  game.physics.arcade.enable(enemy);
  enemy.enableBody = true;
  enemy.body.gravity.y = 1000;
  enemy.animations.add('enemy-idle', [0, 0, 0, 0, 1, 0, 0, 0, 0], 5);
  enemy.animations.add('enemy-hurt', [0, 2], 60);
  enemy.body.collideWorldBounds = true;
};

game.update = function() {
  game.physics.arcade.collide(player, platforms);
  game.physics.arcade.collide(fruits, platforms);
  game.physics.arcade.collide(enemy, platforms);
  game.physics.arcade.collide(enemy, fruits, receiveFruitHostia);
  game.physics.arcade.collide(enemy, bullets, receiveBulletHostia, null, this);
  game.physics.arcade.overlap(bullets, platforms, breakBullet, null, this);
  game.physics.arcade.overlap(player, fruits, collectFruit, null, this);
  game.physics.arcade.overlap(bullets, fruits, breakFruit, null, this);
  //  Reset the players velocity (movement)
  //  Reset the players velocity (movement)
  player.body.velocity.x = 0;
  // Enemy
  game.time.events.loop(Phaser.Timer.SECOND * 5, moveDroid, this);
  game.time.events.loop(Phaser.Timer.SECOND * 3, enemyShootLeft, this);
  if (cursors.left.isDown)
  {
    //  Move to the left
    player.body.velocity.x = -150;

    player.animations.play('left');
  }
  else if (cursors.right.isDown)
  {
    //  Move to the right
    player.body.velocity.x = 150;

    player.animations.play('right');
  }
  else
  {
    //  Stand still
    player.animations.play('idle');
  }

  //  Allow the player to jump if they are touching the ground.
  if (cursors.up.isDown && player.body.touching.down)
  {
    player.body.velocity.y = -550;
  }

  // Shoot
  if (this.input.keyboard.isDown(Phaser.Keyboard.D))
  {
   shootRight();
  } else if (this.input.keyboard.isDown(Phaser.Keyboard.A))
  {
    shootLeft();
  }


}

module.exports = game;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function collectFruit (player, fruit) {
  // Removes the star from the screen
  fruit.kill();
  damage += 10;

}

function shootRight() {
  player.animations.play('right');
  for (var j = 0; j < 1; j++)
  {
    var bullet = bullets.create(player.x+30, player.y + 9 , 'bullet');
    bullet.body.velocity.x = 300;
  }
}
function shootLeft() {
  player.animations.play('left');
  for (var j = 0; j < 1; j++)
  {
    var bullet = bullets.create(player.x, player.y + 9 , 'bullet');
    bullet.body.velocity.x = -300;
  }
}
function enemyShootLeft() {
  for (var j = 0; j < 1; j++)
  {
    var enemybullet = bullets.create(enemy.x, enemy.y + 50 , 'enemybullet');
    enemybullet.body.velocity.x = -100;
  }
}

function breakFruit(bullet, fruit) {
  bullet.kill();
  fruit.kill();
}

function breakBullet(bullet, platform) {
  bullet.kill();
}
function moveDroid() {
  droidmover = game.rnd.integerInRange(1, 3);
  enemy.animations.play('enemy-idle');
  if (droidmover == 1) {
    enemy.body.velocity.x = 10;
  } else if (droidmover == 2) {
    enemy.body.velocity.x = -10;
  } else {
    enemy.body.velocity.x = 0;
  }
}

function receiveFruitHostia(enemy, fruit) {
  fruit.kill();
  enemy.animations.play('enemy-hurt');
}

function receiveBulletHostia(enemy, bullet) {
  bullet.kill();
  enemyLife -= damage;
  enemyText.text = 'Enemy Life: ' + enemyLife;
  enemy.animations.play('enemy-hurt');
}