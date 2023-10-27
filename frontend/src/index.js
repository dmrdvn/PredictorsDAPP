import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/tailwind.css';
import {RouterProvider} from "react-router-dom";
import routes from './routes';
import {Provider} from 'react-redux';
import store from '../src/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider> 
);


