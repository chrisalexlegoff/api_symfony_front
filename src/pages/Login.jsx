import { useState } from 'react';
import '../styles/login.css';
import { fetchData } from '../lib/fetchData.js';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [identifiantsError, setIdentifiantsError] = useState();
  const navigate = useNavigate();
  // connexion et stockage du token
  const loginCheck = () => {
    fetchData({
      route: '/login_check',
      options: {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      },
    })
      .then((r) => {
        const payload = jwtDecode(r.token);
        const { exp, roles, username } = payload;
        sessionStorage.setItem('user', JSON.stringify({ exp, roles, username, token: r.token }));
        navigate('/blogs');
      })
      .catch((e) => {
        setIdentifiantsError('mauvais email ou mot de passe');
      });
  };
  // validation des entrées
  const onButtonClick = () => {
    // let username = '';
    // let password = '';
    // if (username.length <= 0) {
    //   setUsernameError('Veuillez saisir une adresse mail');
    //   return;
    // }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(username)) {
      setUsernameError('Veuillez saisir une adresse mail valide, ex:john.doe@monsite.fr');
      return;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$.!%*?&])[A-Za-z\d@$!%*.?&]{9,}$/.test(password)) {
      setPasswordError('Veuillez saisir un mot de passe valide');
      return;
    }

    loginCheck();
  };

  return (
    <form className={'mainContainer'}>
      <div className={'titleContainer'}>
        <p>Connexion</p>
      </div>
      <br />
      <p className="errorLabel">{identifiantsError}</p>
      <div className={'inputContainer'}>
        <input type="text" placeholder="Saisir votre adresse mail" className={'inputBox'} autoComplete="username" onChange={(ev) => setUsername(ev.target.value)} />
        <label className="errorLabel">{usernameError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input type="password" placeholder="Saisir votre mot de passe" className={'inputBox'} autoComplete="current-password" onChange={(ev) => setPassword(ev.target.value)} />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} onClick={onButtonClick} type="button" value={'Se connecter'} />
      </div>
    </form>
  );
};

export default Login;
