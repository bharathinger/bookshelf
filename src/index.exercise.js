import React from 'react';
import { createRoot } from 'react-dom/client';
import { Logo } from './components/logo';
import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';


const LoginForm = ({ onSubmit, buttonText }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = event.target.elements;
    onSubmit({
      username: username.value,
      password: password.value
    });
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='username'>Username</label>
      <input type={"text"} id="username" />
      <label htmlFor='password'>Password</label>
      <input type={"password"} id="password" />
      <div>
        <button type="submit">{buttonText}</button>
      </div>
    </form>
  )
}

const App = () => {
  const [openModal, setOpenModal] = React.useState('none');

  const login = (formData) => {
    console.log('login ', formData);
  }
  const register = (formData) => {
    console.log('register ', formData);
  }
  return (
    <div>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div>
        <button onClick={() => setOpenModal('login')}>Login</button>
      </div>
      <div>
        <button onClick={() => setOpenModal('register')}>Register</button>
      </div>
      <Dialog aria-label='Login form' isOpen={openModal === 'login'}>
        <button onClick={() => setOpenModal('none')}>Close</button>
        <h3>Login</h3>
        <LoginForm buttonText={"Login"} onSubmit={login} />
      </Dialog>
      <Dialog aria-label='Registration form' isOpen={openModal === 'register'}>
        <button onClick={() => setOpenModal('none')}>Close</button>
        <h3>Register</h3>
        <LoginForm buttonText={"Register"} onSubmit={register} />
      </Dialog>
    </div>
  )
}
const root = createRoot(document.getElementById('root'));
root.render(<App />);
