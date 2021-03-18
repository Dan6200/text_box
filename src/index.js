import React from 'react';
import ReactDOM from 'react-dom';
import './UI/index.css';
import App from './Base/App';
import reportWebVitals from './Tests_and_Benchmarks/reportWebVitals';

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
