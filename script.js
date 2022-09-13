
const doorElements = [document.getElementById("door1"), document.getElementById("door2"), document.getElementById("door3")]

const closedDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg';

const startButton = document.getElementById("start");

let currentlyPlaying = true;

const botDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg";
const beachDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";
const spaceDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";

const doorValues = [botDoorPath, beachDoorPath, spaceDoorPath];

const randomChoreDoorGenerator = () => {
    shuffleArray(doorValues);
};

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
const isClicked = (door) => {
    return door.src !== closedDoorPath
}

function doorOnClick(e) {
    //console.log(e)
    const clickedDoorElement = e.target;
    if (!isClicked(clickedDoorElement)  && currentlyPlaying) {
        const index = doorElements.indexOf(clickedDoorElement);
        clickedDoorElement.src = doorValues[index];
        playDoor(clickedDoorElement);
    }
}
    
for (const doorElement of doorElements){
    doorElement.onclick = doorOnClick;
}


startButton.onclick = () => {
    if (currentlyPlaying === false) {
        startRound();
    }

}
let numClosedDoors = 3;
const startRound = () => {
    for (const doorElement of doorElements){
        doorElement.src = closedDoorPath;
    }
    numClosedDoors = 3;
    startButton.innerHTML = 'Good luck! hehe';
    currentlyPlaying = true;

    randomChoreDoorGenerator();
}

const gameOver = (status) => {
    if (status === 'win') {
        startButton.innerHTML = 'You win! Play again?';
    } else {
        startButton.innerHTML = 'Game over! Play again?';
    }
    currentlyPlaying = false;
}

//This isBot function deterimines if the door's src contains the game-ending ChoreBot image.
const isBot = (door) => {
    return door.src === botDoorPath;
}

const playDoor = (door) => {
    numClosedDoors--;
    if (numClosedDoors === 0) {
        gameOver('win');
    } else if (isBot(door)) {
        gameOver();
    } else {

    }
}

startRound();
