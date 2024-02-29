import { useEffect, useState } from "react";

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