import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserByUserName } from '../../services/user.service';
import { addTransfer, setUserBalance } from '../../services/monetary.service';
import { useLocation } from 'react-router';
import { updateUserAccountBalance } from '../../redux/stateSlices/user.slice';

export default function NewTransfer() {
    const errorMessage = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const currentUser = useSelector((state) => state.user.loggedInUser);
    const [destinationUsername, setDestinationUsername] = useState('');
    const [destinationAccountCode, setDestinationAccountCode] = useState('');
    const [amount, _setAmount] = useState(0);
    const [selectedAccount, setSelectedAccount] = useState(-1);
    const errorMessageRef = useRef(null);
    const dispatch = useDispatch();
    const location = useLocation();

    function setErrorMessage(value) {
        errorMessageRef.current.innerHTML = value;
    }

    useEffect(() =>
    {
        const queryParams = new URLSearchParams(location.search);
        if(queryParams.get('fromAcc') !== null)
        {
            setSelectedAccount(queryParams.get('fromAcc'));
        }
    }, [currentUser]);

    function createTransfer() {
        if(verifyTransferRequest())
        {
            var destinationUser = getUserByUserName(destinationUsername);
            var sourceBalanceBeforeTransaction = currentUser.accounts.find(a => a.id == selectedAccount).balance;
            var sourceBalanceAfterTransaction = currentUser.accounts.find(a => a.id == selectedAccount).balance - amount;
            var destinationBalanceBeforeTransaction = destinationUser.accounts.find(a => a.accountCode == destinationAccountCode).balance;
            var destinationBalanceAfterTransaction = Number.parseInt(destinationUser.accounts.find(a => a.accountCode == destinationAccountCode).balance) + amount;

            addTransfer(
                currentUser.userName,
                currentUser.accounts.find(a => a.id == selectedAccount).accountCode,
                sourceBalanceBeforeTransaction,
                sourceBalanceAfterTransaction,
                destinationUsername,
                destinationAccountCode,
                destinationBalanceBeforeTransaction,
                destinationBalanceAfterTransaction,
                amount
            );
            setUserBalance(currentUser.userName, currentUser.accounts.find(a => a.id == selectedAccount).accountCode, sourceBalanceAfterTransaction);
            setUserBalance(destinationUsername, destinationAccountCode, destinationBalanceAfterTransaction);
            dispatch(updateUserAccountBalance({
                id: selectedAccount,
                balance: sourceBalanceAfterTransaction
            }));
            
            if(destinationUsername === currentUser.userName)
            {
                var currentAccountId = currentUser.accounts.find(a => a.accountCode === destinationAccountCode).id;
                
                dispatch(updateUserAccountBalance({
                    id: currentAccountId,
                    balance: destinationBalanceAfterTransaction
                }));
            }

            setDestinationUsername('');
            setDestinationAccountCode('');
            _setAmount(0);
            setAlertMessage('İşlem başarıyla tamamlandı.');

            setInterval(() => {
                setAlertMessage('');
            }, 1500);

            console.log("currentUser", currentUser);
            console.log("destinationUser", destinationUser);
        }
    }

    function verifyTransferRequest()
    {
        var errorList = [];
        var destinationUser = getUserByUserName(destinationUsername);

        if(destinationUser === undefined)
        {
            errorList.push('Hedef kullanıcı bulunamadı.');
        }
        else
        {
            var userAccounts = destinationUser.accounts;

            var targetAccount = userAccounts.find(a => a.accountCode === destinationAccountCode);
            console.log("targetAccount", targetAccount);
            if(targetAccount === undefined)
            {
                errorList.push('Hedef kullanıcıda belirtilen banka hesap koduna uygun hesap bulunamadı.');
            }
        }

        if(errorList.length > 0)
        {
            setErrorMessage(errorList.join('<br/>'))
        }

        return errorList.length === 0;
    }

    function setAmount(value) {
        console.log("accounts", typeof currentUser.accounts.find(a => a.id == selectedAccount).balance);
        if(new Number(value) > new Number(currentUser.accounts.find(a => a.id == selectedAccount).balance))
        {
            setErrorMessage("Girilen tutar güncel bakiyeden büyük olamaz.");
        }
        else
        {
            if(value.startsWith('0'))
            {
                setErrorMessage('Geçerli bir değer giriniz.');
            }
            else
            {
                setErrorMessage('');
                _setAmount(Number.parseInt(value));
            }
        }
    }
    return (
        <div className="container-fluid">
            <div className='block m-5'>
                <span style={{fontSize: 22}}>Güncel Bakiyeniz:&nbsp;&nbsp;
                    <strong>
                        {
                            (selectedAccount >= 0 && currentUser && currentUser.accounts)
                                ? (currentUser.accounts.find(a => a.id == selectedAccount).balance)
                                : 0
                        }₺
                    </strong>
                </span>
            </div>
            <div className='m-5 block'>
                {
                    errorMessage &&
                    <span className='col-12 text-white pl-0 pb-3 m-0 text-left'
                        ref={errorMessageRef}></span>
                }
                {
                    alertMessage &&
                    <div className="alert alert-primary" role="alert">
                        {alertMessage}
                    </div>
                }
                <div className="form-group-material">
                    <label className="col-sm-3 form-control-label">Select</label>
                    <select 
                        name="account" 
                        className="form-control mb-3 mb-3"
                        value={selectedAccount}
                        onChange={(e) => setSelectedAccount(e.target.value)}
                    >
                        <option value="-1">Hesap Seçiniz</option>   

                        {
                            currentUser && currentUser.accounts
                            ? 
                                currentUser.accounts.map(account =>
                                    <option key={account.id} value={account.id}>{account.name}</option>   
                                )
                            : 0
                        }
                    </select>
                </div>
                <div className="form-group-material">
                    <input
                        id="newTransfer-name"
                        type="text"
                        name="newTransferName"
                        required
                        data-msg="Lütfen kullanıcı eksiksiz bir şekilde giriniz."
                        className="input-material"
                        value={destinationUsername}
                        onChange={(e) => setDestinationUsername(e.target.value)}/>
                    <label htmlFor="newTransfer-name" className="label-material">Hedef Kullanıcı Adı</label>
                </div>
                <div className="form-group-material">
                    <input
                        id="newTransfer-name"
                        type="text"
                        name="newTransferName"
                        required
                        data-msg="Lütfen hesap kodunu eksiksiz bir şekilde giriniz."
                        className="input-material"
                        value={destinationAccountCode}
                        onChange={(e) => setDestinationAccountCode(e.target.value)}/>
                    <label htmlFor="newTransfer-name" className="label-material">Hedef Hesap Kodu</label>
                </div>
                <div className="form-group-material">
                    <input
                        id="newTransfer-amount"
                        type="number"
                        name="newTransferAmount"
                        required
                        data-msg="Tutar giriniz."
                        className="input-material"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}/>
                    <label htmlFor="newTransfer-amount" className="label-material">Tutar</label>
                </div>
                
                <button className='btn btn-block btn-primary fw-bold' onClick={() => createTransfer()}>Havale Yap</button>
            </div>
        </div>
        
    )
}
