import './App.css';
import { Route, Routes, useLocation } from "react-router-dom";
import Landing from './views/Landing/Landing';
import Home from './components/Home/Home';
import NewPokemon from './components/NewPokemon/NewPokemon';
import CardDetail from './components/CardDetail/CardDetail';
import Nav from './components/Nav/Nav';

function App() {
  let location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" ? (
        <>
          <Nav />
        </>
      ) : (
        <></>
      )}
      
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="Detail/:id" element={<CardDetail />} />
        <Route path="NewPokemon" element={<NewPokemon />} />
      </Routes>
    </div>
    
  );
}

export default App;
