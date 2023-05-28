import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { login } from "../reducers/shelterReducer"
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Auth.css';
import { ADOPTER_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHELTER_ROUTE, VOLUNTEER_ROUTE } from '../utils/const';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check_password, setCheckPassword] = useState("");
  const [name, setName] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const isLogin = location.pathname.includes(REGISTRATION_ROUTE);
  const navigate = new useNavigate();
  
  let loginRoute;
  let registryRoute;

  if (location.pathname.startsWith('/shelter/')) {
    loginRoute = SHELTER_ROUTE + LOGIN_ROUTE;
  } else if (location.pathname.startsWith('/volunteer/')) {
    loginRoute = VOLUNTEER_ROUTE + LOGIN_ROUTE;
  } else if (location.pathname.startsWith('/adopter/')) {
    loginRoute = ADOPTER_ROUTE + LOGIN_ROUTE;
  }

  if (location.pathname.startsWith('/shelter/')) {
    registryRoute = SHELTER_ROUTE + REGISTRATION_ROUTE;
  } else if (location.pathname.startsWith('/volunteer/')) {
    registryRoute = VOLUNTEER_ROUTE + REGISTRATION_ROUTE;
  } else if (location.pathname.startsWith('/adopter/')) {
    registryRoute = ADOPTER_ROUTE + REGISTRATION_ROUTE;
  }

  const click = async () => {
    try {
        let data;
        if (isLogin) {
           
        } else {
           
        }
        if (location.pathname.startsWith("/shelter")) {
          navigate(SHELTER_ROUTE);
        } else if (location.pathname.startsWith("/volunteer")) {
          navigate(VOLUNTEER_ROUTE);
        } else if (location.pathname.startsWith("/adopter")) {
          navigate(ADOPTER_ROUTE);
        }
    } catch (e) {
        alert(e.response.data.message)
    }
  }

  return (
    <div className='auth'>
      <Header />
      <div className="auth-box">
          {isLogin ?
            <div className='registration'>
              <h1>Регистрация</h1>
              <form>
                {(location.pathname.startsWith('/shelter/')) ? 
                  <div className='shelter'>
                    <input
                    className='name' 
                    placeholder="название приюта"
                    value={name}
                    onChange={e => setName(e.target.value)}>
                    </input>
                  </div>
                 :
                  <div className='volunteer-adopter'>
                    <input
                      className='first-name' 
                      placeholder="имя"
                      value={first_name}
                      onChange={e => setFirstName(e.target.value)}>
                    </input>
                    <input
                        className='last-name' 
                        placeholder="фамилия"
                        value={last_name}
                        onChange={e => setLastName(e.target.value)}>
                    </input>
                  </div>
                }
                <input
                        className='email' 
                        placeholder="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}>
                </input>
                <input 
                    className="password" 
                    placeholder="пароль"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password">
                </input>

                <input 
                    className="check_password" 
                    placeholder="повторите пароль"
                    value={check_password}
                    onChange={e => setPassword(e.target.value)}
                    type="password">
                </input>

                <div className='registry'>
                    Уже есть аккаунт? Перейдите на страницу <NavLink className='registry-link' to={loginRoute}>Авторизации</NavLink>
                </div>
                <button className="buttonEnter" onClick={click}>Регистрация</button>
              </form>
            </div> :
            <div className='login'>
              <h1>Авторизации</h1>
              <form>
                <input
                    className='email' 
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}>
                </input>

                <input 
                    className="password" 
                    placeholder="Пароль"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password">
                </input>

                <div className='registry'>
                  Еще нет аккаунта? Перейдите на страницу <NavLink className='registry-link' to={registryRoute}>Регистрации</NavLink>
                </div>

                <button className="buttonEnter" onClick={click}>Войти</button>
        
              </form>
            </div>
          }
      </div>
    </div>
  )
}

export default AuthPage;