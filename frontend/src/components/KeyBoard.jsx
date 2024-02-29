import { useCallback, useEffect } from "react";
import { keys } from "../lib/contants";
import { KeyButton } from "./KeyButton";

export const KeyBoard = () => {

  const onKeyBtnClick = useCallback((key) => {
    console.log(key);
  }, [])

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
              arr.map((t) => <KeyButton key={t} text={t} onClick={onKeyBtnClick}/>)
            }
          </div>
        ))
      }
    </div>
  );
}