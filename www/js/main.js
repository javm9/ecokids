//initiate the Phaser framework
var game = new Phaser.Game(950, 600, Phaser.AUTO);
game.state.add('GameState', GameState);
//game.state.add('HomeState', HomeState);
game.state.add('BootState', BootState);
game.state.add('PreloadState', PreloadState);
game.state.start('BootState');