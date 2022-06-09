import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createAccount } from '../../services/user.service';
import { addUserAccount } from  '../../redux/stateSlices/user.slice';
import { useNavigate } from 'react-router';

export default function CreateAccount() {
  const currentUser = useSelector((state) => state.user.loggedInUser);
  const [errorMessage, setErrorMessage] = useState('');
  const [accountName, setAccountName] = useState('');
  const [balance, setBalance] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect( ()=> {
    if(!(currentUser && currentUser.roles && currentUser.roles.indexOf('admin')!=-1)){
        navigate('/accounts');
    }
  }, []);

  function _setBalance(value)
  {
    if(!/^0|[a-zA-Z]/.test(value))
    {
      setBalance(value);
    }
  }

  function _createAccount() {
    console.log("currentUSer", currentUser);
    let createAccountResponse = createAccount(
      currentUser.userName,
      accountName,
      balance
    );

    if(createAccountResponse.Status)
    {
      setAccountName('');
      setBalance(0);
      setErrorMessage('');
      dispatch(addUserAccount(createAccountResponse.Value));
      navigate("/accounts");
    }
    else
    {
      setErrorMessage(createAccountResponse.ErrorList.join(','));
    }
  }

  return (
    <div className='w-100 d-flex flex-column align-items-center'>
          <ul class="breadcrumb align-self-start m-5">
              <li class="breadcrumb-item active">Hesap Oluştur</li>
          </ul>
          <div className='w-50 block rounded'>
            {
              errorMessage &&
              <span className='col-12 text-white pl-0 pb-3 m-0 text-left'>{ errorMessage }</span>
            }
            <div class="form-group-material">
                <input
                    id="createAccount-accountName"
                    type="text"
                    name="createAccountAccountName"
                    required
                    data-msg="Lütfen hesap adını giriniz."
                    class="input-material"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}/>
                <label for="createAccount-accountName" class="label-material">Hesap adı</label>
            </div>
            {
                currentUser.roles.indexOf('admin') !== -1 &&
                <div class="form-group-material">
                    <input
                        id="createUser-balance"
                        type="text"
                        name="createUserBalance"
                        required
                        data-msg="Bakiye giriniz."
                        class="input-material"
                        value={balance}
                        onChange={(e) => _setBalance(e.target.value)}/>
                    <label for="createUser-password" class="label-material">Bakiye</label>
                </div>
            }
            <button className='btn btn-block btn-primary fw-bold' 
              onClick={() => _createAccount()}
            >Hesap Oluştur</button>
          </div>
      </div>
  )
}
