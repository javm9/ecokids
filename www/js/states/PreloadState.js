var PreloadState={
  //load the game assets before the game starts
  preload: function() {

    this.logoCarga=this.add.sprite(this.game.world.centerX,this.game.world.centerY-20,'logoCarga');
    this.logoCarga.anchor.setTo(0.5);
    this.barra=this.add.sprite(this.game.world.centerX-20,this.game.world.centerY,'barraCarga');
    this.load.setPreloadSprite(this.barra);


    this.load.image('casa', 'assets/images/casa.png');
    this.load.image('sol', 'assets/images/sol.png');
    this.load.image('luna', 'assets/images/luna.png');
    this.load.image('sabana', 'assets/images/sabana.png');
    this.load.image('nevado1', 'assets/images/nevado1.png');
    this.load.image('nevado2', 'assets/images/nevado2.png');
    this.load.image('nevado3', 'assets/images/nevado3.png');
    this.load.image('nevado4', 'assets/images/nevado4.png');
    this.load.image('bosqueAltoAndino', 'assets/images/bosque.png');
    this.load.image('paramo', 'assets/images/paramo.png');
    this.load.image('dia', 'assets/images/dia.png');
    this.load.image('noche', 'assets/images/noche.png');
    this.load.image('oso', 'assets/images/oso.png');  
    this.load.image('nube', 'assets/images/nube.png'); 
    this.load.image('pollo','assets/images/pollo.png');   
    this.load.image('pino','assets/images/pino.png');
    this.load.image('cedro','assets/images/cedro.png');
    this.load.image('cedro1','assets/images/cedro1.png');
    this.load.image('manzano','assets/images/manzano.png');
    this.load.image('manzano1','assets/images/manzano1.png');
    this.load.image('frailejon','assets/images/frailejon.png');
    this.load.image('fin','assets/images/fin.png');
    this.load.image('rio1','assets/images/rio1.png');
    this.load.image('bMadera','assets/images/botonMadera.png');
    this.load.image('bEnergia','assets/images/botonEnergia.png');
    this.load.image('bFruta','assets/images/botonFruta.png');
    this.load.image('bTala','assets/images/botonTala.png');

    this.load.image('iOxigeno','assets/images/oxigeno.png');
    this.load.image('iTemperatura','assets/images/temperatura.png');
    this.load.image('iDioxido','assets/images/dioxido.png');
    this.load.image('iAgua','assets/images/agua.png');
    this.load.image('iPino','assets/images/iconoPino.png');
    this.load.image('iCedro','assets/images/iconoCedro.png');
    this.load.image('iManzano','assets/images/iconoManzano.png');
    this.load.image('iFrailejon','assets/images/iconoFrailejon.png');
    this.load.image('iCasa','assets/images/iconoCasa.png');

    this.load.image('termVerde1','assets/images/termVerde1.png');
    this.load.image('termVerde2','assets/images/termVerde2.png');
    this.load.image('termVerde3','assets/images/termVerde1.png');
    this.load.image('termRojo1','assets/images/termRojo1.png');
    this.load.image('termRojo2','assets/images/termRojo2.png');
    this.load.image('termRojo3','assets/images/termRojo3.png');
    this.load.image('termAmarillo','assets/images/termAmarillo.png');


    this.load.spritesheet('vaca','assets/images/vaca.png',128,133,4);
    this.load.audio('sonidoOso',['assets/sounds/sonido_oso.ogg','assets/sounds/sonido_oso.mp3']);
    this.load.audio('sonidoNegacion',['assets/sounds/no_se_puede.ogg','assets/sounds/no_se_puede.mp3']);
  },
  create:function(){
    this.state.start('GameState');
  },
}