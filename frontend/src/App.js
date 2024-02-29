import { useEffect, useState } from "react";
import { Puzzle } from "./components/Puzzle";
import { KeyBoard } from "./components/KeyBoard";
import { board$, currentPiece$, wordCheck$ } from "./lib/state";
import { useSubject } from './lib/functions';
import { columnLength } from "./lib/contants";

function App() {
  const currentPiece = useSubject(currentPiece$);
  const board = useSubject(board$);
  const [disabled, setDisabled] = useState(true);

  const checkWord = async () => {
    const guess = board[currentPiece.row].map(obj => obj.letter).join('');
    const resp = await fetch(`http://localhost:9000/api/word?guess=${guess}`);
    const json = await resp.json();
    wordCheck$.next(json);
  }

  useEffect(() => {
    setDisabled(!(currentPiece.value.length === columnLength - 1))
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

        <KeyBoard />
      </main>
    </>
  );
}

export default App;
