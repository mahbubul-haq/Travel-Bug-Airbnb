import React from 'react'

const HostitemCard = (props) => {
    const { hostItem } = props;

    return (
        <div className="card my-2">
            {/* <img src="../../../../public/logo512.png" className="card-img-top" alt="..." /> */}
            <div className="card-body">
                <h5 className="card-title">Hosting Title: {hostItem.hostingTitle}</h5>
                <p className="card-text">Description: {hostItem.description}</p>
            </div>
            <div className="card-footer">
                <small className="text-muted">Hosting Date: {hostItem.hostingDate}</small>
            </div>
        </div>
    )
}

export default HostitemCard
