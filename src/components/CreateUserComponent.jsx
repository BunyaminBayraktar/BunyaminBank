import React, { useEffect, useRef, useState } from 'react';
import { deleteUser, createUser } from '../services/user.service';
import uuid from 'react-uuid';

export default function CreateUserComponent({shouldShowBalanceInput, successHandler}) {
    const errorMessage = useState('');
    const [userName, setUsername] = useState('');
    const [mailAddress, setMailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [balance, setBalance] = useState(0);
    const errorMessageRef = useRef(null);

    useEffect(() => {
        console.log("errorMessageRef", errorMessageRef);
    }, []);

    function setErrorMessage(value) {
        errorMessageRef.current.innerHTML = value;
    }

    function verifyRequest() {
        let errorList = [];
        
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mailAddress))
        {
            errorList.push("Geçersiz Mail adresi.");
        }
        if(name.trim() === '')
        {
            errorList.push("Geçersiz Ad girişi.");
        }
        if(surname.trim() === '')
        {
            errorList.push("Geçersiz Soyad girişi.");
        }
        if(userName.trim() === '')
        {
            errorList.push("Geçersiz Kullanıcı Adı girişi.");
        }
        if(password.trim() === '')
        {
            errorList.push("Geçersiz Şifre girişi.");
        }
        else if(password !== passwordConfirm)
        {
            errorList.push("Girilen şifreler birbiri ile uyuşmuyor.");
        }

        if(errorList.length > 0)
        {
            setErrorMessage(errorList.join("<br/>"));
        }

        return errorList.length === 0;
    }

    function createUserFunc()
    {
        try
        {
            if(verifyRequest())
            {
                var createUserResponse = createUser(
                    userName,
                    mailAddress,
                    name,
                    surname,
                    password,
                    userName === 'admin' ? ['admin'] : ['standart'],
                    [
                        {
                            id: 0,
                            name: "Ana Hesap",
                            balance: balance,
                            accountCode: uuid()
                        }
                    ],
                );
                
                if(createUserResponse.Status)
                {
                    setName('');
                    setSurname('');
                    setUsername('');
                    setMailAddress('');
                    setPassword('');
                    setPasswordConfirm('');
                    setBalance(0);
                    if(successHandler)
                    {
                        successHandler(createUserResponse.Value);
                    }
                }
                else
                {
                    if(createUserResponse.ErrorList)
                    {
                        setErrorMessage(createUserResponse.ErrorList.join(','));
                    }
                    else
                    {
                        setErrorMessage("Kayıt işlemi sırasında beklenmedik bir hata yaşandı, daha sonra tekrar deneyiniz.");
                    }
                }
            }
        }
        catch(err)
        {
            if(err.code === 'duplicateValue')
            {
                setErrorMessage(err.ErrorList.join(','));
            }
            else
            {
                deleteUser(mailAddress);
                setErrorMessage(err.message);
            }
        }
    }

    return (
        <div className='w-100'>
            {
                errorMessage &&
                <span className='col-12 text-white pl-0 pb-3 m-0 text-left' ref={errorMessageRef}></span>
            }
            <div class="form-group-material">
                <input
                    id="createUser-name"
                    type="text"
                    name="createUserName"
                    required
                    data-msg="Lütfen adını eksiksiz bir şekilde giriniz."
                    class="input-material"
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
                <label for="createUser-name" class="label-material">Ad</label>
            </div>
            <div class="form-group-material">
                <input
                    id="createUser-surname"
                    type="text"
                    name="createUserSurname"
                    required
                    data-msg="Lütfen soyadını eksiksiz bir şekilde giriniz."
                    class="input-material"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}/>
                <label for="createUser-surname" class="label-material">Soyad</label>
            </div>
            <div class="form-group-material">
                <input
                    id="createUser-userName"
                    type="text"
                    name="createUserUsername"
                    required
                    data-msg="Lütfen kullanıcı adını eksiksiz bir şekilde giriniz."
                    class="input-material"
                    value={userName}
                    onChange={(e) => setUsername(e.target.value)}/>
                <label for="createUser-userName" class="label-material">Kullanıcı adı</label>
            </div>
            <div class="form-group-material">
                <input
                    id="createUser-mail"
                    type="text"
                    name="createUserMailAddress"
                    required
                    data-msg="Lütfen e-mail adresini eksiksiz bir şekilde giriniz."
                    class="input-material"
                    value={mailAddress}
                    onChange={(e) => setMailAddress(e.target.value)}/>
                <label for="createUser-mail" class="label-material">Mail Adresi</label>
            </div>
            <div class="form-group-material">
                <input
                    id="createUser-password"
                    type="password"
                    name="createUserPassword"
                    required
                    data-msg="Şifreyi eksiksiz olarak giriniz."
                    class="input-material"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                <label for="createUser-password" class="label-material">Şifre</label>
            </div>
            <div class="form-group-material">
                <input
                    id="createUser-passwordConfirm"
                    type="password"
                    name="createUserPasswordConfirm"
                    required
                    data-msg="Şifreyi eksiksiz olarak giriniz."
                    class="input-material"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}/>
                <label for="createUser-passwordConfirm" class="label-material">Şifre Tekrar</label>
            </div>
            {
                shouldShowBalanceInput &&
                <div class="form-group-material">
                    <input
                        id="createUser-balance"
                        type="number"
                        name="createUserBalance"
                        required
                        data-msg="Bakiye giriniz."
                        class="input-material"
                        value={balance}
                        onChange={(e) => setBalance(e.target.value)}/>
                    <label for="createUser-password" class="label-material">Bakiye</label>
                </div>
            }
            
            <button className='btn btn-block btn-primary fw-bold' onClick={(e) => createUserFunc(e)}>Kullanıcı Oluştur</button>
        </div>
    )
}
