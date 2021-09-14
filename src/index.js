import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import configureStore from './store/configureStore';
import { asyncGetAllCustomers } from './actions/customersAction';
//import { useEffect } from 'react';

const store = configureStore()
console.log('store=', store)
console.log('state= ', store.getState())
store.subscribe(()=>{
  console.log('updated state=', store.getState())
})
store.dispatch(asyncGetAllCustomers())

ReactDOM.render(
  <BrowserRouter >
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

