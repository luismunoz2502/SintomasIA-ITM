import { useCreateUser } from "../logic/useCreateUser";

export default function SignUp() {
  const { username, email, password, setPassword, setEmail, setUsername, handleSubmit } = useCreateUser();

  return (
    <div className="login-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div className="form-group">
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="signup-button">
          Create User
        </button>
      </form>
    </div>
  );
}
