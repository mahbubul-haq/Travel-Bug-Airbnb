import TransportContext from "./TransportContext";

const TransportState = (props) => {

    return (
        <TransportContext.Provider value={{}}>
            {props.children}
        </TransportContext.Provider>
    )
}

export default TransportState;