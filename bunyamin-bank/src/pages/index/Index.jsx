import React, {Component} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';

export default function Index() {
    const currentUser = useSelector((state) => state.user.loggedInUser);
    const navigate = useNavigate();

    function getBalance() {
        if(currentUser && currentUser.accounts){
            if(currentUser.accounts.length === 1)
            {
                return currentUser.accounts[0].balance;
            }
            else
            {
                var response = currentUser.accounts.reduce((prev, curr) => prev.balance + curr.balance);
                console.log("response", response);
                return currentUser.accounts.reduce((prev, curr) => prev.balance + curr.balance);
            }
        }
        else{
            navigate('/login');
        }
        
    }
    return (
        <div className='indexContainer p-0 m-0'>
            <div className="container-fluid">
                <div className='row p-3'>
                    <div className="col-3 col-lg-4 stats-with-chart-2 block rounded">
                        <div className="title p-0 mb-3">
                            <strong className="d-block">Bakiyeniz</strong>
                        </div>
                        <hr className='border-primary'/>
                        <strong
                            style={{
                            fontSize: 28
                        }}
                            className="d-block">{getBalance()}₺</strong>
                        <div className='mt-3'>
                            <button className='btn btn-icon btn-block btn-secondary'
                                onClick={() => navigate('/transfers/new-transfer')}>
                                <i className='fa fa-plus mr-2'></i>Havale Yap
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
