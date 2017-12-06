var preloader = {};

preloader.preload = function () {
  this.game.load.image('background', 'images/background.png');
  this.game.load.image('platform', 'images/platform.png');
  this.game.load.spritesheet('dude', 'images/dude.png', 30, 50);
  this.game.load.spritesheet('fruit', 'images/watermelon.png', 25, 25);
  this.game.load.image('bullet', 'images/bullet.png');
  this.game.load.image('enemybullet', 'images/enemybullet.png');
  this.game.load.image('ground', 'images/ground.png');
  this.game.load.image('menda', 'images/menda.png');
  this.game.load.spritesheet('enemy', 'images/enemy.png', 100,200);
};

preloader.create = function () {
  this.game.state.start('game');
};

module.exports = preloader;
