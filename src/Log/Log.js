import React, {Component} from 'react';
import './Log.css';
import Context from '../Context';

export default class Log extends Component{
  static contextType = Context

  state = {
    result: [1,2,3]
  }

  generateLog = () => {
    return this.context.log.map((item, key) => {
      return<p key={key}>{item.toString()}</p>;
    });
  }

  render(){
    return (
      <div id='log'>
        {this.context.log.length > 0 ? this.generateLog() : 'Nothing here yet'}
      </div>
    );
  }
}