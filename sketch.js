//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadexBolinha = 6;
let velocidadeyBolinha = 3;

//variaveis da raquete
let xRaquete = 10;
let yRaquete = 155;
let raqueteComprimento = 8;
let raqueteAltura= 80;

//variaveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 90;
let velocidadeyOponente = 3;

//Placar
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3")
}

let colidiu = false;

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaBorda(); 
  mostraRaquete(xRaquete, yRaquete);
  movimentaRaquete();
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  //verificaColisão();
  colisãoRaqueteBiblioteca(xRaquete, yRaquete);
  colisãoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}


function movimentaBolinha(){
  xBolinha += velocidadexBolinha;
  yBolinha += velocidadeyBolinha;
}

function verificaBorda(){
   
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadexBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeyBolinha *= -1;
  }
}

function mostraRaquete(x,y){
  rect(x, y, raqueteComprimento, raqueteAltura);
  }

function movimentaRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 5;
  }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 5;
  }
}
function movimentaRaqueteOponente(){
  velocidadeyOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30
  yRaqueteOponente += velocidadeyOponente
}

/*function verificaColisão(){
  if(xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadexBolinha *= -1;
  }
}*/

function colisãoRaqueteBiblioteca(x, y){
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if(colidiu){
    velocidadexBolinha *= -1;
    raquetada.play();
  }
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255,140,0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255,140,0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}

function marcaPonto(){
  if(xBolinha > xRaqueteOponente){
    meusPontos += 1;
    ponto.play();
    xBolinha = 300;
    yBolinha = 200;
    velocidadeyBolinha *= -1
  }
  if(xBolinha < xRaquete){
    pontosOponente +=1;
    ponto.play();
    xBolinha = 300;
    yBolinha = 200;
    velocidadeyBolinha *= -1
  }
}