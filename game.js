document.addEventListener("DOMContentLoaded", () => {
    const boardSize = 4; // Size of the game board
    let board = []; // 2D array representing the game board
    let score = 0; // Player's score
  
    // Create the game board
    function createBoard() {
      const boardElement = document.getElementById("board");
  
      // Clear previous board
      boardElement.innerHTML = "";
  
      // Initialize the board array
      board = [];
      for (let i = 0; i < boardSize; i++) {
        board[i] = Array(boardSize).fill(0);
      }
  
      // Add tiles to the board
      for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
          const tile = document.createElement("div");
          tile.id = `tile-${i}-${j}`;
          tile.className = "tile";
          boardElement.appendChild(tile);
        }
      }
    //   for (let i = 0; i < boardSize; i++) {
    //     for (let j = 0; j < boardSize; j++) {
    //       const tile = document.createElement("div");
    //       tile.className = "tile";
    //       tile.id = `tile-${i}-${j}`;
    //       boardElement.appendChild(tile);
    //     }
    //   }
  
      // Reset the score
      score = 0;
      updateScore();
      
      // Generate two initial tiles
      generateTile();
      generateTile();

      // update the game board UI
      updateBoard();
    }

    // Restarts the game
    function restartGame() {
        const boardElement = document.getElementById("board");
        boardElement.innerHTML = ""; // Clear the board element
        createBoard(); // Recreate the game board
        removeGameOverMessage(); // Remove the game over message if it was displayed
    }

    // Attach event listener to restart button
    const restartButton = document.getElementById("newGame");
    restartButton.addEventListener("click", restartGame);
  
    // Generate a new tile at a random empty position
    function generateTile() {
      const emptyPositions = [];
      for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
          if (board[i][j] === 0) {
            emptyPositions.push({ row: i, col: j });
          }
        }
      }
  
      if (emptyPositions.length === 0) {
        // No empty positions available, game over
        return;
      }
  
      // Select a random empty position
      const randomPosition = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
      const newValue = Math.random() < 0.9 ? 2 : 4; // 90% chance of 2, 10% chance of 4
  
      // Place the new tile on the board
      board[randomPosition.row][randomPosition.col] = newValue;
      updateBoard();
    }
  
    // Update the game board UI
    function updateBoard() {
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                const tile = document.getElementById(`tile-${i}-${j}`);
                tile.textContent = board[i][j] !== 0 ? board[i][j] : "";
                tile.className = `tile tile-${board[i][j]}`;
            }
        }
    }
    // function updateBoard() {
    //   for (let i = 0; i < boardSize; i++) {
    //     for (let j = 0; j < boardSize; j++) {
    //       const tile = document.getElementById(`tile-${i}-${j}`);
    //       tile.textContent = board[i][j] !== 0 ? board[i][j] : "";
    //       tile.className = `tile tile-${board[i][j]}`;
  
    //       // Add animation classes for tile movements
    //       if (tile.classList.contains("move-up")) {
    //         tile.classList.remove("move-up");
    //         void tile.offsetWidth; // Trigger reflow to restart animation
    //         tile.classList.add("move-up");
    //       } else if (tile.classList.contains("move-down")) {
    //         tile.classList.remove("move-down");
    //         void tile.offsetWidth;
    //         tile.classList.add("move-down");
    //       } else if (tile.classList.contains("move-left")) {
    //         tile.classList.remove("move-left");
    //         void tile.offsetWidth;
    //         tile.classList.add("move-left");
    //       } else if (tile.classList.contains("move-right")) {
    //         tile.classList.remove("move-right");
    //         void tile.offsetWidth;
    //         tile.classList.add("move-right");
    //       }
    //     }
    //   }
    // }
  
    // Update the score UI
    function updateScore() {
        const scoreElement = document.getElementById("score");
        scoreElement.textContent = score;
    }

    // Event listener for arrow key press
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowUp") {
        moveTiles("up");
        } else if (event.key === "ArrowDown") {
        moveTiles("down");
        } else if (event.key === "ArrowLeft") {
        moveTiles("left");
        } else if (event.key === "ArrowRight") {
        moveTiles("right");
        }
    });

    // Move tiles in the specified direction
    function moveTiles(direction) {
        // Store the previous state of the board for comparison
        const previousBoard = JSON.parse(JSON.stringify(board));
      
        // Implement tile movement logic here
        if (direction === "up") {
          for (let j = 0; j < boardSize; j++) {
            for (let i = 1; i < boardSize; i++) {
              if (board[i][j] !== 0) {
                let k = i;
                while (k > 0 && board[k - 1][j] === 0) {
                  board[k - 1][j] = board[k][j];
                  board[k][j] = 0;
                  k--;
                }
                if (k > 0 && board[k - 1][j] === board[k][j]) {
                  // Merge tiles
                  board[k - 1][j] *= 2;
                  score += board[k - 1][j];
                  board[k][j] = 0;
                }
              }
            }
          }
        } else if (direction === "down") {
          for (let j = 0; j < boardSize; j++) {
            for (let i = boardSize - 2; i >= 0; i--) {
              if (board[i][j] !== 0) {
                let k = i;
                while (k < boardSize - 1 && board[k + 1][j] === 0) {
                  board[k + 1][j] = board[k][j];
                  board[k][j] = 0;
                  k++;
                }
                if (k < boardSize - 1 && board[k + 1][j] === board[k][j]) {
                  // Merge tiles
                  board[k + 1][j] *= 2;
                  score += board[k + 1][j];
                  board[k][j] = 0;
                }
              }
            }
          }
        } else if (direction === "left") {
          for (let i = 0; i < boardSize; i++) {
            for (let j = 1; j < boardSize; j++) {
              if (board[i][j] !== 0) {
                let k = j;
                while (k > 0 && board[i][k - 1] === 0) {
                  board[i][k - 1] = board[i][k];
                  board[i][k] = 0;
                  k--;
                }
                if (k > 0 && board[i][k - 1] === board[i][k]) {
                  // Merge tiles
                  board[i][k - 1] *= 2;
                  score += board[i][k - 1];
                  board[i][k] = 0;
                }
              }
            }
          }
        } else if (direction === "right") {
            for (let i = 0; i < boardSize; i++) {
                for (let j = boardSize - 2; j >= 0; j--) {
                    if (board[i][j] !== 0) {
                        let k = j;
                        while (k < boardSize - 1 && board[i][k + 1] === 0) {
                        board[i][k + 1] = board[i][k];
                        board[i][k] = 0;
                        k++;
                        }
                        if (k < boardSize - 1 && board[i][k + 1] === board[i][k]) {
                            // Merge tiles
                            board[i][k + 1] *= 2;
                            score += board[i][k + 1];
                            board[i][k] = 0;
                        }
                    }
                }
            }
        }
        updateScore();
        if(!checkGameOver()) {
            generateTile();
        }
    }
    // function moveTiles(direction) {
    //     // Store the previous state of the board for comparison
    //     const previousBoard = JSON.parse(JSON.stringify(board));
      
    //     // Implement tile movement logic here
    //     if (direction === "up") {
    //       for (let j = 0; j < boardSize; j++) {
    //         let mergeIndex = 0;
    //         for (let i = 1; i < boardSize; i++) {
    //           if (board[i][j] !== 0) {
    //             if (board[i][j] === board[mergeIndex][j]) {
    //               // Merge tiles
    //               board[mergeIndex][j] *= 2;
    //               score += board[mergeIndex][j];
    //               board[i][j] = 0;
    //               mergeIndex++;
    //             } else {
    //               // Move tile
    //               if (mergeIndex + 1 !== i) {
    //                 board[mergeIndex + 1][j] = board[i][j];
    //                 board[i][j] = 0;
    //               }
    //               mergeIndex++;
    //             }
    //           }
    //         }
    //       }
    //     } else if (direction === "down") {
    //       for (let j = 0; j < boardSize; j++) {
    //         let mergeIndex = boardSize - 1;
    //         for (let i = boardSize - 2; i >= 0; i--) {
    //           if (board[i][j] !== 0) {
    //             if (board[i][j] === board[mergeIndex][j]) {
    //               // Merge tiles
    //               board[mergeIndex][j] *= 2;
    //               score += board[mergeIndex][j];
    //               board[i][j] = 0;
    //               mergeIndex--;
    //             } else {
    //               // Move tile
    //               if (mergeIndex - 1 !== i) {
    //                 board[mergeIndex - 1][j] = board[i][j];
    //                 board[i][j] = 0;
    //               }
    //               mergeIndex--;
    //             }
    //           }
    //         }
    //       }
    //     } else if (direction === "left") {
    //         for (let i = 0; i < boardSize; i++) {
    //             let mergeIndex = 0;
    //             for (let j = 1; j < boardSize; j++) {
    //                 if (board[i][j] !== 0) {
    //                     if (board[i][j] === board[i][mergeIndex]) {
    //                         // Merge tiles
    //                         board[i][mergeIndex] *= 2;
    //                         score += board[i][mergeIndex];
    //                         board[i][j] = 0;
    //                         mergeIndex++;
    //                     } else {
    //                         // Move tile
    //                         if (mergeIndex + 1 !== j) {
    //                         board[i][mergeIndex + 1] = board[i][j];
    //                         board[i][j] = 0;
    //                         }
    //                         mergeIndex++;
    //                     }
    //                 }
    //             }
    //         }
    //     } else if (direction === "right") {
    //         for (let i = 0; i < boardSize; i++) {
    //             let mergeIndex = 0;
    //             for (let j = 1; j < boardSize; j++) {
    //                 if (board[i][j] !== 0) {
    //                     if (board[i][j] === board[i][mergeIndex]) {
    //                         // Merge tiles
    //                         board[i][mergeIndex] *= 2;
    //                         score += board[i][mergeIndex];
    //                         board[i][j] = 0;
    //                         mergeIndex--;
    //                     } else {
    //                         // Move tile
    //                         if (mergeIndex - 1 !== j) {
    //                         board[i][mergeIndex - 1] = board[i][j];
    //                         board[i][j] = 0;
    //                         }
    //                         mergeIndex--;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     updateScore();

    //     if (!checkGameOver()) {
    //         generateTile();
    //     }
    // }

    // Check if the game is over (no more valid moves)
    function checkGameOver() {
        // Check for valid moves
        for (let i = 0; i < boardSize; i++) {
          for (let j = 0; j < boardSize; j++) {
            if (board[i][j] === 0) {
              return false; // There is an empty cell, game is not over
            }
      
            // Check for adjacent cells with the same value
            if (i < boardSize - 1 && board[i][j] === board[i + 1][j]) {
              return false; // There is a merge possible, game is not over
            }
            if (j < boardSize - 1 && board[i][j] === board[i][j + 1]) {
              return false; // There is a merge possible, game is not over
            }
          }
        }
      
        // No empty cells or merges possible, game is over
        console.log("Game over");

        const boardElement = document.getElementById("board");
        const gameOverMessage = document.createElement("div");
        gameOverMessage.textContent = "Game Over";
        gameOverMessage.className = "game-over";
        boardElement.appendChild(gameOverMessage);
        
        return true;
    }

    // Remove the game over message
    function removeGameOverMessage() {
        const gameOverMessage = document.querySelector(".newGame");
        if (gameOverMessage) {
            gameOverMessage.remove();
        }
    }

    // Call the createBoard function to initialize the game
    createBoard();
});
    
