import UserContext from "./userContext";
import { useState } from "react";

const UserState = (props) => {
    const host = 'http://localhost:5000';

    const userInitial = []
    const [user, setUser] = useState(userInitial);

    const getUser = async () => {
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: "POST",
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        });
        const data = await response.json();
        console.log(data)
        setUser(data);
    }

    return (
        <UserContext.Provider value={{ user, setUser, getUser }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;