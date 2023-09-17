import React, {Component} from 'react';
import {HashRouter, Route, Routes} from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';
import './App.css';

class App extends Component {
  render() {
    return (
        <HashRouter>
          <div className="App">
            <Routes>
                <Route exact path='/' element={< Dashboard />}></Route>
                <Route exact path='/login' element={< Login />}></Route>
                <Route exact path='/signup' element={< Signup />}></Route>
            </Routes>
          </div>
        </HashRouter>
    );
  }
}

export default App;

