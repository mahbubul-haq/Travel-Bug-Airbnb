import React from 'react'

const HostitemCard = (props) => {
    const { hostItem } = props;

    return (
        <div className='col-md-3'>
            <div className="card border-info my-2">
                <img src="/logo512.png" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">Hosting Title: {hostItem.hostingTitle}</h5>
                    <p className="card-text">Description: {hostItem.description}</p>
                </div>
                <div className="card-footer">
                    <small className="text-muted">Hosting Date: {hostItem.hostingDate}</small>
                </div>
            </div>
        </div>
    )
}

export default HostitemCard
