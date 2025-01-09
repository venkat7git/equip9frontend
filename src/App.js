import logo from './logo.svg';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './components/login/'
import Signup from './components/signup/'
import Home from './components/home'
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<Login/>}/>
        <Route path ="/home" element = {<Home/>}/>
        <Route path ="/login" element = {<Login/>}/>
        <Route path="signup" element ={<Signup/>}/>
      </Routes>
    </Router>
  );
}

export default App;
