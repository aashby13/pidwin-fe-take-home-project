import { useEffect, useState } from "react";
import { board$, currentPiece$, wordCheck$ } from "./state";
import { columnLength, rowLength } from "./contants";

export function useSubject(subject$) {
  const initVal = subject$.value;
  const [value, setValue] = useState(initVal);
  useEffect(() => {
    const sub = subject$.subscribe(setValue);
    return () => sub.unsubscribe();
  }, [subject$])
  return value;
}

export const getDeepClone = (object) => {
  return JSON.parse(JSON.stringify(object))
}

export const resetState = () => {
  wordCheck$.next(undefined);
  board$.next(
    Array(rowLength).fill(
      Array(columnLength).fill({ letter: null, state: null })
    )
  );
  currentPiece$.next({ row: 0, column: 0, value: '' });
}