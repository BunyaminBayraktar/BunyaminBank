import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import AccountComponent from '../../components/Account';

export default function Accounts() {
    const accounts = useSelector((state) => state.user.loggedInUser.accounts);
    const navigate = useNavigate();

    return (
        <div className='row p-0 m-0'>
            <div className="col-12">
                <div className="row p-0 m-0">
                {
                    accounts.map((account) =>
                        <div className='col-3 m-0 p-4'>
                            <AccountComponent
                                id={account.id}
                                accountName={account.name}
                                balance={account.balance}
                                accountCode={account.accountCode}
                            ></AccountComponent>
                        </div>
                    )
                }
                    <div className="col-3 p-0 m-0">
                        <div className="w-100 h-100 row align-items-center justify-content-center">
                            <div className='block'>
                                <a href='javascript:void(0)'
                                    className='text-secondary'
                                    style={{textDecoration: 'none'}}
                                    onClick={() => navigate('/accounts/create-account')}
                                >
                                    <i className='fa fa-plus mr-2'></i>Yeni Hesap
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
