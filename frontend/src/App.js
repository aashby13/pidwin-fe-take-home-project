import { useCallback, useEffect } from "react";
import { Puzzle } from "./components/Puzzle";
import { KeyBoard } from "./components/KeyBoard";

function App() {
  const checkWord = useCallback(async (guess) => {
    const resp = await fetch(`http://localhost:9000/api/word?guess=${guess}`);
    const json = await resp.json();
    console.log(json);
  }, []);

  useEffect(() => {
    checkWord('geuss');
  }, []);

  return (
    <>
      <header>
        Wordle
      </header>

      <main>
        <Puzzle />

        <button className="main-button" disabled={ true }>
          <span>Guess Word</span>
        </button>

        <KeyBoard />
      </main>
    </>
  );
}

export default App;
