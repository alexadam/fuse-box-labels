import * as React from 'react';
import ReactDOM from "react-dom/client";
import Main from './views/main';
import './app.scss'


const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(<Main />);