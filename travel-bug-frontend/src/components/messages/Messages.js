import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "../../context/user/userContext";

import Dummy from "../../images/dummy_profile_pic.webp";

import "./Messages.css";

const Messages = () => {
  const context = useContext(userContext);
  const { user, getUser } = context;
  const [users, setUsers] = useState([]);
  let navigate = useNavigate();
  const [leftSearch, setLeftSearch] = useState("");
  const [leftSearchUsers, setLeftSearchUsers] = useState([]);
  const [rightSearch, setRightSearch] = useState("");
  const [rightUsers, setRightUsers] = useState([]);
  const [leftUsers, setLeftUsers] = useState([]);
  const [receiverMessages, setReceiverMessages] = useState([]);
  const [fetchedMessages, setFetchedMessages] = useState([]);
  // const [newMessages, setNewMessages] = useState([]);

  //Dummy

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({
    receiver: null,
    messageText: "",
    receiverName: "",
    timeStamp: null,
  });

  const getAllUsers = async () => {
    const response = await fetch("http://localhost:5000/message/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    /// console.log("all users:", json);
    setUsers(json);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser();
    }
    getAllUsers();
    getAllMessages();
  }, []);
  //console.log(user);

  useEffect(() => {
    //console.log("right search:", rightSearch);
    if (rightSearch !== "") {
      let filteredUsers = users.filter((user_) => {
        return (
          user_.firstName.toLowerCase().includes(rightSearch.toLowerCase()) ||
          user_.lastName.toLowerCase().includes(rightSearch.toLowerCase())
        );
      });
      filteredUsers.sort();
      setRightUsers(filteredUsers);
    }
    else {
      setRightUsers([]);
    }
  }, [rightSearch]);

  useEffect(() => {
    // console.log("left search:", leftSearch, leftUsers);
    if (leftSearch !== "") {
      let filteredUsers = leftUsers.filter((user_) => {
        return (
          user_.firstName.toLowerCase().includes(leftSearch.toLowerCase()) ||
          user_.lastName.toLowerCase().includes(leftSearch.toLowerCase())
        );
      });
      filteredUsers.sort();
      setLeftSearchUsers(filteredUsers);
    }
    else {
      setLeftSearchUsers([]);
    }
  }, [leftSearch]);


  useEffect(() => {
    console.log("You cheated on me", messages, newMessage.receiver);
    if (newMessage.receiver !== null) {
      setReceiverMessages(() => {
        let tempMessages = messages.filter((message) => {
          return (
            message.sender._id.toString() == newMessage.receiver.toString() ||
            message.receiver._id.toString() == newMessage.receiver.toString()
          );
        });

        tempMessages = tempMessages.sort((a, b) => {
          return Date.parse(a.timeStamp) - Date.parse(b.timeStamp);
        });
        //setMessages(tempMessages);
        
        return tempMessages;
      });
    }
  }, [newMessage.receiver]);

  const hostAddress = "http://localhost:5000";
  const getAllMessages = async () => {
    const response = await fetch(`${hostAddress}/message/all`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    //console.log("all messages", json);
    

    //sort element of messages array by timeStamp
    json.sort((a, b) => {
      return Date.parse(a.timeStamp) - Date.parse(b.timeStamp);
    });
    setFetchedMessages(json);
    setMessages(json);

  };

  const handleSend = async () => {
    const response = await fetch("http://localhost:5000/message/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messageText: newMessage.messageText,
        sender: user._id,
        receiver: newMessage.receiver,
        timeStamp: Date.now(),
      }),
    });
    const json = await response.json();
    receiverMessages.push(json.message[0]);
    console.log("senttt", json.message);
    setMessages((prevMessages) => {
      return [...prevMessages, json.message[0]]});

      //sort element of messages array by timeStamp
      messages.sort((a, b) => {
        return Date.parse(a.timeStamp) - Date.parse(b.timeStamp);
      });

    receiverMessages.sort((a, b) => {
      return Date.parse(a.timeStamp) - Date.parse(b.timeStamp);
    });

    ///setMessages((messages) => [...messages, newMessage]);
    setNewMessage({
      ...newMessage,
      messageText: "",
    });
  };

  useEffect(() => {
    var element = document.getElementById("message-messages");
    if (element !== null) {
      element.scroll({ top: element.scrollHeight, behavior: "smooth" });
    }
    //console.log("scroll");
  });

  // setInterval(async () => {
  //   await getAllMessages();
  //   await getAllUsers();
  // }, 5000);

  useEffect(() => {
    console.log("left users", leftUsers);
  }, [leftUsers]);

  useEffect(() => {
    console.log("receiver messages here", receiverMessages);
  }, [receiverMessages]);

  useEffect(() => {
    console.log("all users", users);
  }, [users]);

  useEffect(() => {
    console.log("all messages", messages);
    getLeftUsers();
  }, [messages]);

  useEffect(() => {
    console.log("fetched messages", fetchedMessages);
  } ,[fetchedMessages]);

  const getLeftUsers = () => {
    let taken = {};
    let tempUsers = [];
    let newMessag = [];
    console.log("messages dumb", messages);
    console.log("type of ", user);

    for (let i = messages.length - 1; i >= 0; i--) {
      if (typeof user === "undefined" || typeof messages[i].sender === "undefined" || typeof messages[i].receiver === "undefined") {
        continue;
      }
      if (typeof messages[i].sender._id === "undefined" || typeof messages[i].receiver._id === "undefined") {
        continue;
      }
      
      if (messages[i].sender._id.toString() === user._id.toString()) {
        if (!taken[messages[i].receiver._id.toString()]) {
          tempUsers.push(messages[i].receiver);
          taken[messages[i].receiver._id.toString()] = true;
        }
      } else {
        if (!taken[messages[i].sender._id.toString()]) {
          tempUsers.push(messages[i].sender);
          taken[messages[i].sender._id.toString()] = true;
        }
      }
    }

    setLeftUsers(tempUsers);
    
  };

  const getRight = () => {
    if (rightSearch.length > 0 || newMessage.receiver === null) {
      return (
        <div id="message-right">
          <div id="message-right-search">
            <input
              type="text"
              placeholder="Search any user by name"
              onChange={(e) => {
                setRightSearch(e.target.value);
              }}
              value={rightSearch}
            />
          </div>
          {rightUsers.map((user_, i) => {
            return (
              <div
                key={i}
                id="message-right-listitem"
                onClick={() => {
                  setNewMessage({
                    ...newMessage,
                    messageText: "",
                    receiver: user_._id,
                    receiverName: user_.firstName + " " + user_.lastName,
                  });
                  setRightSearch("");
                  //getReceiverMessages();
                }}
              >
                <img id="message-right-image" src={Dummy} alt="profile" />

                <div id="message-right-name">
                  {user_.firstName} {user_.lastName}
                </div>
              </div>
            );
          })}
        </div>
      );
    } else if (newMessage.receiver) {
      return (
        <div id="message-right">
          <div id="message-right-search">
            <input
              type="text"
              placeholder="Search any user by name"
              onChange={(e) => {
                setRightSearch(e.target.value);
              }}
              value={rightSearch}
            />
          </div>

          <div id="message-right-prof">
            <img id="right-prof-image" src={Dummy} alt="profile" />

            <div id="right-prof-name">
              <h3>{newMessage.receiverName}</h3>
            </div>
          </div>
        </div>
      );
    }
  };

  const getLeft = () => {
    if (leftSearch.length > 0) {
      return (
        <>
          {leftSearchUsers.map((user_, i) => {
            return (
              <div
                id="message-left-listitem"
                onClick={() => {
                  setNewMessage({
                    ...newMessage,
                    messageText: "",
                    receiver: user_._id,
                    receiverName: user_.firstName + " " + user_.lastName,
                  });
                  setLeftSearch("");
                  //getReceiverMessages();
                }}
              >
                <img id="message-left-image" src={Dummy} alt="profile" />

                <div id="message-left-name">
                  {user_.firstName + " " + user_.lastName}
                </div>
              </div>
            );
          })}
        </>
      );
    } else {
      return (
        <>
          {leftUsers.map((user_, i) => {
            return (
              <div
                id="message-left-listitem"
                onClick={() => {
                  setNewMessage({
                    ...newMessage,
                    messageText: "",
                    receiver: user_._id,
                    receiverName: user_.firstName + " " + user_.lastName,
                  });
                  setLeftSearch("");
                  //getReceiverMessages();
                }}
              >
                <img id="message-left-image" src={Dummy} alt="profile" />

                <div id="message-left-name">
                  {user_.firstName + " " + user_.lastName}
                </div>
              </div>
            );
          })}
        </>
      );
    }
  };

  const getMiddle = () => {
    if (newMessage.receiver) {
      return (
        <div id="message-middle">
          <div id="message-messages">
            {receiverMessages.map((message_, i) => {
              //console.log("receiver messages", message_, message_.receiver, message_.sender, user);
              return (
                <div
                  key={i}
                  id={
                    message_.sender._id.toString() == user._id.toString()
                      ? "message-sender"
                      : "message-receiver"
                  }
                >
                  <div id="message-text">{message_.messageText}</div>
                  <div id="message-time">{message_.timeStamp.slice(0, 16).replace("T", " ")}</div>
                </div>
              );
            })}
          </div>
          <div id="message-send">
            <textarea
              style={{
                resize: "none",
                width: "100%",
                height: "100%",
                outline: "none",
                overflowY: "auto",
                padding: "10px",
              }}
              type="text"
              placeholder="Type a message"
              onChange={(e) => {
                setNewMessage({ ...newMessage, messageText: e.target.value });
              }}
              value={newMessage.messageText}
            />
            <button
              id="send-button"
              onClick={() => {
                handleSend();
              }}
            >
              Send
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div id="message-middle">
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            No receiver selected
          </div>
        </div>
      );
    }
  };

  return (
    <div id="message-container">
      <div id="message-inner">
        <div id="message-left">
          <div id="message-left-search">
            <input
              type="text"
              placeholder="Search in Inbox"
              onChange={(e) => {
                setLeftSearch(e.target.value);
              }}
              value={leftSearch}
            />
          </div>

          {getLeft()}
        </div>
        {getMiddle()}

        {getRight()}
      </div>
    </div>
  );
  // return (
  //   <div>
  //     <div className='container'>
  //       <form className="form-style-9" onSubmit={handleSend}>
  //         <div className="mb-3">
  //           <label htmlFor="email" className="form-label">Receiver ID</label>
  //           <input type="text" className="form-control" id="receiver" name='receiver' value={newMessage.receiver} onChange={onChange} aria-describedby="emailHelp" />
  //         </div>
  //         <div className="mb-3">
  //           <label htmlFor="password" className="form-label">Message Text</label>
  //           <input type="text" className="form-control" id="messageText" name='messageText' value={newMessage.messageText} onChange={onChange} />
  //         </div>
  //         <button type="submit" className="btn btn-primary">Send</button>
  //       </form>
  //     </div>
  //     <h2>My Sent Messages</h2>
  //     <div>
  //       {messages.map((message) => (
  //         <div>
  //           <h5>{message.receiver}</h5>
  //           <p>{message.messageText}</p>
  //         </div>
  //       ))}
  //     </div>
  //     <h2>My Received Messages</h2>
  //   </div>
  // )
};

export default Messages;
