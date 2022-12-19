import { Route, Routes } from 'react-router-dom';
import Card from './Components/Card';
import ChoosePlayer from './Components/ChoosePlayer';
import GameBoard from './Components/GameBoard';
import Home from './Components/Home';
import Login from './Components/Login';
// import NewGame from './Components/NewGame';
import Register from './Components/Register';
import { StartGame } from './Components/StartGame';
function App() {
  return (
    <Routes>
    <Route path="/" exact element={<Home />} />
    <Route path="/register" exact element={<Register />} />
    <Route path="/login" exact element={<Login />} />
    <Route path="/start-game" exact element={<StartGame />} />
    <Route path="/choose-player" exact element={<ChoosePlayer />} />
    {/* <Route path="/newGame" exact element={<GameBoard />} /> */}
    <Route path="/new-game/:playerName" exact element={<GameBoard />} />
    <Route path="/game-result" exact element={<Card />} />
    {/* <Route    /> */}
    </Routes>
  );
}

export default App;
