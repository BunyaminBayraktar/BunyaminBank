import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Login from './pages/login/login';
import Transfers from './pages/transfers/Transfers';
import Index from './pages/index/Index.jsx';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { Register } from './pages/register/register';
import CreateUser from './pages/admin/create-user/CreateUser';
import NewTransfer from './pages/transfers/NewTransfer';
import Accounts from './pages/accounts/Accounts';
import CreateAccount from './pages/accounts/CreateAccount';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<App/>}>
            <Route path='/' element={<Index/>}></Route>
            <Route path='accounts' element={<Accounts/>}></Route>
            <Route path='accounts/create-account' element={<CreateAccount/>}></Route>
            <Route path='transfers' element={<Transfers/>}></Route>
            <Route path='transfers/new-transfer' element={<NewTransfer/>}></Route>
            <Route path='admin/create-user' element={<CreateUser/>}></Route>
          </Route>
          <Route path='login' element={<Login/>} ></Route>
          <Route path='register' element={<Register/>} ></Route>
        </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
