'use strict';
// Start Active Players in Yahoo Fantasy Hockey League

import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App';
import './main.css';

function initApp() {
  const ref = document.querySelector('a[href*=startactiveplayers]');
  const root = document.createElement('div');
  root.id = "FSE-root";
  ref.insertAdjacentElement('afterend', root);

  ReactDOM.render(
    <App />,
    root
  );
}

initApp();