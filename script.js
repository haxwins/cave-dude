//level
let level1 = [
  "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "x                            x",
  "x                      xx    x",
  "xxxx                         x",
  "x        xx                  x",
  "x                            x",
  "x             xx             x",
  "x                            x",
  "x                            x",
  "x                        c   x",
  "xxxxzzzzxxxxxxxxxxxxxxxxxxxxxx",
];
//constructor for level
function Level(plan){
  this.width = plan[0].length;
  this.height = plan.length;
  this.board='';
  this.playerPosition={};
  for(let i=0,l=plan.length;i<l;i++){
    this.board += '<tr>';
    for(let j=0,k=plan[i].length;j<k;j++){
      let temp=plan[i];
      if(temp[j]=='x'){
        this.board += "<th class='wall'></th>";
      }
      else if(temp[j]=='c'){
        this.board += "<th class='player'></th>";
        this.playerPosition.x = j*20;
        this.playerPosition.y = i*20;
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
}
//key press handler
let keyPress = (e)=>{
  if(e.key=="ArrowRight"){
    plan1.playerPosition.x += 5;
    renderMovment();
  }
  else if(e.key=="ArrowLeft"){
    plan1.playerPosition.x -= 5;
    renderMovment();
  }
  else if(e.key=="ArrowUp"){
    plan1.playerPosition.y -= 5;
    renderMovment();
  }
  else if(e.key=="ArrowDown"){
    plan1.playerPosition.y += 5;
    renderMovment();
  }
}
//Blinking elements
let blinkingSetup = ()=>{
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
let blinkingPlayer = blinkingSetup();
let blinkingLava = blinkingSetup();
setInterval(()=>{blinkingPlayer('player','player_blink')},1000);
setInterval(()=>{blinkingLava('lava','lava_blink')},2000);
//render level to DOM
let plan1 = new Level(level1);
let game=document.getElementById('game');
game.innerHTML=plan1.board;
//render player position
let renderMovment = ()=>{
  let playerDOM = document.getElementsByClassName("player");
  playerDOM[0].style.left = plan1.playerPosition.x + 'px';
  playerDOM[0].style.top = plan1.playerPosition.y + 'px';
}
renderMovment();
//event listener for arrow key press
document.addEventListener("keypress",(e)=>{keyPress(e)},false);
