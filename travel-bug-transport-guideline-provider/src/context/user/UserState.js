import { useState } from "react";
import UserContext from "./userContext";

const UserState = (props) => {
    const host = 'http://localhost:5000';

    const userInitial = []
    const [user, setUser] = useState(userInitial);

    const getUser = async () => {
        try{
        const response = await fetch(`${host}/transport/getuser`, {
            method: "POST",
            headers: {
                "auth-token": localStorage.getItem('token'),
                'Content-Type' : 'application/json'
            }
        });
        const data = await response.json();
        console.log(data)
        setUser(data);
    }
    catch(err){
        console.log(err);
    }
}

    return (
        <UserContext.Provider value={{ user, setUser, getUser }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;