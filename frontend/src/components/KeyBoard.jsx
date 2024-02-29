import { useCallback, useEffect, useState } from "react";
import { columnLength, keys, rowLength } from "../lib/contants";
import { KeyButton } from "./KeyButton";
import { board$, currentPiece$ } from "../lib/state";
import { getDeepClone, useSubject } from "../lib/functions";

export const KeyBoard = () => {
  const currentPiece = useSubject(currentPiece$);
  const board = useSubject(board$);
  const [activeKey, setActiveKey] = useState(null);

  const onKeyBtnClick = useCallback((key) => {
    console.log(key);
    switch (key) {
      case 'enter':
        const letter = board[currentPiece.row][currentPiece.column].letter;
        const piece = {...currentPiece, value: currentPiece.value + letter};
        if (piece.column === columnLength - 1) {
          piece.column = 0;
          piece.row += 1;
        } else {
          piece.column += 1;
        }
        currentPiece$.next(piece);
        setActiveKey(null);
        break;

      case 'backspace':
        
        break;
    
      default:
        const obj = { ...board[currentPiece.row][currentPiece.column], letter: key };
        const arr = getDeepClone(board);
        arr[currentPiece.row][currentPiece.column] = obj;
        setActiveKey(key);
        board$.next(arr);
        break;
    }
  }, [board, currentPiece])

  useEffect(() => {
    console.log(currentPiece)
  }, [currentPiece])

  useEffect(() => {
    const keysFlat = keys.flat();
    //
    const onKeyDown = (e) => {
      e.preventDefault();
    }
    //
    const onKeyUp = (e) => {
      let key = e.key.toLowerCase();
      if (keysFlat.includes(key)) {
        onKeyBtnClick(key);
      }
    }
    //
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    return () => {
      document.removeEventListener('keyup', onKeyUp);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [])

  return (
    <div className='keyboard__container'>
      {
        keys.map((arr, i) => (
          <div key={`row${i}`} className='keyboard__row'>
            {
              arr.map((t) => (
                <KeyButton 
                  key={t} 
                  text={t} 
                  active={t === activeKey} 
                  onClick={onKeyBtnClick}
                />
              ))
            }
          </div>
        ))
      }
    </div>
  );
}