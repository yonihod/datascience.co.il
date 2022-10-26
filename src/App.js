import './App.scss';
import Board from './components/Board.component'

function App() {
  return (
    <div>
      <div className='flex gap-3 justify-center mt-4'>
        <img className={"w-20 h-20 rounded-full"} src="/yoni.png" alt="logo" />
        <h1 className='text-4xl'>
          Sliding Puzzle by <br/>Yoni Hodeffi inspired by the awesome Or Gellert
        </h1>
      </div>
      <Board/>
    </div>
  );
}

export default App;
