import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./Login";

function Nav() {

    const{isLoggedIn} = useContext(AuthContext)
    return(<div style={{display:"flex",justifyContent:'space-around'}}>
        {!isLoggedIn && <>
        <Link to='/register'><p>Register</p></Link>
        <Link to='/login'><p>Login</p></Link>
        </>
        }
        <Link to='/books'><p>Books</p></Link>
        <Link to='/genre'><p>Genre</p></Link>
        
    
    
    </div>)
}

export default Nav