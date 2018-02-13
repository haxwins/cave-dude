//level
const level1 = [
  "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "x                            x",
  "x                      xx    x",
  "xxxx                         x",
  "x        xx                  x",
  "x                            x",
  "x             xx             x",
  "x                            x",
  "x                            x",
  "xxzzzx                  c    x",
  "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
];
const level2 = [
  "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "x          z                 x",
  "x                            x",
  "x                            x",
  "x                            x",
  "x                            x",
  "x                            x",
  "x                            x",
  "x                            x",
  "x                       c    x",
  "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
];
//constructor for level
function Level(plan){
  this.width = plan[0].length;
  this.height = plan.length;
  this.grid=[];
  this.score=0;
  for(let i=0;i<this.height;i++){
    this.grid[i] = new Array(this.width)
  }
  this.board='';
  this.player={speed:12};
  for(let i=0,l=plan.length;i<l;i++){
    this.board += '<tr>';
    for(let j=0,k=plan[i].length;j<k;j++){
      let temp=plan[i];
      if(temp[j]=='x'){
        this.board += "<th class='wall'></th>";
        this.grid[i][j] = 'x';
      }
      else if(temp[j]=='c'){
        this.board += "<th class='player'></th>";
        this.grid[i][j] = 'c';
        this.player.x = j*30;
        this.player.y = i*30;
      }
      else if(temp[j]=='z'){
        this.board += "<th class='lava'></th>";
        this.grid[i][j] = 'z';
      }
      else{
        this.board += '<th></th>';
        this.grid[i][j] = ' ';
      }
    }
    this.board += '</th>';
  }
  this.player.element = document.getElementsByClassName("player");
}
//rocks
function generateRock(){
  let random = Math.random();
  if(random<0.3){
    this.img = "url('img/rock3.png')";
  }
  else if(random<0.6){
    this.img = "url('img/rock1.png')";
  }
  else{
    this.img = "url('img/rock2.png')";
  }
  this.rotate = 45;
  this.x = Math.floor((Math.random() * 29)+1);
  this.y = 0;
  this.fall = ()=>{
    this.y = this.y += 0.5;
  }
}
//Blinking elements
const blinkingSetup = ()=>{
  let bool=true;
  return (classMain,classBlink)=>{
    let el = document.getElementsByClassName(classMain);
      if(bool){
        for(let i=0; i<el.length;i++){
          el[i].classList.add(classBlink);
          bool = false;
        }
      }
      else{
        for(let i=0; i<el.length;i++){
          el[i].classList.remove(classBlink);
          bool = true;
        }
      }
    }
}
const blinkingPlayer = blinkingSetup();
const blinkingLava = blinkingSetup();
setInterval(()=>{blinkingPlayer('player','player_blink')},1000);
setInterval(()=>{blinkingLava('lava','lava_blink')},500);
//movement
var keys = {};
    keys.UP = 38;
    keys.LEFT = 37;
    keys.RIGHT = 39;
    keys.DOWN = 40;
document.body.onkeyup =
document.body.onkeydown = (e)=>{
  if (e.preventDefault) {
      e.preventDefault();
  }
  else {
  e.returnValue = false;
  }
  let kc = e.keyCode || e.which;
  keys[kc] = e.type == 'keydown';
  };
const movePlayer = (x,y)=>{
    game.player.x += x*game.player.speed;
    game.player.y += y*game.player.speed;
    game.player.element[0].style.left = game.player.x + 'px';
    game.player.element[0].style.top = game.player.y + 'px';
}
const detectMovement = () =>{
  let gridx = Math.floor(game.player.x/30);
  let gridy = Math.floor(game.player.y/30);
  if(keys[keys.LEFT]){
    movePlayer(-1,0);
  }
  if(keys[keys.RIGHT]){
    movePlayer(1,0);
  }
  if(keys[keys.UP]){
    movePlayer(0,-1);
  }
  if(keys[keys.DOWN]){
    movePlayer(0, 1);
  }
}
let rock = new generateRock();
const detectColision = ()=>{
  console.log(rock.img);
  if(Math.abs(game.player.x-rock.x*30) < 30 && Math.abs(game.player.y-rock.y*30) < 30){
    if(rock.img =="url('img/rock3.png')"){
      game.score+=10;
      document.getElementsByClassName("score")[0].innerHTML = game.score;
      rock = new generateRock();
    }
    else{
      rock = new generateRock();
    }
  }
}
setInterval(()=>{
  detectMovement();
  detectColision();
}, 1000/24);
//render level to DOM
let game = new Level(level1);
let gameBoard=document.getElementById('game');
gameBoard.innerHTML=game.board;


let rockDOM = document.createElement("div");
rockDOM.classList.add("rockElement");
gameBoard.appendChild(rockDOM);
let rockElement = document.getElementsByClassName("rockElement");

const rockMove = ()=>{
  rockElement[0].classList.remove("rock_bottom");
  rockElement[0].classList.add("rock");
  rockElement[0].style.backgroundImage = rock.img;
  rockElement[0].style.left = rock.x*30 + 'px';
  rockElement[0].style.top = (rock.y+1)*30 + 'px';
  rockElement[0].style.transform = "rotate(" + (rock.rotate + 45) +  "deg)";
  rock.rotate += 45;
  rock.fall();
  if(rock.y > game.height-3){
    rockElement[0].classList.add("rock_bottom");
  }
  if(rock.y > game.height-2){
    rock = new generateRock();
  }
}
setInterval(rockMove,150);
