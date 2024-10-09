let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset-button");

let newGame = document.querySelector("#new_button");
let msgcontainer = document.querySelector(".msg_container"); // Use querySelector for a single element

let msg = document.querySelector("#msg");
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');

let turnO = true;
let count = 0;

const winningPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    count = 0;
    
    enableBoxes();
    player1.value='';
    player2.value='';
    msgcontainer.classList.add("hide");
};


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        const playerName1 = player1.value ;
        const playerName2 = player2.value ;

        if(turnO && !playerName1 && !playerName2){
            alert("Please Enter Player Name..");
            return;
        }

        if (turnO) {
            // playerO
            box.style.fontSize="15px";
            box.innerText = playerName1;
            box.style.backgroundColor = "#5B8C5A";
            box.style.color="#ffffff";
            box.style.fontStyle="oblique";
            turnO = false;
        } else {
            // playerX
            box.style.fontSize="15px";
            box.innerText = playerName2;
           
            box.style.backgroundColor = "#E3655B";
            box.style.color="#ffffff";
            box.style.fontStyle="oblique";
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = "Game was a Draw.";
    msgcontainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor="";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations ${winner} ,You are the Winner..`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winningPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
    return false;
};

newGame.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);
