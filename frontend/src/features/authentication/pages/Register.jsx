import React from 'react'
import { useNavigate,Link } from 'react-router'
import Login from './Login';

const Register = () => {
  const navigate = useNavigate();
  const handleSumbit = (event) =>{
    event.preventDefault()
  }
  return (
    <main>
      <div className='form-container'>
        <h1>Register</h1>
        <form onSubmit={handleSumbit}>
          <div className="input-group">
            <label htmlFor="username" >Username</label>
            <input type="text" id='username' placeholder='Enter username' name='username' />
          </div>
          <div className="input-group">
            <label htmlFor="email" >Email</label>
            <input type="email" id='email' placeholder='Enter your email' name='email' />
          </div>
          <div className="input-group">
            <label htmlFor="password" >Password</label>
            <input type="password" id='password' placeholder='Enter your password' name='password' />
          </div>
          <button className='button primary-button'>Register</button>
        </form>
        <p>Already have an account? <Link to={"/login"}>Login</Link></p>
      </div>
    </main>
  )
}

export default Register