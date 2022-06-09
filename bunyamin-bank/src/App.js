import './App.css';
import { Sidebar } from './components/Sidebar';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './redux/stateSlices/user.slice';
import { deleteLocalStorageItem } from './services/base.service';

function App() {
    const userName = useSelector((state) => state.user.loggedInUser.userName);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        console.log(userName);
        if(userName.trim() === '' || userName === undefined)
        {
            dispatch(logout);
            navigate('/login');
        }
    }, []);

    function logOut()
    {
        dispatch(logout);
        deleteLocalStorageItem("store");
        navigate('/login');
    }
    
    return (
        <div className="App">
            <div id="mainContainer">
                <header className='header'>
                    <nav className='navbar navbar-expand-lg'>
                        <div className='container-fluid d-flex align-items-center justify-content-between'>
                            <div className='navbar-header'>
                              <Link to="/">
                                <div className="brand-text brand-big visible text-uppercase">
                                    <strong className="text-primary">Bünyamin</strong>
                                    <strong>BANK</strong>
                                </div>
                              </Link>
                              <button className="sidebar-toggle ml-4">
                                  <i className="fa fa-long-arrow-left"></i>
                              </button>
                            </div>
                            <div className="right-menu list-inline no-margin-bottom">
                                <div className="list-inline-item logout">
                                    <a id="logout" onClick={() => logOut()} href="javascript:void(0)" className="nav-link">Çıkış Yap
                                        <i className="icon-logout pl-3"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
                <div className='d-flex align-items-stretch'>
                    <Sidebar />
                    <div className='page-content text-white'>
                      <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
