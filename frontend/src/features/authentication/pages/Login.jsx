import "../auth.form.scss"
import { Link } from "react-router"
const Login = () => {
  const handleSumbit = (event) =>{
    event.preventDefault()
  }
  return (
    <main>
      <div className='form-container'>
        <h1>Login</h1>
        <form onSubmit={handleSumbit}>
          <div className="input-group">
            <label htmlFor="email" >Email</label>
            <input type="email" id='email' placeholder='Enter your email' name='email' />
          </div>
          <div className="input-group">
            <label htmlFor="password" >Password</label>
            <input type="password" id='password' placeholder='Enter your password' name='password' />
          </div>
          <button className='button primary-button'>Login</button>
        </form>
                <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
      </div>
    </main>
    
  )
}

export default Login