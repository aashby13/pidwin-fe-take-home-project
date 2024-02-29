import { useEffect, useState } from 'react';
import { useSubject, getDeepClone } from '../lib/functions';
import { board$, currentPiece$, wordCheck$ } from '../lib/state';
import { PuzzlePiece } from './PuzzlePiece';

export const Puzzle = () => {
  const board = useSubject(board$);
  const currentPiece = useSubject(currentPiece$);
  const wordCheck = useSubject(wordCheck$);
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    const all = [];
    let current;
    //
    board.forEach((arr, row) => {
      arr.forEach((obj, column) => {
        current = row === currentPiece.row 
                  && column === currentPiece.column 
                  && currentPiece.value.length === column 
                  && !!board[row][column].letter;
        //          
        all.push(
        <PuzzlePiece 
          key={`box${row}${column}`} 
          letter={obj.letter} 
          state={obj.state} 
          current={current}
        />)
      });
    });
    setPieces(all);
  }, [board, currentPiece])


  // set state of board objects
  useEffect(() => {
    console.log(wordCheck);
    if (wordCheck && wordCheck.success) {
      const row = board[currentPiece.row - 1].map((obj, column) => {
        return { ...obj, state: wordCheck.result.charAt(column) }
      })
      const arr = getDeepClone(board);
      arr[currentPiece.row - 1] = row;
      wordCheck$.next(undefined);
      board$.next(arr);
    }
  }, [wordCheck, board, currentPiece])

  return (
    <div className='puzzle__container'>
      <div className='puzzle__grid'>
        { pieces }
      </div>
    </div>
  );
}