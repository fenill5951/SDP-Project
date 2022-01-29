import logo from './logo.svg';
import './App.css';
import Signup from './Components/signup'
import Login from './Components/login';
import Feed from './Components/feed';
import {BrowserRouter,Switch,Route, Routes} from 'react-router-dom'
import {AuthProvider,AuthContext} from './Context/AuthContext';
import PrivateRoute from './Components/PrivateRoute';
import {useContext} from 'react';

// function PrivateRoute({ children }) {
//   const {user} = useContext(AuthContext);
//   return auth ? children : <Navigate to="/login" />;
// }


function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
    <Routes>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/login" element={<Login/>} />
    <Route path="/" element={<PrivateRoute><Feed/></PrivateRoute>}/>
    {/* <Route path="/" element={<Feed/>}/> */}
    </Routes>
    </AuthProvider>
    </BrowserRouter> 
  );
}

export default App;
