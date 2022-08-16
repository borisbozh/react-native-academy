import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

interface AppProps {
  name:string
}

class AppCLass extends React.Component<AppProps, {}> {
  render(){ 
  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <h2>Hello {this.props.name}!</h2>
        </header>
      </div>
    );
  }
}

export default AppCLass;
