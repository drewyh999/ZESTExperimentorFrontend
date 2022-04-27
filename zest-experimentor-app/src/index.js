import {React, StrictMode} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App.js';
import {BrowserRouter, Route,Routes} from "react-router-dom";


ReactDOM.render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<App/>}/>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
  document.getElementById('root')
);

