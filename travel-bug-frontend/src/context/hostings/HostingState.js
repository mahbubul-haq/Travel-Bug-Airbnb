import HostingContext from "./hostingContext";
import { useState } from "react";

const HostingState = (props) => {
    const host = 'http://localhost:5000';

    const myHostingsInitial = []
    const [myHostings, setMyHostings] = useState(myHostingsInitial);

    const getAllMyHostings = async () => {
        const response = await fetch(`${host}/host/experience/all`, {
            method: "GET",
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        });
        const data = await response.json();
        console.log(data)
        console.log(localStorage.getItem('token'));
        setMyHostings(data.experienceHosting);
    }

    return (
        <HostingContext.Provider value={{ myHostings, getAllMyHostings }}>
            {props.children}
        </HostingContext.Provider>
    )
}

export default HostingState;