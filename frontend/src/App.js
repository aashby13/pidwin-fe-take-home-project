import { useCallback, useEffect, useState } from "react";
import { Puzzle } from "./components/Puzzle";
import { KeyBoard } from "./components/KeyBoard";
import { board$, currentPiece$, wordCheck$ } from "./lib/state";
import { getDeepClone, useSubject } from './lib/functions';
import { columnLength } from "./lib/contants";
import { Modal } from "./components/Modal";

function App() {
  const board = useSubject(board$);
  const currentPiece = useSubject(currentPiece$);
  const [disabled, setDisabled] = useState(true);
  const [activeKey, setActiveKey] = useState(null);

  const checkWord = async () => {
    const resp = await fetch(`http://localhost:9000/api/word?guess=${currentPiece.value}`);
    const json = await resp.json();
    wordCheck$.next(json);
    currentPiece$.next({...currentPiece, value: ''});
  }

  const onKeyboard = useCallback((key) => {
    /* console.log(key, currentPiece, board[currentPiece.row][currentPiece.column].letter); */
    switch (key) {
      case 'enter':
        let letter;
        const row = board[currentPiece.row]
        if (row) letter = row[currentPiece.column].letter;
        if (letter) {
          const piece = {...currentPiece, value: currentPiece.value + letter};
          if (piece.column === columnLength - 1) {
            piece.column = 0;
            piece.row += 1;
          } else {
            piece.column += 1;
          }
          currentPiece$.next(piece);
          setActiveKey(null);
        }
        break;

      case 'backspace':
        if (currentPiece.value.length) {
          let columnIndex = currentPiece.value.length === columnLength && !currentPiece.column ? columnLength - 1 : currentPiece.column - 1;
          if (activeKey) columnIndex += 1;
          const rowIndex = currentPiece.value.length === columnLength ? currentPiece.row - 1 : currentPiece.row
          const obj = { ...board[rowIndex][columnIndex], letter: null };
          const arr = getDeepClone(board);
          arr[rowIndex][columnIndex] = obj;
          setActiveKey(null);
          currentPiece$.next({
            row: rowIndex, 
            column: columnIndex, 
            value: currentPiece.value.substring(0, columnIndex)
          });
          board$.next(arr);
        }
        break;
    
      default:
        if (currentPiece.value.length !== columnLength) {
          const obj = { ...board[currentPiece.row][currentPiece.column], letter: key };
          const arr = getDeepClone(board);
          arr[currentPiece.row][currentPiece.column] = obj;
          setActiveKey(key);
          board$.next(arr);
        }
        break;
    }
  }, [board, currentPiece, activeKey])

  useEffect(() => {
    setDisabled(!(currentPiece.value.length === columnLength));
  }, [currentPiece]);

  return (
    <>
      <header>
        Wordle
      </header>

      <main>
        <Puzzle />

        <button className="main-button" disabled={ disabled } onClick={checkWord}>
          <span>Guess Word</span>
        </button>

        <KeyBoard activeKey={activeKey} onKeyboard={onKeyboard} />
      </main>

      <Modal />
    </>
  );
}

export default App;
