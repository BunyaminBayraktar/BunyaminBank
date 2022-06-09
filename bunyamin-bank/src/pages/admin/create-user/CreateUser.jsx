import React from 'react';
import CreateUserComponent from '../../../components/CreateUserComponent';

export default function CreateUser() {
    return (
        <div className='w-100 d-flex flex-column align-items-center'>
            <ul class="breadcrumb align-self-start m-5">
                <li class="breadcrumb-item active">Kullanıcı Oluştur</li>
            </ul>
            <div className='w-50 block rounded'>
                <CreateUserComponent 
                    shouldShowBalanceInput="true"></CreateUserComponent>
            </div>
        </div>
    )
}
