
import Navigation from './components/Navigation';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Login from './components/Login/Login'
import Todos from './components/Todos/Todos'
import Categories from './components/Categories/Categories'
import NotFound from './components/NotFound'

import './App.css'

function App() {
  return (
    <div className="App">
      <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Todos />}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="/Categories" element={<Categories />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
