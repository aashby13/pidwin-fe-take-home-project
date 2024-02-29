import { useEffect, useState } from "react"
import { currentPiece$, wordCheck$ } from "../lib/state";
import { rowLength, successfulResult } from "../lib/contants";
import { resetState, useSubject } from "../lib/functions";

export const Modal = () => {
  const currentPiece = useSubject(currentPiece$);
  const wordCheck = useSubject(wordCheck$);
  const [success, setSuccess] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const onClick = () => {
    setGameOver(false);
    resetState();
    setTimeout(() => {
      setSuccess(false);
    }, 1000);
  }

  useEffect(() => {
    if (wordCheck && wordCheck.result === successfulResult) {
      setSuccess(true);
      setTimeout(() => {
        setGameOver(true);
      }, 1000);
    } else if (wordCheck && currentPiece.row === rowLength) {
      setSuccess(false);
      setTimeout(() => {
        setGameOver(true);
      }, 1000);
    }
  }, [wordCheck, currentPiece]);

  return (
    <div className='modal__container' data-show={gameOver}>
      <div className='modal__main'>

        <div className='modal__content'>
          <h2>Game Over</h2>

          <p data-success={success}></p>

          <button className='main-button' onClick={onClick}>
            <span>Play Again</span>
          </button>
        </div>
      </div>
    </div>
  )
}