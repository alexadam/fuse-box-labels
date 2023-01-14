import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Main from './views/main';
import './app.scss'

ReactDOM.render(
    <Main />,
    document.getElementById('app') as HTMLElement
  );