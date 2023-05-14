import React, { useState } from 'react';
import '../css/Login.css';
import languages from '../modules/languages';
import LanguagesSelection from './languages_selection';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('en'); // Set the default language here

  const handleLanguageChange = (e) => {
    setCurrentLanguage(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  const loginText = languages[currentLanguage].login;

  if(currentLanguage == 'he'){
    document.querySelector('.login_div').style.direction = 'rtl';
  }
  else{
    document.querySelector('.login_div').style.direction = 'ltr';
  }

  return (
    <>
    <LanguagesSelection
        handleLanguageChange={handleLanguageChange} // Pass the event handler as a prop
        selectedLanguage={currentLanguage} // Pass the selected language as a prop
      />
    <div className="login_div">
      <h1>{loginText.header}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          {loginText.username}:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          {loginText.password}:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">{loginText.submit}</button>
      </form>
    </div>
    </>
  );
}

export default Login;
