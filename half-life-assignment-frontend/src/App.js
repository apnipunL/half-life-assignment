import React, {Component} from 'react';
import {HashRouter, Route, Routes} from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';
import './App.css';
import GuardedRoute from "./components/guarded-route";

class App extends Component {
  render() {
    return (
        <div className="App">
            <HashRouter>
                <Routes>
                    <Route exact path='/' element={<GuardedRoute isPrivate={true} />}>
                        <Route exact path='/' element={<Dashboard />}/>
                    </Route>
                    <Route exact path='/login' element={<GuardedRoute isPrivate={false} />}>
                        <Route exact path='/login' element={<Login />}/>
                    </Route>
                    <Route exact path='/signup' element={<GuardedRoute isPrivate={false} />}>
                        <Route exact path='/signup' element={<Signup />}/>
                    </Route>
                </Routes>
            </HashRouter>
        </div>
    );
  }
}

export default App;

