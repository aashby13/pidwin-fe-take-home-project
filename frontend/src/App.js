import { useCallback, useEffect, useState } from "react";
import { Puzzle } from "./components/Puzzle";
import { KeyBoard } from "./components/KeyBoard";
import { board$, currentPiece$, wordCheck$ } from "./lib/state";
import { getDeepClone, useSubject } from './lib/functions';
import { columnLength } from "./lib/contants";

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
    console.log(key, currentPiece, board[currentPiece.row][currentPiece.column].letter);
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
        console.log(arr);
        board$.next(arr);
        break;
    }
  }, [board, currentPiece])

  useEffect(() => {
    setDisabled(!(currentPiece.value.length === columnLength))
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
    </>
  );
}

export default App;
