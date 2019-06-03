import React, {Component} from 'react';
import './Log.css';

export default class Log extends Component{
  state = {
    result: [1,2,3]
  }

  generateLog = () => {
    return this.state.result.map((result, key) => {
      return<p key={key}>{result.toString()}</p>;
    });
  }

  render(){
    return (
      <div id='log'>
        <div>{this.generateLog()}</div>
      </div>
    );
  }
}