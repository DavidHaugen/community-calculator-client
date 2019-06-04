import React, { Component } from 'react';

const Context = React.createContext({
  user: {},
  error: null,
  log: null,

  setError: () => {},
  clearError: () => {},
  setLog: () => {}
});

export default Context;

export class ContextProvider extends Component {
  constructor(props) {
    super(props);
    const state = { user: {}, error: null, log: []};

    this.state = state;
  }

  setError = error => {
    console.error(error);
    this.setState({ error });
  }

  clearError = () => {
    this.setState({ error: null });
  }

  setLog = item => {
    if(this.state.log.length === 10){
      this.state.log.pop();
    }
    this.setState({log: [item, ...this.state.log]});
  }

  render() {
    const value = {
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      log: this.state.log,
      setLog: this.setLog
    };
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
