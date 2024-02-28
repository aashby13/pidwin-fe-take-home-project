import { useCallback, useEffect } from "react";
import { Puzzle } from "./components/Puzzle";


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
      </main>
    </>
  );
}

export default App;
