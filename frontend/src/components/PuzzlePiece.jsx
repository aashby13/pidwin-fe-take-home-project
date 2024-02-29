export const PuzzlePiece = ({letter, state, active}) => {

  return (
    <div className='puzzle__piece' data-state={ state || 'none' } data-active={active}>
      {
        !!letter && <span>{ letter }</span>
      }
    </div>
  );
}