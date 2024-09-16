import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [users, setUsers] = useState([
    { email: 'iftekhar@gmail.com', password: 'password' },
    { email: 'khushi@gmail.com', password: '1234word' },
    { email: 'amaan@gmail.com', password: '7890word' }
  ]);

  const [isLoggedIn,setIsLoggedIn] = useState(false)

  return (
    <AuthContext.Provider value={{ users, setUsers,isLoggedIn,setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

const Login = () => {
  const {users} = useContext(AuthContext)
  const {setIsLoggedIn} = useContext(AuthContext)
  const {isLoggedIn} = useContext(AuthContext)


  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); 
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();

    const existingUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (existingUser) {
      alert('Login successful!');
      setIsLoggedIn(!isLoggedIn)
      navigate('/')

      
      setError(null);
    } else {
      setError('Invalid email or password');
    }

    setEmail('');
    setPassword('');
  };

  return (
    <AuthContextProvider >
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>} 
    </AuthContextProvider>
  );
};

export { AuthContextProvider,AuthContext, Login };
