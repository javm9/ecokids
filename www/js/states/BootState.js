var BootState={
  init:function(){
//permite  agrandar las imagenesal tamaño de la pantalla
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally=true;
    this.scale.pageAlignVertically=true;
  },
  preload:function(){
    this.load.image("barraCarga",'assets/images/barraCarga.png');
    this.load.image("logoCarga",'assets/images/oso.png');
  },
  create:function(){
    this.game.backgroundColor='#fff';
    this.state.start('PreloadState');
  },
}
    