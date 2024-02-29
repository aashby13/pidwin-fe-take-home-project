export const PuzzlePiece = ({letter, state, current}) => (
  <div className='puzzle__piece' data-state={ state } data-current={current}>
    {
      !!letter && <span>{ letter }</span>
    }
  </div>
);
