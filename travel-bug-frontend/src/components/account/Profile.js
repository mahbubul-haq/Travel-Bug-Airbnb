import React, { useContext, useEffect, useState } from 'react'
import './profile.css'
import userContext from "../../context/user/userContext";

const Profile = () => {
  const context = useContext(userContext);
  const { user, getUser } = context;
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
    email: "",
    nid: "",
    userDetails: "",
  });

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    setUserData({
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNo: user.phoneNo,
      email: user.email,
      nid: user.nid,
      userDetails: user.userDetails,
    })
  }, [user]);


  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    console.log(userData);

    // Update the user profile
    const host = "http://localhost:5000/";
    const response = await fetch(host + "api/auth/updateuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(userData),
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      alert("Profile updated successfully");
      console.log("Profile updated successfully");
      getUser();
    }
  }

  return (
    <div>
      <div class="container rounded bg-white mt-5 mb-5">
        <div class="row">
          <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"/><span class="font-weight-bold">{user.firstName} {user.lastName}</span><span class="text-black-50">{user.email}</span><span> </span></div>
          </div>
          <div class="col-md-5 border-right">
            <div class="p-3 py-5">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="text-right">Profile</h4>
              </div>
              <div class="row mt-2">
                <div class="col-md-6"><label class="labels">First Name</label><input type="text" class="form-control" placeholder="first name" name='firstName' value={userData.firstName} onChange={onChange} /></div>
                <div class="col-md-6"><label class="labels">Last Name</label><input type="text" class="form-control" value={userData.lastName} placeholder="surname" name='lastName' onChange={onChange} /></div>
              </div>
              <div class="row mt-3">
                <div class="col-md-12"><label class="labels">Mobile Number</label><input type="text" class="form-control" placeholder="enter phone number" name='phoneNo' value={userData.phoneNo} onChange={onChange} /></div>
                <div class="col-md-12"><label class="labels">National ID Number</label><input type="text" class="form-control" placeholder="enter national number" name='nid' value={userData.nid} onChange={onChange} /></div>
                <div class="col-md-12"><label class="labels">Email ID</label><input type="text" class="form-control" placeholder="enter email id" name='email' value={user.email} /></div>
              </div>
              <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button" onClick={handleSaveProfile}>Save Profile</button></div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="p-3 py-5">
              <div class="d-flex justify-content-between align-items-center experience"></div><br /><br />
              <div class="col-md-12"><label class="labels">Details about yourself</label><textarea type="textarea" rows="4" cols="50" class="form-control" placeholder="Your details" name="userDetails" value={userData.userDetails} onChange={onChange} /></div> <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
