import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Experiences from './components/Experiences';
import TransportGuidelines from './components/TransportGuidelines';
import SignUp from './components/Signup';
import Login from './components/Login';
import Hostings from './components/hostings/Hostings';
import Account from './components/account/Account';
import Messages from './components/messages/Messages';
import Notifications from './components/notifications/Notifications';
import Profile from './components/account/Profile';
import Payments from './components/account/Payments';
import Bookings from './components/bookings/Bookings';
import Conversation from './components/messages/Conversation';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/experiences" element={<Experiences />} />
            <Route exact path="/transportguidelines" element={<TransportGuidelines />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/hostings" element={<Hostings />} />
            <Route exact path="/bookings" element={<Bookings />} />
            
            <Route exact path="/account" element={<Account />} />
            <Route exact path="/account/profile" element={<Profile />} />
            <Route exact path="/account/payments" element={<Payments />} />
            
            <Route exact path="/messages" element={<Messages />} />
            <Route exact path="/messages/conversation" element={<Conversation />} />

            <Route exact path="/notifications" element={<Notifications />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
