//Dependencies
import React from 'react';
import './RegisterForm.css'

function RegisterForm() {
  return(
    <form className="Login" name="login">
      <legend>Register</legend>
      <label for="email-input" id="email-label" name="email-label">e-mail:</label>
      <input type="text" placeholder='ex. john123@super.com' id="username-input" name="username-input" />
      <label for="username-input" id="username-label" name="username-label">username:</label>
      <input type="text" placeholder='ex. John123' id="username-input" name="username-input" />
      <label for="password-input" id="password-label" name="password-label">password:</label>
      <input type="password" placeholder='******' id="password-input" name="password-input" />
      <button type="submit" value="submit">Submit</button>
    </form>
  );
}

export default RegisterForm;