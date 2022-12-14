import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Account from "./components/account/Account";
import Payments from "./components/account/Payments";
import Profile from "./components/account/Profile";
import Login from "./components/authentication/Login";
import SignUp from "./components/authentication/Signup";
import AddBookingDetails from "./components/bookings/AddBookingDetails";
import Bookings from "./components/bookings/Bookings";
import Payment from "./components/bookings/Payment";
import SingleBooking from "./components/bookings/SingleBooking";
import Experiences from "./components/experiences/Experiences";
import SingleExperience from "./components/experiences/SingleExperience";
import About from "./components/home/About";
import Home from "./components/home/Home";
import EditHosting from "./components/hostings/editHosting/EditHosting";
import Hostings from "./components/hostings/Hostings";
import Listings from "./components/hostings/ManagementDashboard/Listings";
import ManageBooking from "./components/hostings/ManagementDashboard/ManageBooking";
import ManagementHome from "./components/hostings/ManagementDashboard/ManagementHome";
import Conversation from "./components/messages/Conversation";
import Messages from "./components/messages/Messages";
import Nav from "./components/nav/Nav";
import Notifications from "./components/notifications/Notifications";
import Request from "./components/notifications/Request";
import TransportGuidelines from "./components/transportguidelines/TransportGuidelines";
import ReservationState from "./context/booking/ReservationState";
import ExperienceState from "./context/experiences/ExperienceState";
import EditHostingState from "./context/hostings/EditHostingState";
import HostingState from "./context/hostings/HostingState";
import UserState from "./context/user/UserState";

function App() {
  return (
    <>
      <EditHostingState>
        <UserState>
          <ExperienceState>
            <HostingState>
              <ReservationState>
                <Router>
                  <Nav />
                  <div>
                    <Routes>
                      <Route exact path="/" element={<Home />} />
                      <Route exact path="/about" element={<About />} />
                      <Route
                        exact
                        path="/experiences"
                        element={<Experiences />}
                      />
                      <Route
                        exact
                        path="/transportguidelines"
                        element={<TransportGuidelines />}
                      />
                      <Route exact path="/signup" element={<SignUp />} />
                      <Route exact path="/login" element={<Login />} />

                      <Route exact path="/bookings" element={<Bookings />} />

                      <Route exact path="/account" element={<Profile />} />
                      <Route
                        exact
                        path="/account/profile"
                        element={<Profile />}
                      />
                      <Route
                        exact
                        path="/account/payments"
                        element={<Payments />}
                      />

                      <Route exact path="/messages" element={<Messages />} />
                      <Route
                        exact
                        path="/messages/conversation"
                        element={<Conversation />}
                      />

                      <Route
                        exact
                        path="/notifications"
                        element={<Notifications />}
                      />

                      <Route
                        exact
                        path="/hostings"
                        element={<ManagementHome />}
                      />
                      <Route
                        exact
                        path="/hostings/listings"
                        element={<Listings />}
                      />

                      <Route exact path="/newlisting" element={<Hostings />} />
                      <Route
                        exact
                        path="/experiences/:id"
                        element={<SingleExperience />}
                      />
                      <Route
                        exact
                        path="/addBookingdetails"
                        element={<AddBookingDetails />}
                      />
                      <Route
                        exact
                        path="/host/experience/:id"
                        element={<EditHosting />}
                      />
                      <Route
                        exact
                        path="/bookingdetails/:id"
                        element={<AddBookingDetails />}
                      />

                      <Route
                        exact
                        path="/booking/payment/:id"
                        element={<Payment />}
                      />
                       <Route
                        exact
                        path="/bookingrequest/:bookingId/:notificationId/:type"
                        element={<Request />}
                      />
                      <Route
                        exact
                        path="/bookingview/:bookingId"
                        element={<SingleBooking />}
                      />
                      <Route
                        exact path = "/hostings/booking/:id"
                        element={<ManageBooking/>}
                      />
                    </Routes>
                  </div>
                </Router>
              </ReservationState>
            </HostingState>
          </ExperienceState>
        </UserState>
      </EditHostingState>
    </>
  );
}

export default App;
