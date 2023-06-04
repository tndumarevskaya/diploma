import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Auth.css';
import { ADOPTER_ROUTE, ANIMAL_CATALOG_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHELTER_ROUTE, VOLUNTEER_ROUTE } from '../utils/const';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { registerShelter, registerVolunteer, registerAdopter, loginShelter, loginVolunteer, loginAdopter} from "../actions/auth";
import { getShelter } from '../actions/shelter';
import authAPI from '../http/authAPI';

function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check_password, setCheckPassword] = useState("");
  const [name, setName] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const location = useLocation();
  const isLogin = location.pathname.includes(REGISTRATION_ROUTE);
  const navigate = new useNavigate();
  const [errorPassword, setErrorPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const { message } = useSelector(state => state.message);
  const [user, setUser] = useState({});

  const dispatch = useDispatch();

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

  const handleRegistry = async (event) => {
    event.preventDefault(); 
    if(password !== check_password) {
      setErrorPassword("Пароли не совпадают!");
      return;
    } else {
      setErrorPassword("");
    }
    try {
        if (location.pathname.startsWith("/shelter")) {
          dispatch(registerShelter(email, password, name))
          .then(() => {
            console.log("res")
            const userId = JSON.parse(localStorage.getItem('user')).id;
            navigate(SHELTER_ROUTE + "/" + userId);
          })
          .catch((response) => {
            console.log(response);
            console.log("message");
            setErrorEmail(message);
          });
        } else if (location.pathname.startsWith("/volunteer")) {
          dispatch(registerVolunteer(email, password, first_name, last_name))
          .then(() => {
            console.log("ok")
            const userId = JSON.parse(localStorage.getItem('user')).id;
            navigate(VOLUNTEER_ROUTE + "/" + userId);
          })
          .catch(() => {
            console.log(message);
            setErrorEmail(message);
          });
        } else if (location.pathname.startsWith("/adopter")) {
          dispatch(registerAdopter(email, password, first_name, last_name))
          .then(() => {
            console.log("ok")
            const userId = JSON.parse(localStorage.getItem('user')).id;
            navigate(ANIMAL_CATALOG_ROUTE);
          })
          .catch(() => {
            console.log(message);
            setErrorEmail(message);
          });
        }
    } catch (e) {
        alert(e.response.data.message)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      if (location.pathname.startsWith("/shelter")) {
        dispatch(loginShelter(email, password))
        .then(() => {
          console.log("ok")
          const userId = JSON.parse(localStorage.getItem('user')).id;
          navigate(SHELTER_ROUTE + "/" + userId);
        })
        .catch(() => {
          console.log("ss" + message);
          setErrorPassword(message);
        });
      } else if (location.pathname.startsWith("/volunteer")) {
        dispatch(loginVolunteer(email, password))
        .then(() => {
          console.log("ok")
          const userId = JSON.parse(localStorage.getItem('user')).id;
          navigate(VOLUNTEER_ROUTE + "/" + userId);
        })
        .catch(() => {
          console.log(message);
          setErrorEmail(message);
        });
      } else if (location.pathname.startsWith("/adopter")) {
        dispatch(loginAdopter(email, password))
        .then(() => {
          console.log("ok")
          const userId = JSON.parse(localStorage.getItem('user')).id;
          navigate(ANIMAL_CATALOG_ROUTE);
        })
        .catch(() => {
          console.log(message);
          setErrorEmail(message);
        });
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
              <form onSubmit={handleRegistry}>
                {(location.pathname.startsWith('/shelter/')) ? 
                  <div className='shelter'>
                    <input
                    className='name' 
                    placeholder="название приюта"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required>
                    </input>
                  </div>
                 :
                  <div className='volunteer-adopter'>
                    <input
                      className='first-name' 
                      placeholder="имя"
                      value={first_name}
                      onChange={e => setFirstName(e.target.value)}
                      required>
                    </input>
                    <input
                        className='last-name' 
                        placeholder="фамилия"
                        value={last_name}
                        onChange={e => setLastName(e.target.value)}
                        required>
                    </input>
                  </div>
                }
                <input
                  className='email' 
                  placeholder="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$">
                </input>
                {errorEmail && <div className="error-message">{errorEmail}</div>}
                <input 
                    className="password" 
                    placeholder="пароль"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    required
                    minlength="4"
                    maxlength="13">
                </input>

                <input 
                    className="check_password" 
                    placeholder="повторите пароль"
                    value={check_password}
                    onChange={e => setCheckPassword(e.target.value)}
                    type="password"
                    required>
                </input>
                {errorPassword && <div className="error-message">{errorPassword}</div>}

                <div className='registry'>
                    Уже есть аккаунт? Перейдите на страницу <NavLink className='registry-link' to={loginRoute}>Авторизации</NavLink>
                </div>
                <button className="buttonEnter" type="submit">Регистрация</button>
              </form>
            </div> :
            <div className='login'>
              <h1>Авторизации</h1>
              <form onSubmit={handleLogin}>
                <input
                    className='email' 
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required>
                </input>

                <input 
                    className="password" 
                    placeholder="Пароль"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    required>
                </input>
                {errorPassword && <div className="error-message">{errorPassword}</div>}

                <div className='registry'>
                  Еще нет аккаунта? Перейдите на страницу <NavLink className='registry-link' to={registryRoute}>Регистрации</NavLink>
                </div>

                <button className="buttonEnter" type='submit'>Войти</button>
        
              </form>
            </div>
          }
      </div>
      <Footer />
    </div>
  )
}

export default AuthPage;