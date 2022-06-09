import React, { useState } from 'react'
import { 
  signIn
} from '../../services/user.service';
import { useDispatch} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { 
  setLoggedInUser
} from '../../redux/stateSlices/user.slice';

const Login = () => {
  const [mailAddress, setMailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function SignIn() {
    try {
      if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mailAddress))
      {
        var signInResponse = signIn(mailAddress, password);
        console.log("here with response", signInResponse);
        if(signInResponse.Status)
        {
          dispatch(setLoggedInUser({
            userName: signInResponse.Value.userName,
            emailAddress: signInResponse.Value.emailAddress,
            name: signInResponse.Value.name,
            surname: signInResponse.Value.surname,
            roles: signInResponse.Value.roles,
            accounts: signInResponse.Value.accounts
          }));

          navigate("/");
        }
        else
        {
          setErrorMessage(signInResponse.ErrorList.join(","));
        }
      }
      else
      {
        setErrorMessage("Geçersiz mail adresi");
      }
    }
    catch(err) 
    {
      console.log("err", err);
      if(err.ErrorList !== undefined)
      {
        setErrorMessage(err.ErrorList.join(','));
      }
      else
      {
        setErrorMessage("İşleminiz tamamlanamadı, lütfen girilen bilgilerin geçerliliğinden emin olduktan sonra tekrar deneyiniz.");
      }
    }
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
                              <div className="col-12 text-white ff-arial text-center"><h3>Giriş Yap</h3></div>
                              {
                                errorMessage &&
                                <span className='col-12 text-white pl-0 pb-3 m-0'> { errorMessage } </span>
                              }
                                <div class="form-group">
                                    <input
                                        id="login-mail"
                                        type="text"
                                        name="loginMailAddress"
                                        required
                                        data-msg="Lütfen e-mail adresinizi eksiksiz bir şekilde giriniz."
                                        class="input-material"
                                        value={mailAddress}
                                        onChange={(e) => setMailAddress(e.target.value)}/>
                                    <label for="login-mail" class="label-material">Mail Adresi</label>
                                </div>
                                <div class="form-group">
                                    <input
                                        id="login-password"
                                        type="password"
                                        name="loginPassword"
                                        required
                                        data-msg="Şifrenizi eksiksiz olarak giriniz."
                                        class="input-material"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}/>
                                    <label for="login-password" class="label-material">Şifre</label>
                                </div>
                                <button className='btn btn-block btn-primary' onClick={() => SignIn()}>Giriş Yap</button>
                                <div className="col-12 mt-3 text-center text-white">
                                  <span>veya <Link to="/register" className='ml-1'>Kaydol</Link></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login;