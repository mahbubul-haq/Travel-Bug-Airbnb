import React, { useEffect, useState, useContext } from 'react'
import userContext from '../../context/user/userContext';
import { useNavigate } from 'react-router-dom'

const Messages = () => {
  const context = useContext(userContext);
  const { user, getUser } = context;
  let navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({ receiver: "", messageText: "" });

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUser();
    }
    getAllMessages()
  }, [])

  const hostAddress = 'http://localhost:5000';
  const getAllMessages = async () => {
    const response = await fetch(`${hostAddress}/message/all`, {
      method: "GET",
      headers: {
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json);
    setMessages(json);
  }

  const handleSend = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/message/send", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ messageText: newMessage.messageText, sender:user._id, receiver: newMessage.receiver })
    });
    const json = await response.json();
    
    setMessages(messages => [...messages, newMessage])
    setNewMessage({ receiver: "", messageText: "" });

  }

  const onChange = (e) => {
    setNewMessage({ ...newMessage, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <div className='container'>
        <form className="form-style-9" onSubmit={handleSend}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Receiver ID</label>
            <input type="text" className="form-control" id="receiver" name='receiver' value={newMessage.receiver} onChange={onChange} aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Message Text</label>
            <input type="text" className="form-control" id="messageText" name='messageText' value={newMessage.messageText} onChange={onChange} />
          </div>
          <button type="submit" className="btn btn-primary">Send</button>
        </form>
      </div>
      <h2>My Sent Messages</h2>
      <div>
        {messages.map((message) => (
          <div>
            <h5>{message.receiver}</h5>
            <p>{message.messageText}</p>
          </div>
        ))}
      </div>
      <h2>My Received Messages</h2>
    </div>
  )
}

export default Messages
