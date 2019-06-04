import React, {Component} from 'react';
import './Calculator.css';
import * as math from 'mathjs';
import Context from '../Context';
import io from 'socket.io-client';
import config from '../config';
let socket;

export default class Calculator extends Component{
  static contextType = Context

  state = {
    display: '',
    error: '',
    showingResult: true
  }

  componentDidMount(){
    const mountContext = this.context;
    document.getElementById('calculator-container').focus();
    socket = io(config.API);
    socket.on('new_calculation_blast', function(calculation) {
      mountContext.setLog(calculation);
    });
    this.getLogs();
  }

  getLogs = () => {
    return fetch(`${config.API}/api/logs`)
      .then(res => res.json())
      .then(res => {
        for(let i = 1; i <= res.length; i++){
          this.context.setLog(res[res.length-i].result);
        }
      });
  }

  handleOperatorButtonPress = (oper) => {
    this.setState({showingResult: false});
    this.setState({display: `${this.state.display}${oper}`});
  }

  handleNumberButtonPress = (num) => {
    if(num === 0 && this.state.display === 0){
      // do nothing
    } else {
      if(this.state.showingResult === true){
        this.setState({display: num, showingResult: false});
      } else {
        if(this.state.display === 0){
          this.setState({display: `${num}`});
        } else{
          this.setState({display: `${this.state.display}${num}`});
        }
      }
    }
  }

  handleClickEquals = () => {
    if(this.state.display === ''){
      // do nothing
    }else 
    {
      this.setState({showingResult: true});
      try {
        socket.emit('new_calculation', `${this.state.display}=${math.eval(this.state.display)}`);
        this.setState({display: `${math.eval(this.state.display)}`});
      } catch (error) {
        this.setState({error: 'Ouch, that\'s invalid syntax. Please try again'});
      }
    }
  }

  handleClickClear = () => {
    this.setState({display: '', showingResult: true});
  }

  handleKeyPress = (e) => {
    if(
      e.key === '1' ||
      e.key === '2' ||
      e.key === '3' ||
      e.key === '4' ||
      e.key === '5' ||
      e.key === '6' ||
      e.key === '7' ||
      e.key === '8' ||
      e.key === '9' ||
      e.key === '0'
    ){
      this.handleNumberButtonPress(e.key);
    } else if(
      e.key === '/' ||
      e.key === '*' ||
      e.key === '-' ||
      e.key === '+'
    ){
      this.handleOperatorButtonPress(e.key);
    } else if(
      e.key === 'Enter'
    ){
      this.handleClickEquals();
    } else if (
      e.key === 'Backspace' ||
      e.key === 'Delete'
    ){
      this.handleClickClear();
    }
  }

  render(){
    return (
      <div id='calculator-container' onKeyDown={(e) => this.handleKeyPress(e)} tabIndex='0' focus={'true'}>
        <div id='display'>
          <p>{this.state.display}</p>
        </div>
        <div id='error'>
          <p>{this.state.error}</p>
        </div>
        <div className='row'>
          <button onClick={() => this.handleNumberButtonPress(7)}>7</button>
          <button onClick={() => this.handleNumberButtonPress(8)}>8</button>
          <button onClick={() => this.handleNumberButtonPress(9)}>9</button>
          <button onClick={() => this.handleOperatorButtonPress('/')}>/</button>
        </div>
        <div className='row'>
          <button onClick={() => this.handleNumberButtonPress(4)}>4</button>
          <button onClick={() => this.handleNumberButtonPress(5)}>5</button>
          <button onClick={() => this.handleNumberButtonPress(6)}>6</button>
          <button onClick={() => this.handleOperatorButtonPress('*')}>*</button>
        </div>
        <div className='row'>
          <button onClick={() => this.handleNumberButtonPress(1)}>1</button>
          <button onClick={() => this.handleNumberButtonPress(2)}>2</button>
          <button onClick={() => this.handleNumberButtonPress(3)}>3</button>
          <button onClick={() => this.handleOperatorButtonPress('-')}>-</button>
        </div>
        <div className='row'>
          <button onClick={() => this.handleNumberButtonPress(0)}>0</button>
          <button onClick={() => this.handleOperatorButtonPress('.')}>.</button>
          <button onClick={() => this.handleClickEquals()}>=</button>
          <button onClick={() => this.handleOperatorButtonPress('+')}>+</button>
        </div>
        <div>
          <button className='button' id='clear' onClick={this.handleClickClear}>Clear</button>
        </div>
      </div>
    );
  }
}