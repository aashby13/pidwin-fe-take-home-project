export const Puzzle = () => {

  return (
    <div className='puzzle__container'>
      <div className='puzzle__grid'>
        {
          Array(30).fill(0).map((e, i) => (
            <div key={`box${i}`} className='puzzle__piece'></div>
          ))
        }
      </div>
    </div>
  );
}