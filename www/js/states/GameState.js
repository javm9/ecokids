//this game will have only 1 state
var GameState = {
  //executed after everything is loaded
  create: function() {
    var vaca,polli,pino,pollo,fin,botonMadera;
    polli=false;
    this.fondo=this.game.add.sprite(0,0,'noche');
    this.sol=this.game.add.sprite(-50,20,'sol');
    this.luna=this.game.add.sprite(50,20,'luna');
    this.tiempo={minuto:0,hora:0,dia:1};
    this.aire={co2:2000.00,o2:209400.00,h2o:5000.00,luz:false,temp:3};
    
    this.territorio={};
    this.territorio.atributos={tiempo:{minuto:0,hora:5,dia:1}};
    this.territorio.atributos.ecosistemas={};

    this.territorio.atributos.ecosistemas.sabana=this.game.add.sprite(0,this.game.world.height-295, 'sabana');
    this.territorio.atributos.ecosistemas.sabana.inputEnabled=true;
    this.territorio.atributos.ecosistemas.sabana.atributos={suelo:{area:200,agua:50000},temperatura:this.aire.temp,tempActual:this.aire.temp,propTemperatura:1,aguaLLuvia:0.00};
    this.territorio.atributos.ecosistemas.sabana.input.pixelPerfectClick=true;
    this.territorio.atributos.ecosistemas.sabana.events.onInputDown.add(this.colocarItemS,this);

    this.territorio.atributos.ecosistemas.bosqueAltoAndino = this.game.add.sprite(0,this.game.world.height-305, 'bosqueAltoAndino');
    this.territorio.atributos.ecosistemas.bosqueAltoAndino.inputEnabled=true;
    this.territorio.atributos.ecosistemas.bosqueAltoAndino.input.pixelPerfectClick=true;
    this.territorio.atributos.ecosistemas.bosqueAltoAndino.atributos={suelo:{area:100,agua:100000},temperatura:this.aire.temp-2,tempActual:this.aire.temp,propTemperatura:1,aguaLLuvia:0.00};
    this.territorio.atributos.ecosistemas.bosqueAltoAndino.events.onInputDown.add(this.colocarItemBA,this);


    //this.hojas={};
    this.raiz={};
    this.pruebaBool=0.5;
    //toma como referencia la mitad del sprite
    this.sol.anchor.setTo(0.5);
    //aumenta o disminuye el tamaño del sprite
    this.sol.scale.setTo(0.1);
    


    this.territorio.atributos.ecosistemas.nevado = this.game.add.sprite(0,this.game.world.height-525, 'nevado1');
    this.territorio.atributos.ecosistemas.paramo = this.game.add.sprite(0,this.game.world.height-390, 'paramo');
    this.territorio.atributos.ecosistemas.paramo.inputEnabled=true;
    this.territorio.atributos.ecosistemas.paramo.input.pixelPerfectClick=true;
    this.territorio.atributos.ecosistemas.paramo.atributos={suelo:{area:50,agua:50000},temperatura:this.aire.temp-4,tempActual:this.aire.temp,propTemperatura:1,aguaLLuvia:0.00};
    this.territorio.atributos.ecosistemas.paramo.events.onInputDown.add(this.colocarItemP,this);
     
  this.territorio.atributos.ecosistemas.rio=this.game.add.sprite(100,this.territorio.atributos.ecosistemas.paramo.y+50, 'rio1');
    this.territorio.atributos.ecosistemas.rio.inputEnabled=true;
    this.territorio.atributos.ecosistemas.rio.atributos={sonido:{negacion:this.game.add.audio('sonidoNegacion')}};
    this.territorio.atributos.ecosistemas.rio.input.pixelPerfectClick=true;
    this.territorio.atributos.ecosistemas.rio.events.onInputDown.add(this.seleccionarRio,this);     

      
    
    //this.crearCedro(20,450,this.arbolesBosqueAlAnd);

   this.arbolesBosqueAlAnd=this.game.add.group();
   this.crearPino(10,400,this.arbolesBosqueAlAnd);
   this.arbolesParamo=this.game.add.group();
   this.arbolesSabana=this.game.add.group();
    this.oso=this.game.add.sprite(200,450,'oso');
    this.oso.anchor.setTo(0.5);
    //cambia el sentido del sprite
    this.oso.scale.setTo(-1,1);
    //this.backgroundColor=this.game.stage.backgroundColor='#4488AA';
    //agrega atributo al oso
      this.oso.customParams={vida: 10,sonido:this.game.add.audio('sonidoOso')};
      var style={font: '20px Arial', fill:'#fff'};
      
      this.pruebaContenido=this.game.add.text(this.game.width/2+40,0,'Enero',style);
      this.iconoTemperatura=this.game.add.sprite(this.game.width/2+100,0,'iTemperatura');
      this.medidaTemperatura=this.game.add.sprite(this.game.width/2+120,0,'termVerde1');
      this.iconoOxigeno=this.game.add.sprite(this.game.width/2+160,0, 'iOxigeno');
      this.medidaOxigeno=this.game.add.sprite(this.game.width/2+190,0,'termVerde2');
      this.iconoDioxido=this.game.add.sprite(this.game.width/2+220,0, 'iDioxido');
      this.medidaDioxido=this.game.add.sprite(this.game.width/2+260,0,'termVerde1');
      this.iconoAgua=this.game.add.sprite(this.game.width/2+290,0, 'iAgua');
      this.medidaAgua=this.game.add.sprite(this.game.width/2+320,0,'termVerde2');
      this.iconoDioxido.umbral1=false;
      this.iconoDioxido.umbral2=false;

      this.dobles=this.game.add.text(300,0,this.pruebaBool,style);
      this.contadorSegundos=this.game.time.events.loop(Phaser.Timer.QUARTER  ,this.contarSegundos,this);

  

     this.infoAire=this.game.add.text(0,50,'O2: '+this.aire.o2+' CO2:'+this.aire.co2+' H2O:'+this.aire.h2o+' temp:'+this.aire.temp,style);
    /*  
    this.nube=this.game.add.sprite(220,50,'nube');
    //toma como referencia la mitad del sprite
    this.nube.anchor.setTo(0.5);
    //aumenta o disminuye el tamaño del sprite
    this.nube.scale.setTo(0.5);  
    this.nube.customParams={dir: 1};
    */
    this.nubes=this.game.add.group();
    this.crearNubes(this.nubes);  
    //activar el input al objeto oso
      this.oso.inputEnabled=true;
      this.oso.input.pixelPerfectClick=true;//permite identificar toda la figura del oso
      this.oso.events.onInputDown.add(this.moverAnimal,this);
	   
    //habilita evento al oso
    /*  
    vaca=this.game.add.sprite(50,100,'vaca',0);
    vaca.anchor.setTo(0.5);
    vaca.animations.add('vacaComiendo',[0,1,2,3,0],8,false);
    vaca.inputEnabled=true;
    vaca.input.pixelPerfectClick=true;
    vaca.input.enableDrag();
    vaca.events.onInputDown.add(this.vacaComer,this);
    vaca.scale.setTo(0.5,0.5); 
*/
    pino=this.game.add.sprite((this.game.width/2)-50,this.game.world.height-30,'iPino');
    pino.anchor.setTo(0.5);  
    pino.inputEnabled=true;
    pino.sonido={negacion:this.game.add.audio('sonidoNegacion')};
    pino.nombre='pino';
    //pino.input.pixelPerfectClick=true;//permite identificar toda la figura del oso
    pino.events.onInputDown.add(this.seleccionarIcono,this);

    cedro=this.game.add.sprite(this.game.width/2,this.game.world.height-30,'iCedro');
    cedro.anchor.setTo(0.5);  
    cedro.inputEnabled=true;
    cedro.sonido={negacion:this.game.add.audio('sonidoNegacion')};
    cedro.nombre='cedro';
    //cedro.input.pixelPerfectClick=true;//permite identificar toda la figura del oso
    cedro.events.onInputDown.add(this.seleccionarIcono,this);

    manzano=this.game.add.sprite(this.game.width/2-100,this.game.world.height-30,'iManzano');
    manzano.anchor.setTo(0.5);  
    manzano.inputEnabled=true;
    manzano.sonido={negacion:this.game.add.audio('sonidoNegacion')};
    manzano.nombre='manzano';
    //manzano.input.pixelPerfectClick=true;//permite identificar toda la figura del oso
    manzano.events.onInputDown.add(this.seleccionarIcono,this);

    frailejon=this.game.add.sprite(this.game.width/2-150,this.game.world.height-30,'iFrailejon');
    frailejon.anchor.setTo(0.5);  
    frailejon.inputEnabled=true;
    frailejon.sonido={negacion:this.game.add.audio('sonidoNegacion')};
    frailejon.nombre='frailejon';
    //frailejon.input.pixelPerfectClick=true;//permite identificar toda la figura del oso
    frailejon.events.onInputDown.add(this.seleccionarIcono,this);

      
    casa=this.game.add.sprite((this.game.width/2)+100,this.game.world.height-30,'iCasa');
    casa.nombre='casa';
    casa.sonido={negacion:this.game.add.audio('sonidoNegacion')};
    casa.anchor.setTo(0.5);  
    casa.inputEnabled=true;
    casa.events.onInputDown.add(this.seleccionarIcono,this);

    fin=this.game.add.sprite((this.game.width/2)+50,this.game.world.height-30,'fin');
    fin.anchor.setTo(0.5);  
    fin.inputEnabled=true;
    //fin.input.pixelPerfectClick=true;//permite identificar toda la figura del oso
    fin.events.onInputDown.add(this.finalizarJuego,this);

    var styleDatos={font: '15px Arial', fill:'#fff'};
    this.cantMadera=this.game.add.text(this.game.width-25,75,'',styleDatos);
    this.cantEnergia=this.game.add.text(this.game.width-25,95,'',styleDatos);
    this.cantFrutas=this.game.add.text(this.game.width-25,115,'',styleDatos);
    this.cantTala=this.game.add.text(this.game.width-25,135,'',styleDatos);

    this.botonMadera=this.game.add.sprite(this.game.width*2,80,'bMadera');
    this.botonMadera.anchor.setTo(0.5);
    this.botonMadera.scale.setTo(0.5);

    this.botonEnergia=this.game.add.sprite(this.game.width*2,100,'bEnergia');
    this.botonEnergia.anchor.setTo(0.5);
    this.botonEnergia.scale.setTo(0.5);
    
    this.botonFrutas=this.game.add.sprite(this.game.width*2,120,'bFruta');
    this.botonFrutas.anchor.setTo(0.5);
    this.botonFrutas.scale.setTo(0.5);
    
    this.botonTalar=this.game.add.sprite(this.game.width*2,140,'bTala');
    this.botonTalar.anchor.setTo(0.5);
    this.botonTalar.scale.setTo(0.5);
    this.botonTalar.inputEnabled=true;
    //this.botonTalar.input.pixelPerfectClick=true;//permite identificar toda la figura del oso
    this.botonTalar.events.onInputDown.add(this.talarArbol,this);
      
    this.botones=[pino,manzano,frailejon,cedro,casa];
    //this.botonesArbol=[botonMadera,botonEnergia,botonFrutas,botonTalar];
    var selectedItem=null;

    var arbolSeleccionado=null;

//funciones
    this.funcionesHojas={ 
  absorberAgua:function(spriteArbol){
 if(parseFloat(spriteArbol.atributos.agua)>=parseFloat(spriteArbol.atributos.hojas.mH2O)){
    spriteArbol.atributos.hojas.aguaAbsorvida=spriteArbol.atributos.hojas.mH2O;
    spriteArbol.atributos.agua=(parseFloat(spriteArbol.atributos.agua)-parseFloat(spriteArbol.atributos.hojas.mH2O)).toFixed(3);
  }else{
    spriteArbol.atributos.hojas.aguaAbsorvida=spriteArbol.atributos.agua;
    spriteArbol.atributos.agua=0.0;
  }
  
},
 realizarEtapaLuminica:function(aire,spriteArbol,funcionesAire){
  var aguaFotosintesis=0.0;
  if(parseFloat(aire.co2)>0.0 && parseFloat(spriteArbol.atributos.hojas.aguaAbsorvida)>0.0){
    if(parseFloat(aire.co2)>=parseFloat(spriteArbol.atributos.hojas.mCO2)){
        spriteArbol.atributos.hojas.dioxidoAbsorvido=spriteArbol.atributos.hojas.mCO2;
        funcionesAire.disminuirDioxido(aire,spriteArbol.atributos.hojas.dioxidoAbsorvido);
        spriteArbol.atributos.hojas.oxigenoDioxido=spriteArbol.atributos.hojas.dioxidoAbsorvido;
        spriteArbol.atributos.hojas.dioxidoAbsorvido=(parseFloat(spriteArbol.atributos.hojas.dioxidoAbsorvido)+parseFloat(spriteArbol.atributos.hojas.dioxidoAcumulado)).toFixed(3);
    }
    else{
      spriteArbol.atributos.hojas.dioxidoAbsorvido=aire.co2;
      funcionesAire.disminuirDioxido(aire,spriteArbol.atributos.hojas.dioxidoAbsorvido);
      spriteArbol.atributos.hojas.oxigenoDioxido=spriteArbol.atributos.hojas.dioxidoAbsorvido;
      spriteArbol.atributos.hojas.dioxidoAbsorvido=(parseFloat(spriteArbol.atributos.hojas.dioxidoAbsorvido)+parseFloat(spriteArbol.atributos.hojas.dioxidoAcumulado)).toFixed(3);
    }
    aguaFotosintesis=(parseFloat(spriteArbol.atributos.hojas.aguaAbsorvida)*parseFloat(spriteArbol.atributos.hojas.porcFotosintesis)).toFixed(3);
   spriteArbol.atributos.hojas.aguaEvapora=(parseFloat(spriteArbol.atributos.hojas.aguaAbsorvida)-parseFloat(aguaFotosintesis)).toFixed(3);
   spriteArbol.atributos.hojas.aguaAbsorvida=(parseFloat(aguaFotosintesis)+parseFloat(spriteArbol.atributos.hojas.aguaAcumulada)).toFixed(3);
  }
},
generarGlucosa:function(spriteArbol){
    while(parseFloat(spriteArbol.atributos.hojas.dioxidoAbsorvido)>=6.0 && parseFloat(spriteArbol.atributos.hojas.aguaAbsorvida)>=6.0){
        spriteArbol.atributos.glucosa++;
        spriteArbol.atributos.hojas.dioxidoAbsorvido=(parseFloat(spriteArbol.atributos.hojas.dioxidoAbsorvido)-6.0).toFixed(3);
        spriteArbol.atributos.hojas.aguaAbsorvida=(parseFloat(spriteArbol.atributos.hojas.aguaAbsorvida)-6.0).toFixed(3);
        
    }
    spriteArbol.atributos.hojas.dioxidoAcumulado=spriteArbol.atributos.hojas.dioxidoAbsorvido;
    spriteArbol.atributos.hojas.aguaAcumulada=spriteArbol.atributos.hojas.aguaAbsorvida;
},
generarOxigeno:function(aire,spriteArbol,funcionesAire){
  funcionesAire.aumentarOxigeno(aire,spriteArbol.atributos.hojas.oxigenoDioxido);
  spriteArbol.atributos.hojas.oxigenoDioxido=0.0;
},
evaporarAgua:function(aire,spriteArbol,funcionesAire){
  funcionesAire.aumentarAgua(aire,spriteArbol.atributos.hojas.aguaEvapora);
  spriteArbol.atributos.hojas.aguaEvapora=0.0;
},
aumentarCapacidad:function(cant,spriteArbol){
  spriteArbol.atributos.hojas.mH2O=(parseFloat(spriteArbol.atributos.hojas.mH2O)+ parseFloat(cant)*parseFloat(spriteArbol.atributos.hojas.cantHojas)).toFixed(3);
  spriteArbol.atributos.hojas.mCO2=(parseFloat(spriteArbol.atributos.hojas.mH2O)*parseFloat(spriteArbol.atributos.hojas.porcFotosintesis)).toFixed(3);
},
disminuirCapacidad:function(cant,spriteArbol){
  spriteArbol.atributos.hojas.mH2O=(parseFloat(spriteArbol.atributos.hojas.mH2O)-parseFloat(cant)*parseFloat(spriteArbol.atributos.hojas.cantHojas)).toFixed(3);
  spriteArbol.atributos.hojas.mCO2=(parseFloat(spriteArbol.atributos.hojas.mH2O)*parseFloat(spriteArbol.atributos.hojas.porcFotosintesis)).toFixed(3);
}
};

this.funcionesAire={
  disminuirDioxido:function(aire,cantidad){ 
  aire.co2=(parseFloat(aire.co2)-parseFloat(cantidad)).toFixed(3);
},
 aumentarOxigeno:function(aire,cantidad){
  aire.o2=(parseFloat(aire.o2)+parseFloat(cantidad)).toFixed(3);
 },
 aumentarAgua:function(aire,cantidad){
  aire.h2o=(parseFloat(aire.h2o)+parseFloat(cantidad)).toFixed(3);
 }
};

this.funcionesRaiz={
absorberAgua:function(spriteArbol,suelo,cantRequerida){
  if(parseFloat(cantRequerida)>=parseFloat(spriteArbol.atributos.raiz.capAbsRaiz)){
    if(parseFloat(suelo.agua)>=parseFloat(spriteArbol.atributos.raiz.capAbsRaiz)){
        spriteArbol.atributos.agua=(parseFloat(spriteArbol.atributos.agua)+parseFloat(spriteArbol.atributos.raiz.capAbsRaiz)).toFixed(3);
        suelo.agua=(parseFloat(suelo.agua)-parseFloat(spriteArbol.atributos.raiz.capAbsRaiz)).toFixed(3);
    }else{
      spriteArbol.atributos.agua=(parseFloat(spriteArbol.atributos.agua)+parseFloat(suelo.agua)).toFixed(3);
      suelo.agua=0.0;
    }
  }else{
    if(parseFloat(suelo.agua)>=parseFloat(cantRequerida)){
      spriteArbol.atributos.agua=(parseFloat(spriteArbol.atributos.agua)+parseFloat(cantRequerida)).toFixed(3);
      suelo.agua=(parseFloat(suelo.agua)-parseFloat(cantRequerida)).toFixed(3);
    }else{
      spriteArbol.atributos.agua=(parseFloat(spriteArbol.atributos.agua)+parseFloat(suelo.agua)).toFixed(3);
      suelo.agua=0.0;
    }
  }
  
}
};

this.funcionesArbol={
  generarFrutos:function(spriteArbol){
    var frutas=0;
    frutas=parseInt((spriteArbol.atributos.glucosa*0.6)/spriteArbol.atributos.cantGlucosaReqF);
    spriteArbol.atributos.frutos+=frutas;
    spriteArbol.loadTexture(spriteArbol.atributos.frutoImg);
    
  },
   borrarFrutos:function(spriteArbol){
    var frutas=0;
    spriteArbol.atributos.frutos=0;
    spriteArbol.loadTexture(spriteArbol.atributos.nombre);
  },
  verificarEnergia:function(spriteArbol){
    if(spriteArbol.atributos.glucosa>=spriteArbol.atributos.cantGlucosaReqE){
      spriteArbol.atributos.energia++;
      spriteArbol.atributos.glucosa-=spriteArbol.atributos.cantGlucosaReqE;
    }
    spriteArbol.atributos.energia--;
    if(spriteArbol.atributos.energia<=0){//spriteArbol.destroy()
    };
  },
  realizarFotosintesis:function(accionPlanta,variacionTemp,element,aire,funcionesHojas,funcionesAire){
        if(accionPlanta=='aumentar'){
          funcionesHojas.aumentarCapacidad((parseFloat(variacionTemp)*parseFloat(element.atributos.aumentoAbs)).toFixed(3),element);}
        if(accionPlanta=='disminuir'){funcionesHojas.disminuirCapacidad((parseFloat(variacionTemp)*parseFloat(element.atributos.aumentoAbs)).toFixed(3),element);}
        funcionesHojas.absorberAgua(element);
        funcionesHojas.realizarEtapaLuminica(aire,element,funcionesAire);
        funcionesHojas.generarOxigeno(aire,element,funcionesAire);
        funcionesHojas.evaporarAgua(aire,element,funcionesAire);
        funcionesHojas.generarGlucosa(element);
  },
  absorberAgua:function(suelo,elementoArbol,funcionesRaiz){
    if(elementoArbol){
    var cantRequerida=(parseFloat(elementoArbol.atributos.capacidadAgua)-parseFloat(elementoArbol.atributos.agua)).toFixed(3);
    if(cantRequerida>0.0){
      funcionesRaiz.absorberAgua(elementoArbol,suelo,cantRequerida);
    }
  }
  }
};
this.funcionesEcosistema={
  captarLLuvia:function(aguaLLuvia,cant){
    aguaLLuvia=cant;
  },
  realizarProcesos:function(aire,ecosistema,grupoArboles,funcionesArbol,funcionesHojas,funcionesAire,funcionesRaiz,tiempo){
    var difTemperatura=0.0,aux=0,accionPlanta="";
 
    if(aire.temp>ecosistema.atributos.tempActual){
      difTemperatura=(parseFloat(aire.temp)-parseFloat(ecosistema.atributos.tempActual)).toFixed(3);

      aux=difTemperatura/ecosistema.atributos.propTemperatura;
      ecosistema.atributos.temperatura+=aux;

      accionPlanta="aumentar";
    }else if(aire.temp<ecosistema.atributos.tempActual){
      difTemperatura=(parseFloat(ecosistema.atributos.tempActual)-parseFloat(aire.temp)).toFixed(3);
      aux=difTemperatura/ecosistema.atributos.propTemperatura;
      ecosistema.atributos.temperatura-=aux;
      accionPlanta="disminuir";
      
    }

    ecosistema.atributos.tempActual=aire.temp;
        if(aire.luz){
      grupoArboles.forEach(function(element){
        if(element){
        funcionesArbol.realizarFotosintesis(accionPlanta,aux,element,aire,funcionesHojas,funcionesAire);
      }
       });
    }
      grupoArboles.forEach(function(element){
        if(element){
        funcionesArbol.absorberAgua(ecosistema.atributos.suelo,element,funcionesRaiz);
      
        if(element.atributos.contVerificaE==element.atributos.contAux){
        funcionesArbol.verificarEnergia(element);
        element.atributos.contAux=0;
      }else{
        element.atributos.contAux++;
      }
        if(element.atributos.frutal){
          for(i in element.atributos.epocaFrutos){
            if(element.atributos.epocaFrutos[i]==tiempo.dia){
                 if(tiempo.hora==7){
                    funcionesArbol.generarFrutos(element);
                 }
            }
           if(element.atributos.epocaFrutos[i]+1==tiempo.dia){
                 if(tiempo.hora==7){
                    funcionesArbol.borrarFrutos(element);
                 }
            }
          }
        }
       }});
   //this.territorio.atributos.ecosistemas.paramo..atributos={suelo:{area:50,agua:55560.00},temperatura:-1,tempActual:-1,propTemperatura:1,aguaLLuvia:0.00};
}
};
//cierre de funciones

  },
  //this is executed multiple times per second
  update: function() {
  // this.moverNube(this.nube);
   var self=this;
   this.nubes.forEach(function(element){self.moverNube(element);});
   if(this.aire.co2>=3000 && !this.iconoDioxido.umbral1 && !this.iconoDioxido.umbral2){this.medidaDioxido.loadTexture('termAmarillo');
   this.aumentarTemperatura(2);
   this.iconoDioxido.umbral1=true;
    }
    if(this.aire.co2>=4000 && this.iconoDioxido.umbral1 && !this.iconoDioxido.umbral2){this.medidaDioxido.loadTexture('termRojo2');
   this.aumentarTemperatura(2);
   this.iconoDioxido.umbral1=false;
   this.iconoDioxido.umbral2=true;
    }
  if(this.aire.co2<4000 && this.aire.co2>=3000 && !this.iconoDioxido.umbral1 && this.iconoDioxido.umbral2){this.medidaDioxido.loadTexture('termAmarillo');
   this.disminuirTemperatura(2);
   this.iconoDioxido.umbral1=true;
   this.iconoDioxido.umbral2=false;
    }
if(this.aire.co2>100 && this.aire.co2<3000 && this.iconoDioxido.umbral1){this.medidaDioxido.loadTexture('termVerde1');
   this.disminuirTemperatura(2);
   this.iconoDioxido.umbral1=false;
    }
    if(this.aire.co2<=100 && !this.iconoDioxido.umbral1){this.medidaDioxido.loadTexture('termRojo1');
   this.disminuirTemperatura(2);
   this.iconoDioxido.umbral1=true;
    }
     if(this.aire.co2>100 && this.aire.co2<300 && this.iconoDioxido.umbral1){this.medidaDioxido.loadTexture('termRojo1');
   this.aumentarTemperatura(2);
   this.iconoDioxido.umbral1=false;
    }

    if(this.aire.o2<5100){
      this.medidaOxigeno.loadTexture('termAmarillo');
    }
    if(this.aire.o2>=5100){
      this.medidaOxigeno.loadTexture('termVerde2');
    }
    if(this.aire.temp>26 && this.aire.temp<28){
      this.medidaTemperatura.loadTexture('termAmarillo');
      this.territorio.atributos.ecosistemas.nevado.loadTexture('nevado2');
    }
    if(this.aire.temp>28 && this.aire.temp<30){
       this.medidaTemperatura.loadTexture('termRojo2');
      this.territorio.atributos.ecosistemas.nevado.loadTexture('nevado3');
    }
    if(this.aire.temp>30){
       this.medidaTemperatura.loadTexture('termRojo3');
      this.territorio.atributos.ecosistemas.nevado.loadTexture('nevado4');
    }
    if(this.aire.temp<=26 && this.aire.temp>=1){
      this.medidaTemperatura.loadTexture('termVerde2');
      this.territorio.atributos.ecosistemas.nevado.loadTexture('nevado1');
    }
    if(this.aire.temp<1){
      this.medidaTemperatura.loadTexture('termRojo1');
    }
  },
  
   moverAnimal: function(sprite,event){
        //var osoMoviendo=this.game.add.tween(os);
  
        sprite.customParams.sonido.play();
       //osoMoviendo.to({X: 700},1000);
       //osoMoviendo.start();
	   sprite.x+=10;
       sprite.customParams.vida--;
   },
    
  moverNube: function(sprite){
      if(this.game.world.width-sprite.width/2<=sprite.x)
          {sprite.customParams.dir=-1;}
      else if(sprite.width/2>=sprite.x){
          sprite.customParams.dir=1;
      }
       if(sprite.customParams.dir==1){
           sprite.x++;
       }else{
           sprite.x--;
       }
  }, 
  absorberAguaNube: function(sprite,aguaAbsorvida){      
      sprite.customParams.agua=(parseFloat(sprite.customParams.agua)+parseFloat(aguaAbsorvida)).toFixed(2);
      console.log('agua nube: '+sprite.customParams.agua);  
  }, 
vacaComer: function(sprite, event) {
    sprite.play('vacaComiendo');
  },
   crearNubes: function(grupoNube){
    var nubesF;
    for(var i=1; i<3;i++){
      nubesF=grupoNube.create((this. game.rnd.integerInRange(1, 200))*i,50,'nube');
      nubesF.anchor.setTo(0.5);
    //aumenta o disminuye el tamaño del sprite
    nubesF.scale.setTo(0.5);  
    nubesF.customParams={dir: 1,agua:0.0};
    }
    
   },    

seleccionarIcono:function(sprite,event){
  this.clearSelection();
  sprite.alpha=0.4;
  this.selectedItem=sprite;
},  
validarArbol:function(sprite,event){
  var self=this;
  if(!this.arbolSeleccionado){
     this.seleccionarArbol(sprite);
  }else{
     this.desSeleccionarArbol();
  }
},  
seleccionarArbol:function(spriteArbol){
       this.arbolSeleccionado=spriteArbol;
     this.arbolSeleccionado.alpha=0.4;
     var movimientoBotonesArbolM=this.game.add.tween(this.botonMadera);
     movimientoBotonesArbolM.to({x:this.game.width-40, y:this.botonMadera.y},400); 
     movimientoBotonesArbolM.onComplete.add(function(){this.cantMadera.text=this.arbolSeleccionado.atributos.madera;},this);
     movimientoBotonesArbolM.start();
     var movimientoBotonesArbolE=this.game.add.tween(this.botonEnergia);
     movimientoBotonesArbolE.to({x:this.game.width-40, y:this.botonEnergia.y},400); 
     movimientoBotonesArbolE.onComplete.add(function(){this.cantEnergia.text=this.arbolSeleccionado.atributos.energia;},this);
     movimientoBotonesArbolE.start();
     var movimientoBotonesArbolF=this.game.add.tween(this.botonFrutas);
     movimientoBotonesArbolF.to({x:this.game.width-40, y:this.botonFrutas.y},400); 
     movimientoBotonesArbolF.onComplete.add(function(){this.cantFrutas.text=this.arbolSeleccionado.atributos.frutos;},this);
     movimientoBotonesArbolF.start();
     var movimientoBotonesArbolT=this.game.add.tween(this.botonTalar);
     movimientoBotonesArbolT.to({x:this.game.width-40, y:this.botonTalar.y},400); 
     movimientoBotonesArbolT.onComplete.add(function(){this.cantTala.text='talar';},this);
     movimientoBotonesArbolT.start();
},
desSeleccionarArbol:function(){
    this.arbolSeleccionado.alpha=1;
    this.cantMadera.text="";
    this.cantTala.text='';
    this.cantFrutas.text='';
    this.cantEnergia.text='';
    var movimientoBotonesArbol=this.game.add.tween(this.botonMadera);
     movimientoBotonesArbol.to({x:this.game.width*2, y:this.botonMadera.y},600); 
     movimientoBotonesArbol.start();
     var movimientoBotonesArbolE=this.game.add.tween(this.botonEnergia);
     movimientoBotonesArbolE.to({x:this.game.width*2, y:this.botonEnergia.y},600); 
     movimientoBotonesArbolE.start();
     var movimientoBotonesArbolF=this.game.add.tween(this.botonFrutas);
     movimientoBotonesArbolF.to({x:this.game.width*2, y:this.botonFrutas.y},600); 
     movimientoBotonesArbolF.start();
     var movimientoBotonesArbolT=this.game.add.tween(this.botonTalar);
     movimientoBotonesArbolT.to({x:this.game.width*2, y:this.botonTalar.y},600); 
     movimientoBotonesArbolT.start();   
     this.arbolSeleccionado=null;
   },
talarArbol:function(){
  var arbolMuerto=this.arbolSeleccionado;
  this.desSeleccionarArbol();
  arbolMuerto.destroy();
},
clearSelection:function(){
    this.botones.forEach(function(element,index){element.alpha=1;});
    this.selectedItem=null;
},
colocarItem:function(sprite,event){
    if(this.selectedItem){
    var x=event.position.x;
    var y=event.position.y;
    this.crearPino(x,y,this.arbolesBosqueAlAnd);
    /*
    var nuevoItem=this.game.add.sprite(x,y,this.selectedItem.key);
    nuevoItem.anchor.setTo(0.5,1);
    nuevoItem.customParams=this.selectedItem.customParams;
    var movimientoOso=this.game.add.tween(this.oso);
    //movimientoOso.to({x:x, y:y},700);   
    //this.selectedItem.alpha=1; this.selectedItem=null;    
    //movimientoOso.onComplete.add(function(){nuevoItem.destroy();},this);
    //movimientoOso.start();
      */  
    }
} ,

colocarItemBA:function(sprite,event){
    if(this.selectedItem){
        var x=event.position.x;
        var y=event.position.y;
        if(this.selectedItem.nombre=='pino'){
        this.crearPino(x,y,this.arbolesBosqueAlAnd);
      }else if(this.selectedItem.nombre=='cedro'){
        this.crearCedro(x,y,this.arbolesBosqueAlAnd);
      }else if(this.selectedItem.nombre=='manzano'){
        this.crearManzano(x,y,this.arbolesBosqueAlAnd);
      }else{
        this.selectedItem.sonido.negacion.play();
      }
    this.selectedItem.alpha=1; this.selectedItem=null;
    }
} ,
colocarItemP:function(sprite,event){
    if(this.selectedItem){
        var x=event.position.x;
        var y=event.position.y;
        if(this.selectedItem.nombre=='frailejon'){
        this.crearFrailejon(x,y,this.arbolesParamo);
      }else{
        this.selectedItem.sonido.negacion.play();
      }
    this.selectedItem.alpha=1; this.selectedItem=null;
    }
} ,
colocarItemS:function(sprite,event){
    if(this.selectedItem){
        var x=event.position.x;
        var y=event.position.y;
        if(this.selectedItem.nombre=='pino'){
        this.crearPino(x,y,this.arbolesSabana);
      }else if(this.selectedItem.nombre=='casa'){
        this.crearCasa(x,y);
      }else if(this.selectedItem.nombre=='manzano'){
        this.crearManzano(x,y,this.arbolesSabana);
      }else{
        this.selectedItem.sonido.negacion.play();
      }
    this.selectedItem.alpha=1; this.selectedItem=null;
    }
} ,

seleccionarRio:function(sprite,event){
sprite.atributos.sonido.negacion.play();
},
contarSegundos:function(){
  var self=this;
   //this.pruebaContenido.text='Tiempo: '+this.tiempo.dia+':'+this.tiempo.hora+':'+this.tiempo.minuto;
   if(this.tiempo.dia==1){
    this.pruebaContenido.text='Enero';
   }else if(this.tiempo.dia==2){
    this.pruebaContenido.text='Febrero';
   }else if(this.tiempo.dia==3){
    this.pruebaContenido.text='Marzo';
   }else if(this.tiempo.dia==4){
    this.pruebaContenido.text='Abril';
   }else if(this.tiempo.dia==5){
    this.pruebaContenido.text='Mayo';
   }else if(this.tiempo.dia==6){
    this.pruebaContenido.text='Junio';
   }else if(this.tiempo.dia==7){
    this.pruebaContenido.text='Julio';
   }else if(this.tiempo.dia==8){
    this.pruebaContenido.text='Agosto';
   }else if(this.tiempo.dia==9){
    this.pruebaContenido.text='Septiembre';
   }else if(this.tiempo.dia==10){
    this.pruebaContenido.text='Octubre';
   }else if(this.tiempo.dia==11){
    this.pruebaContenido.text='Noviembre';
   }else if(this.tiempo.dia==12){
    this.pruebaContenido.text='Diciembre';
   }
   if(this.tiempo.minuto==59){
    this.tiempo.hora++;
    this.tiempo.minuto=0;
     if(this.tiempo.hora==24){this.tiempo.dia++;this.tiempo.hora=0;
      if(this.tiempo.dia==13){this.tiempo.dia=1;}
     }
    if(this.tiempo.hora==6 || this.tiempo.hora==18){this.cambiarEstadoLuz();

    }
    if(this.aire.h2o>0.0){
        var aguaAbsorvida=(0.001*parseFloat(this.aire.h2o)).toFixed(2);
        this.nubes.forEach(function(element){
          self.absorberAguaNube(element,aguaAbsorvida);
          self.aire.h2o=(self.aire.h2o-aguaAbsorvida).toFixed(2);
          console.log('agua aire: '+self.aire.h2o);
        });
    }
    if(this.tiempo.hora<12){this.aumentarTemperatura(2);}
    else{this.disminuirTemperatura(2);}
    this.modificarCO2(200.00,true);
    this.funcionesEcosistema.realizarProcesos(this.aire,this.territorio.atributos.ecosistemas.bosqueAltoAndino,this.arbolesBosqueAlAnd,this.funcionesArbol,this.funcionesHojas,this.funcionesAire,this.funcionesRaiz,this.tiempo);
    this.funcionesEcosistema.realizarProcesos(this.aire,this.territorio.atributos.ecosistemas.paramo,this.arbolesParamo,this.funcionesArbol,this.funcionesHojas,this.funcionesAire,this.funcionesRaiz,this.tiempo);
    this.funcionesEcosistema.realizarProcesos(this.aire,this.territorio.atributos.ecosistemas.sabana,this.arbolesSabana,this.funcionesArbol,this.funcionesHojas,this.funcionesAire,this.funcionesRaiz,this.tiempo);
       }
    this.infoAire.text=this.tiempo.minuto;   
   this.pruebaBool=(parseFloat(this.pruebaBool)+0.2).toFixed(3);
  //(this.pruebaBool).toFixed(2);
   //this.dobles.text=this.pruebaBool;

   this.tiempo.minuto++;

},
finalizarJuego:function(){
    this.game.state.restart();
},
cambiarEstadoLuz:function(){
  var self=this;
  if(this.aire.luz){
    this.aire.luz=false;
    this.fondo.loadTexture('noche');
    var movimientoSol=this.game.add.tween(this.sol);
     movimientoSol.to({x:-100, y:this.sol.y},600); 
    movimientoSol.start();
    var movimientoLuna=self.game.add.tween(self.luna);
     movimientoLuna.to({x:100, y:self.luna.y},600); 
     movimientoLuna.start();
    

  }else{
    this.aire.luz=true;
    this.fondo.loadTexture('dia');
    var movimientoLuna=this.game.add.tween(this.luna);
    movimientoLuna.to({x:-100, y:20},600); 
    movimientoLuna.start();
    var movimientoSol=this.game.add.tween(self.sol);
     movimientoSol.to({x:100, y:20},600); 
     movimientoSol.start();
  
   
  }

},
aumentarTemperatura:function(num){
  this.aire.temp+=num;
},
disminuirTemperatura:function(num){
  this.aire.temp-=num;
},
modificarCO2:function(cant,aumento){
  if(aumento){this.aire.co2=(parseFloat(this.aire.co2)+parseFloat(cant)).toFixed(3);}
  else{this.aire.co2=(parseFloat(this.aire.co2)-parseFloat(cant)).toFixed(3);}
},
crearArbol:function(x,y,tipoArbol,aumentoAbs,capH2O,cHojas,mCo2,mH2o,porcFot,capAbsH2O,grupoArboles,cantMadera,valFrutal,mesFrutos,energia,cantGlucosaEnergia,cantGlucosaFrutos,contVerificaE,frutoImg){
   //this.crearArbol(300,300,'pino',0.02,10,100,0.144,0.2,0.72,15,this.arbolesBosqueAlAnd);
 var arbol,cph;
 cph=(parseFloat(capH2O)*55.56).toFixed(3);
 arbol=grupoArboles.create(x,y,tipoArbol);
 arbol.anchor.setTo(0.5,1);    
 arbol.inputEnabled=true;
 arbol.input.pixelPerfectClick=true;//permite identificar toda la figura del oso
 arbol.atributos={frutoImg:frutoImg,nombre:tipoArbol,agua:10,aumentoAbs:aumentoAbs,capacidadAgua:cph,madera:cantMadera,frutal:valFrutal,epocaFrutos:mesFrutos,contVerificaE:contVerificaE,contAux:0,
  hojas:{cantHojas:cHojas,mCO2:(parseFloat(mCo2)*parseFloat(cHojas)).toFixed(3),mH2O:(parseFloat(mH2o)*parseFloat(cHojas)).toFixed(3),porcFotosintesis:porcFot,aguaAcumulada:0.0,dioxidoAcumulado:0.0,aguaAbsorvida:0.0,dioxidoAbsorvido:0.0,oxigenoDioxido:0.0,aguaEvapora:0.0},
  raiz:{capAbsRaiz:capAbsH2O},
  energia:energia,glucosa:0,cantGlucosaReqE:cantGlucosaEnergia,cantGlucosaReqF:cantGlucosaFrutos,frutos:0};
   arbol.inputEnabled=true;
   arbol.input.pixelPerfectClick=true;//permite identificar toda la figura del oso
  arbol.events.onInputDown.add(this.validarArbol,this);
 
},
crearPino:function(x,y,grupoArboles){
  this.crearArbol(x,y,'pino',0.02,10,100,0.144,0.2,0.72,18,grupoArboles,15,false,0,12,2,0,7,'');
},
crearCedro:function(x,y,grupoArboles){
  var meses=[1,10];
  this.crearArbol(x,y,'cedro',0.02,10,100,0.144,0.2,0.72,18,grupoArboles,20,true,meses,12,2,3,7,'cedro1');
},
crearManzano:function(x,y,grupoArboles){
  var meses=[2,6];
  this.crearArbol(x,y,'manzano',0.02,7,60,0.144,0.2,0.72,15,grupoArboles,10,true,meses,10,3,2,9,'manzano1');
},
crearFrailejon:function(x,y,grupoArboles){

  this.crearArbol(x,y,'frailejon',0.02,5,10,0.144,0.2,0.72,7,grupoArboles,10,false,0,7,1,0,12,'');
},
crearCasa:function(x,y){
  var casa=this.game.add.sprite(x,y,'casa');
  casa.anchor.setTo(0.5,1); 
}
};
