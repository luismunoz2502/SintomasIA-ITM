import { Navigate } from 'react-router-dom';
import { useLoginUser } from '../logic/useLoginUser';

export default function Login() {

  const { auth, username, password, handleSubmit, setUsername, setPassword } = useLoginUser();

  if (auth.isAuthenticated) {
    return <Navigate to="/welcome" />;
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="form-group">
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}
