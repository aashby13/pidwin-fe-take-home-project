export const PuzzlePiece = ({letter, state, current, column}) => (
  <div 
    className='puzzle__piece' 
    data-state={ state } 
    data-current={current}
    data-column={column}
  >
    {
      !!letter && <span>{ letter }</span>
    }
  </div>
);
