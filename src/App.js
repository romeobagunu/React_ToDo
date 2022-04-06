
import Navigation from './components/Navigation';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import AuthProvider from './contexts/AuthContext';
import Login from './components/Login/Login'
import ProtectedRoute from './components/ProtectedRoute';

import Todos from './components/Todos/Todos'
import Categories from './components/Categories/Categories'
import NotFound from './components/NotFound'

import Footer from './components/Footer';


import './App.css'

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Todos /></ProtectedRoute>}/>
        <Route path="/Categories" element={<ProtectedRoute><Categories /></ProtectedRoute>}/>
        <Route path="*" element={<NotFound />}/>
        <Route path="/Login" element={<Login />}/>
      </Routes>
      <Footer />
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
