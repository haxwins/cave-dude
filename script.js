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
//constructor for level
function Level(plan){
  this.width = plan[0].length;
  this.height = plan.length;
  this.board='';
  this.player={speed:6};
  for(let i=0,l=plan.length;i<l;i++){
    this.board += '<tr>';
    for(let j=0,k=plan[i].length;j<k;j++){
      let temp=plan[i];
      if(temp[j]=='x'){
        this.board += "<th class='wall'></th>";
      }
      else if(temp[j]=='c'){
        this.board += "<th class='player'></th>";
        this.player.x = j*30;
        this.player.y = i*30;
      }
      else if(temp[j]=='z'){
        this.board += "<th class='lava'></th>";
      }
      else{
        this.board += '<th></th>';
      }
    }
    this.board += '</th>';
  }
  this.player.element = document.getElementsByClassName("player");
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
let key='';
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
  if ( keys[keys.LEFT] ) {
        movePlayer(-1, 0);
      }
      if ( keys[keys.RIGHT] ) {
        movePlayer(1, 0);
      }
      if ( keys[keys.UP] ) {
        movePlayer(0, -1);
      }
      if ( keys[keys.DOWN] ) {
        movePlayer(0, 1);
      }
}
setInterval(function(){
  detectMovement();
}, 1000/24);
//render level to DOM
let game = new Level(level1);
let gameBoard=document.getElementById('game');
gameBoard.innerHTML=game.board;
