var gameSeq = [];
var userSeq = [];

var started = false;
var level = 0;

let btns = ["box-1", "box-2", "box-3", "box-4"];

function gameStart() {
   document.addEventListener("keypress", function () {
      if (started == false) {
         console.log("Game was started");
         started = true;
         levelUp();
         document.querySelector("#start").innerText = "Start";
      }
   });
};
gameStart();

// let startButton = document.querySelector("#start");
// startButton.onclick = function(){
//    gameStart();
// }

function btnFlash(btn) {
   btn.classList.add("flash");
   setTimeout(function () {
      btn.classList.remove("flash")
   }, 300);
};

function userFlash(btn) {
   btn.classList.add("userFlash");
   setTimeout(function () {
      btn.classList.remove("userFlash")
   }, 200);
};

function levelUp() {
   userSeq = [];
   level++;
   document.querySelector("h3").innerText = `Level - ${level}`;

   var rand = Math.floor(Math.random() * 3);
   var randBox = btns[rand];
   var randBtn = document.querySelector(`.${randBox}`);

   btnFlash(randBtn);
   gameSeq.push(randBox);
   console.log(gameSeq);
};

function btnPress() {
   var btn = this;
   userFlash(btn);

   var userBox = btn.getAttribute("id");
   userSeq.push(userBox);

   checkAns(userSeq.length - 1);
};

let allBtns = document.querySelectorAll(".box");
for (btn of allBtns) {
   btn.addEventListener("click", btnPress);
};

function checkAns(ind) {
   if (userSeq[ind] === gameSeq[ind]) {
      if (userSeq.length === gameSeq.length) {
         setTimeout(() => {
            levelUp();
         }, 1000);;
      }
   } else {
      document.querySelector("h3").innerHTML = `Game Over | Your Score : ${level}<br>Lets restart the game...`;
      document.querySelector("h3").style.color = "rgb(237, 62, 62)";
      document.querySelector("body").style.backgroundColor = "red";
      document.querySelector("#start").innerText = "Restart";
      setTimeout(() => {
         document.querySelector("body").style.backgroundColor = "#fff";
      }, 200);
      reset();
   }
};

function reset() {
   gameSeq = [];
   userSeq = [];
   level = 0;
   started = false;
};