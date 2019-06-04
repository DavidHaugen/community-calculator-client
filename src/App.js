import React, {Component} from 'react';
import './App.css';
import Header from './Header/Header'
import Calculator from './Calculator/Calculator';
import Log from './Log/Log';
import Context from './Context';
import openSocket from 'socket.io-client';

export default class App extends Component {
  static contextType = Context

  socket = openSocket('http://localhost:8000');

  componentDidMount(){
  }


  render(){
    return (
      <>
        <Header />
        <main className="App">
          <Calculator />
          <Log />
        </main>
      </>
    );
  }
}
