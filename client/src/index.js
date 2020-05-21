import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

console.log = (msg) => {};
console.error = (msg) => {};
console.info = (msg) => {};

ReactDOM.render(<App />, document.getElementById('root'));