import { useCallback, useEffect } from "react";
import { keys, keysFlat } from "../lib/contants";
import { KeyButton } from "./KeyButton";

export const KeyBoard = ({ activeKey, onKeyboard }) => {

  const onKeyBtnClick = useCallback((key) => {
    onKeyboard(key);
  }, [onKeyboard])

  const onKeyUp = useCallback((e) => {
    let key = e.key.toLowerCase();
    if (keysFlat.includes(key)) {
      onKeyBtnClick(key);
    }
  }, [onKeyBtnClick])

  useEffect(() => {
    const onKeyDown = (e) => {
      e.preventDefault();
    }
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    return () => {
      document.removeEventListener('keyup', onKeyUp);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyUp])

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