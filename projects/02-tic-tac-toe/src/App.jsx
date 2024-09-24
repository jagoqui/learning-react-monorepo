import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { WinnerModal } from './components/WinnerModal.jsx'
import {TURNS} from "./constants/constants"
import { checkWinnerFrom } from "./logic/board";
import { saveGameToStorage, resetGameStorage } from './logic/storage/index.js'


function App(){
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  const [winner, setWinner] = useState(null);

  const checkEndGame = (boardToCheck) => boardToCheck.every((square) => square !== null);

  const updateBoard = (index) => {
    if(board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })
    //Check if has winner
    const newWinner = checkWinnerFrom(newBoard);
    if(newWinner){
      confetti();
      setWinner(newWinner);
    }else if(checkEndGame(newBoard)){
      setWinner(false);
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    resetGameStorage()
  }
  
  return(
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Empezar de nuevo</button> 
      <section className="game">
        {
          board.map((square, index) => 
            <Square key={index} updateBoard={updateBoard} index={index}>
              {square}
            </Square>
          )
        }
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App