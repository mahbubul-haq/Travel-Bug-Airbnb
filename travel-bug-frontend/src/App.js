import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";

import About from './components/About';
import Account from './components/account/Account';
import Payments from './components/account/Payments';
import Profile from './components/account/Profile';
import Bookings from './components/bookings/Bookings';
import Experiences from './components/Experiences';
import Home from './components/Home';
import Hostings from './components/hostings/Hostings';
import Listings from './components/hostings/ManagementDashboard/Listings';
import ManagementHome from './components/hostings/ManagementDashboard/ManagementHome';
import Login from './components/Login';
import Conversation from './components/messages/Conversation';
import Messages from './components/messages/Messages';
import Nav from './components/Nav';
import Notifications from './components/notifications/Notifications';
import SignUp from './components/Signup';
import TransportGuidelines from './components/TransportGuidelines';
import HostingState from './context/hostings/HostingState';
import ExperienceState from './context/experiences/ExperienceState';


function App() {

  return (
    <>
      <ExperienceState>
        <HostingState>
          <Router>
            <Nav />
            <div>
              <Routes>

                <Route exact path="/" element={<Home />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/experiences" element={<Experiences />} />
                <Route exact path="/transportguidelines" element={<TransportGuidelines />} />
                <Route exact path="/signup" element={<SignUp />} />
                <Route exact path="/login" element={<Login />} />

                <Route exact path="/bookings" element={<Bookings />} />

                <Route exact path="/account" element={<Account />} />
                <Route exact path="/account/profile" element={<Profile />} />
                <Route exact path="/account/payments" element={<Payments />} />

                <Route exact path="/messages" element={<Messages />} />
                <Route exact path="/messages/conversation" element={<Conversation />} />

                <Route exact path="/notifications" element={<Notifications />} />

                <Route exact path="/hostings" element={<ManagementHome />} />
                <Route exact path="/hostings/listings" element={<Listings />} />
                <Route exact path="/newlisting" element={<Hostings />} />
              </Routes>
            </div>
          </Router>
        </HostingState>
      </ExperienceState>
    </>
  );
}

export default App;
