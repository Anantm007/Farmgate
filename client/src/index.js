import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

console.log = (msg) => {};
console.error = (msg) => { };

ReactDOM.render(<App />, document.getElementById('root'));