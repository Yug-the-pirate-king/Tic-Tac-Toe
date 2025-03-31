// Winning combinations
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]  // Diagonals
];

let turnO = true; // Player O starts
const boxes = document.querySelectorAll(".box");
const resetBtn = document.getElementById("reset");
const playAgainBtn = document.getElementById("playAgain");
const popup = document.getElementById("resultPopup");
const resultText = document.getElementById("resultText");

// Ensure popup is hidden on page load
popup.style.display = "none";

// Add click event to all boxes
boxes.forEach((box) => {
    box.addEventListener("click", function () {
        // Prevent overwriting
        if (box.innerText !== "") return;

        // Set text and color
        box.innerText = turnO ? "O" : "X";
        box.classList.add(turnO ? "o" : "x");

        // Check for win
        if (checkWin(turnO ? "O" : "X")) {
            showWinner(turnO ? "O" : "X");
            return;
        }

        // Toggle turn
        turnO = !turnO;
    });
});

// Function to check if a player won
function checkWin(player) {
    return winPatterns.some(pattern => {
        return pattern.every(index => boxes[index].innerText === player);
    });
}

// Function to display winner and disable board
function showWinner(winner) {
    resultText.innerHTML = winner + " Wins! 🎉";
    popup.style.display = "flex"; // Show popup

    // Disable all buttons to prevent further moves
    boxes.forEach((box) => {
        box.disabled = true;
    });
}

// Function to reset the game
function resetGame() {
    popup.style.display = "none"; // Hide popup

    // Clear the board & re-enable buttons
    boxes.forEach((box) => {
        box.innerText = "";
        box.classList.remove("o", "x");
        box.disabled = false;
    });

    turnO = true; // Reset turn
}

// Event listeners for Reset & Play Again buttons
resetBtn.addEventListener("click", resetGame);
playAgainBtn.addEventListener("click", resetGame);
