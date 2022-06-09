import React from 'react'
import { useDispatch } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { 
  setLoggedInUser
} from '../../redux/stateSlices/user.slice';
import CreateUserComponent from '../../components/CreateUserComponent';

export function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function registerSuccess(user)
    {
        dispatch(setLoggedInUser({
            userName: user.userName,
            emailAddress: user.emailAddress,
            name: user.name,
            surname: user.surname,
            balance: user.balance
        }));
        
        navigate("/login");
    }

    return (
        <div className="login-page">
            <div className='container d-flex align-items-center'>
                <div className='form-holder has-shadow'>
                    <div className="row">
                        <div class="col-lg-6">
                            <div class="info d-flex align-items-center">
                                <div class="content">
                                    <div class="logo">
                                        <h1>Bünyamin BANK</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 bg-white">
                            <div class="form d-flex align-items-center">
                                <div class="content">
                                    <div className="col-12 text-white ff-arial text-center">
                                        <h3>Kaydol</h3>
                                    </div>
                                    <CreateUserComponent
                                        successHandler={(e) => registerSuccess(e)}></CreateUserComponent>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}