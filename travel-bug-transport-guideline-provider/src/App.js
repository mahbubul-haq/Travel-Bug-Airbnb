import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import './App.css';
import Login from './components/account/Login';
import SignUp from './components/account/Signup';
import Home from './components/home/Home';
import Nav from './components/nav/Nav';
import AddTransport from './components/transport/AddTransport';
import UserState from './context/user/UserState';

function App() {

  return (
    <> 
   
     <UserState>
      <Router>
        <Nav />
        <div>
          <Routes>

            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/addtransport" element={<AddTransport/>} />
            </Routes>
        </div>
      </Router>
      </UserState> 
    </>
  );
}

export default App;
