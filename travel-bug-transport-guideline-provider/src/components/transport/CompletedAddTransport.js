import React from 'react'
import { Link } from 'react-router-dom'

const CompletedAddTransport = () => {
    return (
        <div>
            <div className="card text-center">
                <div className="card-body">
                    <h5 className="card-title">Your input has been successfully added</h5>
                    <p className="card-text">Thank you for your input. Stay with Travel Bug.</p>
                    <Link to="/addtransport" className="btn btn-primary">Go to Homepage</Link>
                </div>
            </div>
        </div>
    )
}

export default CompletedAddTransport
